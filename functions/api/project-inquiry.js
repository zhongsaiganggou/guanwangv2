/**
 * ZhongSai V2 - Project Inquiry API
 * Cloudflare Pages Function: POST /api/project-inquiry
 *
 * Flow: Turnstile verify -> Server validation -> D1 lead persist -> R2 file persist -> Optional webhook
 */

const ALLOWED_EXTENSIONS = ['pdf', 'dwg', 'dxf', 'jpg', 'jpeg', 'png', 'xls', 'xlsx'];
const ALLOWED_MIME_PREFIXES = ['application/pdf', 'image/', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB per file
const MAX_TOTAL_SIZE = 75 * 1024 * 1024; // 75MB total
const MAX_TEXT_LENGTH = 5000;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  });
}

function sanitizeText(value, maxLen = MAX_TEXT_LENGTH) {
  if (typeof value !== 'string') return '';
  let cleaned = value.trim();
  // Remove control characters except common whitespace
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  if (cleaned.length > maxLen) cleaned = cleaned.substring(0, maxLen);
  return cleaned;
}

function isValidEmail(email) {
  if (!email) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateId() {
  // crypto.randomUUID is available in Cloudflare Workers
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
}

async function verifyTurnstile(token, secret, remoteIp) {
  if (!secret) {
    return { success: false, error: 'TURNSTILE_SECRET_NOT_CONFIGURED' };
  }
  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteIp) formData.append('remoteip', remoteIp);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return { success: result.success === true, error: result.success ? null : (result['error-codes'] || ['verification_failed']).join(',') };
  } catch (err) {
    return { success: false, error: 'TURNSTILE_VERIFY_ERROR' };
  }
}

function validateLead(data) {
  const errors = {};
  const hasDrawings = data.has_drawings === true || data.has_drawings === 'true' || data.has_drawings === '1' || data.active_path === 'drawings';

  // Required fields
  if (!data.name || !data.name.trim()) errors.name = 'Name is required';
  if (!data.project_country || !data.project_country.trim()) errors.project_country = 'Project country is required';
  if (!data.calling_code || !data.calling_code.trim()) errors.calling_code = 'Country / calling code is required';
  if (!data.phone || !data.phone.trim()) errors.phone = 'WhatsApp / phone is required';
  if (!data.wechat || !data.wechat.trim()) errors.wechat = 'WeChat ID is required';

  // Email optional but validate format if provided
  if (data.email && data.email.trim() && !isValidEmail(data.email.trim())) {
    errors.email = 'Invalid email format';
  }

  // No-drawings path required fields
  if (!hasDrawings) {
    if (!data.project_type || !data.project_type.trim()) errors.project_type = 'Project type is required';
    if (!data.intended_use || !data.intended_use.trim()) errors.intended_use = 'Intended use is required';
  }

  return { errors, hasDrawings };
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let formData;
    let fields = {};
    let files = [];

    if (contentType.includes('multipart/form-data')) {
      formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files.push({ field: key, file: value });
        } else {
          fields[key] = value;
        }
      }
    } else {
      // Try JSON
      try {
        fields = await request.json();
      } catch {
        return jsonResponse({ success: false, code: 'INVALID_CONTENT_TYPE', message: 'Expected multipart/form-data or JSON' }, 400);
      }
    }

    // Normalize browser field names to the API/database schema.
    fields.project_country = fields.project_country || fields.country || '';
    fields.calling_code = fields.calling_code || fields.phone_code || '';
    fields.project_type = fields.project_type || fields.projectType || '';
    fields.intended_use = fields.intended_use || fields.intendedUse || '';
    fields.crane_requirement = fields.crane_requirement || fields.hasCrane || '';
    fields.form_path = fields.form_path || fields.active_path || '';
    fields.source_page = fields.source_page || fields.submission_page || '';

    // Honeypot check
    if (fields.website || fields.company_hp || fields.hp_field) {
      // Silently accept but mark as spam - don't reveal it's a honeypot
      return jsonResponse({ success: true, lead_id: 'filtered', message: 'Received' }, 200);
    }

    // Turnstile verification
    const turnstileToken = fields['cf-turnstile-response'] || fields.turnstile_token || fields.token;
    if (!turnstileToken) {
      return jsonResponse({ success: false, code: 'TURNSTILE_MISSING', message: 'Verification token is required' }, 400);
    }

    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    const remoteIp = request.headers.get('cf-connecting-ip') || '';
    const turnstileResult = await verifyTurnstile(turnstileToken, turnstileSecret, remoteIp);

    if (!turnstileResult.success) {
      return jsonResponse({
        success: false,
        code: 'TURNSTILE_FAILED',
        message: fields.language === 'zh' ? '验证失败，请重新提交。' : 'Verification failed. Please try again.',
      }, 400);
    }

    // Server-side validation
    const { errors, hasDrawings } = validateLead(fields);
    if (Object.keys(errors).length > 0) {
      return jsonResponse({ success: false, code: 'VALIDATION_ERROR', message: 'Please check required fields', errors }, 422);
    }

    // Reject invalid selected files before creating a lead. Upload itself remains optional.
    let totalSize = 0;
    for (const { file } of files) {
      totalSize += file.size;
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      const mime = file.type || '';
      const mimeValid = ALLOWED_MIME_PREFIXES.some(prefix => mime.startsWith(prefix)) || mime === '';
      if (!ALLOWED_EXTENSIONS.includes(ext) || !mimeValid) {
        return jsonResponse({ success: false, code: 'INVALID_FILE', message: 'Unsupported file type' }, 400);
      }
      if (file.size > MAX_FILE_SIZE) {
        return jsonResponse({ success: false, code: 'FILE_TOO_LARGE', message: 'A file exceeds the 25MB limit' }, 400);
      }
    }
    if (totalSize > MAX_TOTAL_SIZE) {
      return jsonResponse({ success: false, code: 'FILES_TOO_LARGE', message: 'Total upload size exceeds the 75MB limit' }, 400);
    }

    // Check D1 binding
    if (!env.LEADS_DB) {
      return jsonResponse({ success: false, code: 'D1_NOT_CONFIGURED', message: 'Database not configured' }, 500);
    }

    // Generate lead ID
    const leadId = generateId();
    const language = fields.language === 'zh' ? 'zh' : 'en';
    const isTest = fields.name && (fields.name.toLowerCase().includes('v2 qa test') || fields.name.toLowerCase().includes('test_record')) ? 1 : 0;

    // Build dimensions string
    const dimensions = [fields.length, fields.width, fields.height].filter(Boolean).join('x') || '';

    // Insert lead into D1
    try {
      await env.LEADS_DB.prepare(`
        INSERT INTO leads (
          id, language, source_page, form_path, has_drawings,
          name, project_country, calling_code, phone_whatsapp, wechat, email,
          project_type, intended_use, dimensions, crane_requirement, message,
          utm_source, utm_medium, utm_campaign, utm_content, utm_term,
          referrer, landing_page, turnstile_verified, submission_status, test_record
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        leadId,
        language,
        sanitizeText(fields.source_page, 500),
        sanitizeText(fields.form_path, 500),
        hasDrawings ? 1 : 0,
        sanitizeText(fields.name, 200),
        sanitizeText(fields.project_country, 100),
        sanitizeText(fields.calling_code, 20),
        sanitizeText(fields.phone, 50),
        sanitizeText(fields.wechat, 100),
        sanitizeText(fields.email, 200),
        sanitizeText(fields.project_type, 100),
        sanitizeText(fields.intended_use, 500),
        sanitizeText(dimensions, 50),
        sanitizeText(fields.crane_requirement, 50),
        sanitizeText(fields.message, 5000),
        sanitizeText(fields.utm_source, 200),
        sanitizeText(fields.utm_medium, 200),
        sanitizeText(fields.utm_campaign, 200),
        sanitizeText(fields.utm_content, 200),
        sanitizeText(fields.utm_term, 200),
        sanitizeText(fields.referrer, 500),
        sanitizeText(fields.landing_page, 500),
        1,
        'received',
        isTest
      ).run();
    } catch (dbErr) {
      console.error('D1 insert error:', dbErr.message);
      return jsonResponse({ success: false, code: 'DATABASE_ERROR', message: 'Failed to save inquiry' }, 500);
    }

    // Process file uploads to R2
    const savedFiles = [];
    let failedFiles = 0;
    if (files.length > 0) {
      if (!env.LEAD_FILES) {
        failedFiles = files.length;
        console.error(`R2 binding missing for lead ${leadId}`);
      } else {
        for (const { file } of files) {
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 8);
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 100);
          const fileKey = `${leadId}/${timestamp}-${random}-${safeName}`;
          try {
            const fileBuffer = await file.arrayBuffer();
            await env.LEAD_FILES.put(fileKey, fileBuffer, {
              httpMetadata: { contentType: file.type || 'application/octet-stream' },
              customMetadata: { originalFilename: file.name, leadId },
            });

            const fileId = generateId();
            await env.LEADS_DB.prepare(`
              INSERT INTO lead_files (id, lead_id, file_key, original_filename, content_type, size)
              VALUES (?, ?, ?, ?, ?, ?)
            `).bind(fileId, leadId, fileKey, file.name, file.type || '', file.size).run();

            savedFiles.push({ name: file.name, size: file.size, fileKey });
          } catch (fileErr) {
            failedFiles += 1;
            console.error('File upload error:', fileErr.message);
            try { await env.LEAD_FILES.delete(fileKey); } catch { /* best-effort orphan cleanup */ }
          }
        }
      }
    }

    const submissionStatus = failedFiles > 0 ? 'file_upload_failed' : 'complete';
    try {
      await env.LEADS_DB.prepare('UPDATE leads SET submission_status = ? WHERE id = ?')
        .bind(submissionStatus, leadId).run();
    } catch (statusErr) {
      console.error('Lead status update error:', statusErr.message);
    }

    // Generate R2 signed download URLs for saved files (24h expiry)
    const filesWithDownloadUrls = [];
    if (savedFiles.length > 0 && env.LEAD_FILES) {
      for (const f of savedFiles) {
        try {
          const downloadUrl = await env.LEAD_FILES.sign(f.fileKey, { expiresIn: 86400 });
          console.log('R2 signed URL generated for:', f.fileKey, 'URL length:', downloadUrl?.length);
          filesWithDownloadUrls.push({ ...f, download_url: downloadUrl });
        } catch (signErr) {
          console.error('R2 sign URL error for', f.fileKey, ':', signErr.message, signErr.stack);
          filesWithDownloadUrls.push({ ...f, download_url: null });
        }
      }
    } else {
      filesWithDownloadUrls.push(...savedFiles.map(f => ({ ...f, download_url: null })));
    }

    // Optional webhook forwarding (don't fail lead if webhook fails)
    let webhookStatus = 'not_configured';
    let webhookError = null;
    if (env.LEAD_WEBHOOK_URL) {
      webhookStatus = 'attempted';
      try {
        const webhookPayload = {
          lead_id: leadId,
          created_at: new Date().toISOString(),
          language,
          form_path: sanitizeText(fields.form_path, 500),
          has_drawings: hasDrawings,
          name: sanitizeText(fields.name, 200),
          project_country: sanitizeText(fields.project_country, 100),
          calling_code: sanitizeText(fields.calling_code, 20),
          phone_whatsapp: sanitizeText(fields.phone, 50),
          wechat: sanitizeText(fields.wechat, 100),
          email: sanitizeText(fields.email, 200),
          project_type: sanitizeText(fields.project_type, 100),
          intended_use: sanitizeText(fields.intended_use, 500),
          dimensions,
          crane_requirement: sanitizeText(fields.crane_requirement, 50),
          message: sanitizeText(fields.message, 5000),
          utm_source: sanitizeText(fields.utm_source, 200),
          utm_medium: sanitizeText(fields.utm_medium, 200),
          utm_campaign: sanitizeText(fields.utm_campaign, 200),
          utm_content: sanitizeText(fields.utm_content, 200),
          utm_term: sanitizeText(fields.utm_term, 200),
          referrer: sanitizeText(fields.referrer, 500),
          source_page: sanitizeText(fields.source_page, 500),
          landing_page: sanitizeText(fields.landing_page, 500),
          files: filesWithDownloadUrls,
          files_count: savedFiles.length,
          submission_status: submissionStatus,
          test_record: isTest === 1,
        };

        const headers = { 'Content-Type': 'application/json' };
        if (env.LEAD_WEBHOOK_SECRET) {
          headers['X-Webhook-Secret'] = env.LEAD_WEBHOOK_SECRET;
        }

        const webhookResp = await fetch(env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(webhookPayload),
        });

        if (webhookResp.ok) {
          webhookStatus = 'success';
        } else {
          webhookStatus = 'failed';
          webhookError = `HTTP ${webhookResp.status}`;
        }
      } catch (whErr) {
        webhookStatus = 'failed';
        webhookError = whErr.message.substring(0, 200);
      }

      // Update lead with webhook status
      try {
        await env.LEADS_DB.prepare('UPDATE leads SET webhook_status = ?, webhook_error = ? WHERE id = ?')
          .bind(webhookStatus, webhookError, leadId).run();
      } catch { /* ignore */ }
    }

    // WeCom (企业微信) group bot notification - don't fail lead if this fails
    let wecomStatus = 'not_configured';
    if (env.WECHAT_WORK_WEBHOOK_URL) {
      wecomStatus = 'attempted';
      try {
        const isTestText = isTest === 1 ? '（测试）' : '';
        const hasDrawingsText = hasDrawings ? '有' : '无';
        const projectInfo = hasDrawings ? '有图纸/BOQ' : sanitizeText(fields.project_type, 80);

        const mdLines = [
          `**网站新线索${isTestText}**`,
          '',
          `**姓名**: ${sanitizeText(fields.name, 100)}`,
          `**国家**: ${sanitizeText(fields.project_country, 80)}`,
          `**电话**: ${sanitizeText(fields.calling_code, 20)} ${sanitizeText(fields.phone, 50)}`,
          `**微信**: ${sanitizeText(fields.wechat, 80)}`,
          `**有无图纸**: ${hasDrawingsText}`,
          `**项目**: ${projectInfo}`,
          `**来源**: ${sanitizeText(fields.source_page, 120)}`,
        ];

        if (filesWithDownloadUrls.length > 0) {
          mdLines.push(`**附件**: ${filesWithDownloadUrls.length}个文件`);
          for (const f of filesWithDownloadUrls) {
            const fileName = f.original_filename || f.name || '未知文件';
            const fileSize = f.size ? `(${(f.size / 1024).toFixed(1)}KB)` : '';
            if (f.download_url) {
              mdLines.push(`- [${fileName}${fileSize}](${f.download_url})`);
            } else {
              mdLines.push(`- ${fileName}${fileSize}`);
            }
          }
          mdLines.push('> 国内下载慢时，建议客户通过微信/WhatsApp直接发送图纸');
        }

        const wecomPayload = {
          msgtype: 'markdown',
          markdown: {
            content: mdLines.join('\n')
          }
        };

        const wecomResp = await fetch(env.WECHAT_WORK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wecomPayload),
        });

        if (wecomResp.ok) {
          const wecomResult = await wecomResp.json();
          if (wecomResult.errcode === 0) {
            wecomStatus = 'success';
          } else {
            wecomStatus = 'failed';
            wecomError = `errcode=${wecomResult.errcode} errmsg=${wecomResult.errmsg}`;
          }
        } else {
          wecomStatus = 'failed';
          wecomError = `HTTP ${wecomResp.status}`;
        }
      } catch (wecomErr) {
        wecomStatus = 'failed';
        wecomError = wecomErr.message.substring(0, 200);
      }
    }

    // Success response - no PII in response
    return jsonResponse({
      success: true,
      lead_id: leadId,
      language,
      files_saved: savedFiles.length,
      files_failed: failedFiles,
      submission_status: submissionStatus,
      partial_success: failedFiles > 0,
      webhook_status: webhookStatus,
      test_record: isTest === 1,
      message: failedFiles > 0
        ? (language === 'zh'
          ? '项目需求已收到，但附件未能完整保存。我们将通过您填写的联系方式跟进。'
          : 'Project inquiry received, but the attachments could not be fully saved. We will follow up using your contact details.')
        : (language === 'zh'
          ? '项目需求已提交。感谢您的提交。中赛钢构将根据您提供的项目资料进行审核，并通过您填写的联系方式进行后续沟通。'
          : 'Project inquiry received. Thank you. ZhongSai will review the project information and follow up using the contact details you provided.'),
    }, 201);

  } catch (err) {
    console.error('API error:', err.message, err.stack);
    return jsonResponse({
      success: false,
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred. Please try again.',
    }, 500);
  }
}

// OPTIONS preflight
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  });
}

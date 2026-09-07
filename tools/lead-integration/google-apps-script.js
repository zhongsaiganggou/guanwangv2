/**
 * ZhongSai Steel Structure - Lead Webhook Receiver
 * 部署为 Web App，接收 Cloudflare Pages Function 推送的询盘线索
 * 
 * 部署步骤：
 * 1. 扩展程序 → Apps Script
 * 2. 粘贴此代码
 * 3. 部署 → 新建部署 → 类型选"Web应用"
 * 4. 访问权限选"任何人"
 * 5. 复制 Web App URL，配置到 Cloudflare 环境变量 LEAD_WEBHOOK_URL
 */

// Webhook 密钥（与 Cloudflare 环境变量 LEAD_WEBHOOK_SECRET 一致）
const WEBHOOK_SECRET = 'zhongsai-lead-2024-secure';

// Google Sheet ID（从表格URL中获取）
const SHEET_ID = '1S-3HgdXst85CfQltZyzy4pjU5Wa7jANkzFn4UtQvrQE';

// Sheet 名称
const SHEET_NAME = 'Sheet1';

// 列顺序（必须与 Google Sheet 表头一致）
const COLUMNS = [
  '线索ID',           // A
  '提交时间',         // B
  '语言',             // C
  '表单路径',         // D
  '姓名',             // E
  '项目所在国家',     // F
  '国家区号',         // G
  'WhatsApp/电话',    // H
  '微信号',           // I
  '邮箱',             // J
  '项目类型',         // K
  '项目用途',         // L
  '项目尺寸',         // M
  '是否需要吊车',     // N
  '项目描述/特殊要求', // O
  '是否上传图纸',     // P
  '附件文件名',       // Q
  '附件地址/文件Key', // R
  '提交页面',         // S
  '首次落地页',       // T
  '来源页面Referrer', // U
  'UTM Source',       // V
  'UTM Medium',       // W
  'UTM Campaign',     // X
  'UTM Content',      // Y
  'UTM Term',         // Z
  '提交状态',         // AA
  '测试线索',         // AB
  '跟进负责人',       // AC
  '跟进状态',         // AD
  '跟进备注',         // AE
  '最后跟进时间',     // AF
];

/**
 * Web App POST 入口
 */
function doPost(e) {
  try {
    // 验证 Webhook 密钥（兼容多种传递方式）
    let secret = '';
    if (e.parameter && e.parameter.secret) {
      secret = e.parameter.secret;
    } else if (e.headers && e.headers['X-Webhook-Secret']) {
      secret = e.headers['X-Webhook-Secret'];
    } else if (e.headers && e.headers['x-webhook-secret']) {
      secret = e.headers['x-webhook-secret'];
    }
    if (secret !== WEBHOOK_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid secret' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 解析请求体
    const data = JSON.parse(e.postData.contents);

    // 处理附件信息
    let fileNames = '';
    let fileUrls = '';
    if (data.files && data.files.length > 0) {
      fileNames = data.files.map(f => f.original_filename || f.name || '').join('; ');
      fileUrls = data.files.map(f => f.download_url || f.file_key || '').join('; ');
    }

    // 按列顺序组装数据
    const row = [
      data.lead_id || '',
      data.created_at || new Date().toISOString(),
      data.language || '',
      data.form_path || '',
      data.name || '',
      data.project_country || '',
      data.calling_code || '',
      data.phone_whatsapp || '',
      data.wechat || '',
      data.email || '',
      data.project_type || '',
      data.intended_use || '',
      data.dimensions || '',
      data.crane_requirement || '',
      data.message || '',
      data.has_drawings === 1 || data.has_drawings === true ? '是' : '否',
      fileNames,
      fileUrls,
      data.source_page || '',
      data.landing_page || '',
      data.referrer || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
      data.submission_status || '',
      data.test_record === 1 || data.test_record === true ? '是' : '否',
      '', // 跟进负责人（人工维护）
      '', // 跟进状态（人工维护）
      '', // 跟进备注（人工维护）
      '', // 最后跟进时间（人工维护）
    ];

    // 写入 Sheet（通过 Sheet ID 打开，使用第一个工作表）
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheets()[0]; // 使用第一个工作表，兼容中英文名称
    if (!sheet) {
      throw new Error('No sheet found in spreadsheet');
    }

    // 检查表头是否存在，不存在则创建
    const headerRow = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
    if (!headerRow[0] || headerRow[0] !== COLUMNS[0]) {
      sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, COLUMNS.length).setBackground('#f0f0f0');
    }

    // 追加新行
    sheet.appendRow(row);

    // 返回成功
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, lead_id: data.lead_id }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Webhook error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Web App GET 入口（用于健康检查）
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'ZhongSai Lead Webhook' }))
    .setMimeType(ContentService.MimeType.JSON);
}

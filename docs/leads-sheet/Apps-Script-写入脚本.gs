/**
 * 中赛钢构 · 官网询盘 → 谷歌表格 写入脚本（表头重建版）
 *
 * 背景：原表头由两套字段拼接成 58 列（第 1-28 列有值、第 29-58 列永远为空），
 *      且写入时把 "+254"、"0722103195" 当成数字/公式处理，导致国家区号丢掉 "+"、
 *      电话丢掉开头的 0。本脚本改为单套 44 列表头，并强制按纯文本写入。
 *
 * 部署方式：打开表格 → 扩展程序 → Apps Script，把本文件内容替换原脚本的 doPost。
 * ⚠️ 若原脚本里还有「邮件通知 / 企微群通知 / 其他抄送」等逻辑，请把这些函数保留下来，
 *    只替换 doPost 与本文件新增的函数，或在本文件 doPost 末尾调用它们。
 */

/** 新表头：44 列，顺序 = 写入顺序，不要随意调整 */
var HEADERS = [
  '线索ID', '提交时间(北京)', '语言', '表单版本', '提交页面', '首次落地页', '来源Referrer',
  '姓名', '项目国家', '国家区号', 'WhatsApp/电话', '微信号', '邮箱',
  '客户身份', '项目阶段', '项目类型', '项目用途', '项目尺寸',
  '吊车要求', '吊车吨位', '风荷载', '雪荷载', '抗震要求', '设备荷载', '项目描述',
  '是否带图纸', '附件数', '附件下载链接', '提交状态', '测试线索', '线索来源',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term',
  'GCLID', 'GBRAID', 'WBRAID',
  '跟进负责人', '跟进状态', '线索等级', '最后跟进时间', '跟进备注'
];

var MAIN_TAB = '线索总表';
var LEGACY_TAB = '工作表1';

/** webhook 入口：官网 functions/api/project-inquiry.js 会 POST 到这里 */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = ensureSheet_(MAIN_TAB);
    var row = buildRow_(payload);

    var idCol = 1;
    if (payload.lead_id && findLeadRow_(sheet, payload.lead_id) > 0) {
      return jsonOut_({ ok: true, skipped: 'duplicate' });
    }

    var nextRow = sheet.getLastRow() + 1;
    if (nextRow < 2) nextRow = 2;
    // 关键：先把目标行整行设为「纯文本」，再写值，避免 "+254" 被当公式、"0123" 丢前导 0
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setNumberFormat('@');
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([row]);

    return jsonOut_({ ok: true, row: nextRow, lead_id: payload.lead_id || null });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** 组装一行数据：键名与官网 webhook payload 一一对应 */
function buildRow_(p) {
  var files = p.files || [];
  var links = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i] && files[i].download_url) links.push(files[i].download_url);
  }

  return [
    text_(p.lead_id),
    beijingTime_(p.created_at),
    text_(p.language),
    p.has_drawings ? '带图纸' : '不带图纸',
    text_(p.source_page),
    text_(p.landing_page),
    text_(p.referrer),
    text_(p.name),
    text_(p.project_country),
    text_(p.calling_code),
    text_(p.phone_whatsapp),
    text_(p.wechat),
    text_(p.email),
    text_(p.customer_type),
    text_(p.project_stage),
    text_(p.project_type),
    text_(p.intended_use),
    text_(p.dimensions),
    text_(p.crane_requirement),
    text_(p.crane_capacity),
    text_(p.wind_load),
    text_(p.snow_load),
    text_(p.seismic_requirement),
    text_(p.equipment_load),
    text_(p.message),
    p.has_drawings ? '是' : '否',
    String(p.files_count || 0),
    links.join('\n'),
    text_(p.submission_status),
    p.test_record ? '是' : '否',
    sourceType_(p),
    text_(p.utm_source),
    text_(p.utm_medium),
    text_(p.utm_campaign),
    text_(p.utm_content),
    text_(p.utm_term),
    text_(p.gclid),
    text_(p.gbraid),
    text_(p.wbraid),
    '', '待跟进', '', '', ''   // 跟进负责人 / 跟进状态 / 线索等级 / 最后跟进时间 / 跟进备注
  ];
}

/** 线索来源判定：优先点击 ID，再看 UTM */
function sourceType_(p) {
  var utm = String(p.utm_source || '').toLowerCase();
  if (p.gclid || p.gbraid || p.wbraid) return 'Google Ads';
  if (utm === 'google' || utm === 'adwords') return 'Google Ads';
  if (utm === 'fb' || utm === 'facebook' || utm === 'meta' || utm === 'ig' || utm === 'instagram') return 'Meta Ads';
  if (utm === 'chatgpt.com' || utm === 'perplexity' || utm === 'bing' || utm === 'duckduckgo' || utm === 'yandex') return 'AI/其他搜索';
  if (utm) return '其他付费/联盟';
  return '自然搜索/直接访问';
}

/** ISO 时间 → 北京时间字符串（表格里按文本存，排序仍可用） */
function beijingTime_(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return text_(iso);
  var t = new Date(d.getTime() + 8 * 3600 * 1000);
  var s = t.toISOString();                 // yyyy-mm-ddThh:mm:ss.sssZ
  return s.substring(0, 10) + ' ' + s.substring(11, 16);
}

function text_(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/^\s+|\s+$/g, '');
}

/** 取/建主表，含表头、冻结首行、列宽 */
function ensureSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  var h = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var needInit = true;
  for (var i = 0; i < HEADERS.length; i++) {
    if (String(h[i]) !== HEADERS[i]) { needInit = true; break; }
    needInit = false;
  }
  if (needInit) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#eef3f8');
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).setNumberFormat('@');
    sheet.setColumnWidth(1, 280);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(25, 420);
    sheet.setColumnWidth(28, 420);
  }
  return sheet;
}

/** 按线索ID查重，返回行号（0 = 不存在） */
function findLeadRow_(sheet, leadId) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(leadId)) return i + 2;
  }
  return 0;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 菜单：手动建表头 / 清空重建 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('询盘表格')
    .addItem('建/校验新表头', 'menuEnsureHeader')
    .addToUi();
}

function menuEnsureHeader() {
  ensureSheet_(MAIN_TAB);
  SpreadsheetApp.getActiveSpreadsheet().toast('表头已就绪：' + HEADERS.length + ' 列');
}

/**
 * 【可选】把旧 tab「工作表1」的历史行按旧表头名称映射到新表。
 * 已经存在相同「线索ID」的行会跳过，可重复执行。
 * 需要补的风荷载/雪荷载/抗震/吊车吨位/设备荷载/附件数在旧 tab 里本来就没有值，
 * 这部分请直接用导出的「历史4条回填.csv」覆盖，或从 D1 重新导。
 */
function migrateLegacyRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var src = ss.getSheetByName(LEGACY_TAB);
  if (!src) throw new Error('找不到旧工作表：' + LEGACY_TAB);
  var dst = ensureSheet_(MAIN_TAB);

  var oldHead = src.getRange(1, 1, 1, src.getLastColumn()).getValues()[0];
  var oldIdx = {};
  for (var i = 0; i < oldHead.length; i++) oldIdx[String(oldHead[i])] = i;

  var pick = function (row, label) {
    var i = oldIdx[label];
    return i === undefined ? '' : text_(row[i]);
  };

  var rows = src.getRange(2, 1, Math.max(src.getLastRow() - 1, 1), oldHead.length).getValues();
  var out = [];
  for (var r = 0; r < rows.length; r++) {
    var old = rows[r];
    if (!pick(old, '线索ID')) continue;

    out.push([
      pick(old, '线索ID'),
      pick(old, '提交时间'),
      pick(old, '语言'),
      pick(old, '表单路径') === 'drawings' ? '带图纸' : (pick(old, '表单路径') ? '不带图纸' : ''),
      pick(old, '提交页面'),
      pick(old, '首次落地页'),
      pick(old, '来源页面Referrer'),
      pick(old, '姓名'),
      pick(old, '项目所在国家'),
      pick(old, '国家区号'),
      pick(old, 'WhatsApp/电话'),
      pick(old, '微信号'),
      pick(old, '邮箱'),
      '', '',
      pick(old, '项目类型'),
      pick(old, '项目用途'),
      pick(old, '项目尺寸'),
      pick(old, '是否需要吊车'),
      '', '', '', '', '',
      pick(old, '项目描述/特殊要求'),
      pick(old, '是否上传图纸'),
      '', pick(old, '附件地址/文件Key'),
      pick(old, '提交状态'),
      pick(old, '测试线索'),
      '',
      pick(old, 'UTM Source'), pick(old, 'UTM Medium'), pick(old, 'UTM Campaign'),
      pick(old, 'UTM Content'), pick(old, 'UTM Term'),
      '', '', '',
      '', '待跟进', '', '', ''
    ]);
  }

  var skipped = 0;
  for (var k = 0; k < out.length; k++) {
    if (findLeadRow_(dst, out[k][0]) > 0) { skipped++; continue; }
    var nextRow = dst.getLastRow() + 1;
    dst.getRange(nextRow, 1, 1, HEADERS.length).setNumberFormat('@');
    dst.getRange(nextRow, 1, 1, HEADERS.length).setValues([out[k]]);
  }
  ss.toast('迁入 ' + (out.length - skipped) + ' 行，跳过重复 ' + skipped + ' 行');
}

/** 自检：把一条假 payload 走一遍 buildRow_，不写表 */
function testBuildRow() {
  var sample = {
    lead_id: 'TEST-' + new Date().getTime(),
    created_at: new Date().toISOString(),
    language: 'en', form_path: 'drawings', has_drawings: true,
    name: 'QA Test', project_country: 'Malaysia', calling_code: '+60',
    phone_whatsapp: '+60 12 345 6789', wechat: '', email: 'qa@example.com',
    project_type: 'Steel Workshop', dimensions: '60x30x9',
    utm_source: 'google', gclid: 'abc123',
    files: [{ name: 'a.pdf', download_url: 'https://example.com/a.pdf' }],
    files_count: 1, submission_status: 'complete', test_record: false
  };
  var row = buildRow_(sample);
  Logger.log('cols=' + row.length + ' 区号=' + row[9] + ' 电话=' + row[10] + ' 来源=' + row[30]);
  return row;
}

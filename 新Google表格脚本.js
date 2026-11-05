/**
 * 网站询盘 Web App
 * 接收后端 JSON → 写入「官网客户线索」
 * 企业微信推送由后端直接完成
 */

var DEFAULT_SPREADSHEET_ID = '1S-3HgdXst85CfQltZyzy4pjU5Wa7jANkzFn4UtQvrQE';
var SHEET_NAME = '官网客户线索';

var HEADERS = [
  '提交时间','线索ID','语言','来源页面','表单路径','有无图纸',
  '姓名','项目国家','区号','电话/WhatsApp','微信','邮箱',
  '身份','项目阶段','项目类型','项目简述','尺寸(长×宽×高)','吊车要求',
  '风荷载','雪荷载','抗震要求','吊车吨位','设备荷载',
  '留言','附件数','附件下载链接','UTM来源','UTM媒介','UTM活动',
  '推荐来源','落地页','状态'
];

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var props = PropertiesService.getScriptProperties();
    var spreadsheetId = props.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID;
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var attachLinks = '';
    if (data.files && data.files.length > 0) {
      var links = [];
      for (var i = 0; i < data.files.length; i++) {
        var f = data.files[i];
        var name = f.name || f.original_filename || '附件';
        var url = f.download_url || '';
        links.push(name + ': ' + url);
      }
      attachLinks = links.join('\n');
    }

    var row = [
      new Date(),
      data.lead_id || '',
      data.language || '',
      data.source_page || '',
      data.form_path || '',
      data.has_drawings ? '有图纸' : '无图纸',
      data.name || '',
      data.project_country || '',
      data.calling_code || '',
      data.phone_whatsapp || '',
      data.wechat || '',
      data.email || '',
      data.customer_type || '',
      data.project_stage || '',
      data.project_type || '',
      data.intended_use || '',
      data.dimensions || '',
      data.crane_requirement || '',
      data.wind_load || '',
      data.snow_load || '',
      data.seismic_requirement || '',
      data.crane_capacity || '',
      data.equipment_load || '',
      data.message || '',
      data.files_count || 0,
      attachLinks,
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.referrer || '',
      data.landing_page || '',
      data.submission_status || ''
    ];

    sheet.appendRow(row);
    return json_({ success: true });
  } catch (err) {
    return json_({ success: false, message: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: 'zhongsai-sheets', flow: 'write-only' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function testLeadPipeline() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        lead_id: 'test-002',
        language: 'zh',
        source_page: '/zh/contact/',
        form_path: 'drawings',
        has_drawings: true,
        name: '高级选项测试',
        project_country: 'Malaysia',
        calling_code: '+60',
        phone_whatsapp: '123456',
        wechat: 'test',
        project_type: '仓库与物流',
        intended_use: '测试简述',
        dimensions: '40x20x8',
        crane_requirement: '是 (Yes)',
        wind_load: '0.5 kPa',
        snow_load: '0.3 kPa',
        seismic_requirement: 'Zone 2',
        crane_capacity: '10t',
        equipment_load: '500kg',
        message: '测试高级选项推送',
        files_count: 0,
        files: [],
        submission_status: 'complete'
      })
    }
  };
  var out = doPost(fake);
  Logger.log(out.getContent());
}

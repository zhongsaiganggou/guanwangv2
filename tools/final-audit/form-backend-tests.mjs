import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { onRequestPost } from '../../functions/api/project-inquiry.js';

const originalFetch = globalThis.fetch;

function makeDb({ failInsert = false } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async run() {
              calls.push({ sql: sql.replace(/\s+/g, ' ').trim(), args });
              if (failInsert && sql.includes('INSERT INTO leads')) throw new Error('simulated D1 failure');
              return { success: true };
            },
          };
        },
      };
    },
  };
}

function makeR2({ fail = false } = {}) {
  const puts = [];
  const deletes = [];
  return {
    puts,
    deletes,
    async put(key, body, metadata) {
      if (fail) throw new Error('simulated R2 failure');
      puts.push({ key, bytes: body.byteLength, metadata });
    },
    async delete(key) { deletes.push(key); },
  };
}

function baseFields({ lang = 'en', path = 'drawings' } = {}) {
  return {
    name: 'V2 QA TEST',
    country: 'QA Country',
    phone_code: '+86',
    phone: '0000000000',
    wechat: 'v2-qa-test',
    email: '',
    language: lang,
    active_path: path,
    source_page: `/${lang}/contact/`,
    landing_page: `/${lang}/?utm_source=v2-qa`,
    utm_source: 'v2-qa',
    utm_medium: 'automated-test',
  };
}

function requestFrom(fields, files = []) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.append(key, value);
  for (const file of files) fd.append('drawings', file, file.name);
  return new Request('https://audit.local/api/project-inquiry', { method: 'POST', body: fd });
}

async function invoke({ fields, files = [], db = makeDb(), r2 = makeR2(), tokenValid = true, includeR2 = true }) {
  globalThis.fetch = async () => new Response(JSON.stringify({
    success: tokenValid,
    ...(tokenValid ? {} : { 'error-codes': ['invalid-input-response'] }),
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  const env = { TURNSTILE_SECRET_KEY: 'test-secret', LEADS_DB: db };
  if (includeR2) env.LEAD_FILES = r2;
  const request = requestFrom({ ...fields, 'cf-turnstile-response': tokenValid ? 'valid-test-token' : 'invalid-test-token' }, files);
  const response = await onRequestPost({ request, env });
  const body = await response.json();
  return { response, body, db, r2 };
}

const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'PASS' });
  } catch (error) {
    results.push({ name, status: 'FAIL', detail: error.stack || error.message });
  }
}

await test('TEST 01 EN + Have Drawings + no file', async () => {
  const r = await invoke({ fields: baseFields() });
  assert.equal(r.response.status, 201);
  assert.equal(r.body.success, true);
  assert.equal(r.body.submission_status, 'complete');
  const insert = r.db.calls.find(c => c.sql.startsWith('INSERT INTO leads'));
  assert.ok(insert);
  assert.equal(insert.args[3], 'drawings');
  assert.equal(insert.args[6], 'QA Country');
  assert.equal(insert.args[7], '+86');
  assert.equal(insert.args[24], 'received');
  assert.equal(insert.args[25], 1);
});

await test('TEST 02 EN + Have Drawings + PDF test file', async () => {
  const file = new File(['V2 QA TEST PDF'], 'v2-qa-test.pdf', { type: 'application/pdf' });
  const r = await invoke({ fields: baseFields(), files: [file] });
  assert.equal(r.response.status, 201);
  assert.equal(r.body.files_saved, 1);
  assert.equal(r.body.files_failed, 0);
  assert.equal(r.r2.puts.length, 1);
  assert.ok(r.db.calls.some(c => c.sql.startsWith('INSERT INTO lead_files')));
});

await test('TEST 03 ZH + No Drawings', async () => {
  const fields = { ...baseFields({ lang: 'zh', path: 'nodrawings' }), projectType: '工业厂房与车间', intendedUse: 'V2 QA TEST 用途' };
  const r = await invoke({ fields });
  assert.equal(r.response.status, 201);
  assert.equal(r.body.language, 'zh');
  const insert = r.db.calls.find(c => c.sql.startsWith('INSERT INTO leads'));
  assert.equal(insert.args[11], '工业厂房与车间');
  assert.equal(insert.args[12], 'V2 QA TEST 用途');
});

await test('TEST 04 Missing WeChat', async () => {
  const fields = baseFields(); delete fields.wechat;
  const r = await invoke({ fields });
  assert.equal(r.response.status, 422);
  assert.equal(r.body.code, 'VALIDATION_ERROR');
  assert.ok(r.body.errors.wechat);
});

await test('TEST 05 Missing Phone', async () => {
  const fields = baseFields(); delete fields.phone;
  const r = await invoke({ fields });
  assert.equal(r.response.status, 422);
  assert.ok(r.body.errors.phone);
});

await test('TEST 06 Invalid Turnstile', async () => {
  const r = await invoke({ fields: baseFields(), tokenValid: false });
  assert.equal(r.response.status, 400);
  assert.equal(r.body.code, 'TURNSTILE_FAILED');
  assert.equal(r.db.calls.length, 0);
});

await test('TEST 07A Invalid file type', async () => {
  const file = new File(['V2 QA TEST'], 'v2-qa-test.exe', { type: 'application/octet-stream' });
  const r = await invoke({ fields: baseFields(), files: [file] });
  assert.equal(r.response.status, 400);
  assert.equal(r.body.code, 'INVALID_FILE');
  assert.equal(r.db.calls.length, 0);
});

await test('TEST 07B Oversized file', async () => {
  const file = new File([new Uint8Array(25 * 1024 * 1024 + 1)], 'v2-qa-large.pdf', { type: 'application/pdf' });
  const r = await invoke({ fields: baseFields(), files: [file] });
  assert.equal(r.response.status, 400);
  assert.equal(r.body.code, 'FILE_TOO_LARGE');
  assert.equal(r.db.calls.length, 0);
});

await test('TEST 08 Double-click submit guard', async () => {
  const source = await readFile(new URL('../../src/components/QuoteForm.astro', import.meta.url), 'utf8');
  assert.match(source, /form\.dataset\.submitting === 'true'/);
  assert.match(source, /form\.dataset\.submitting = 'true'/);
  assert.match(source, /delete form\.dataset\.submitting/);
  assert.match(source, /submitBtn\.disabled = true/);
});

await test('TEST 09 Network/API failure behavior', async () => {
  const source = await readFile(new URL('../../src/components/QuoteForm.astro', import.meta.url), 'utf8');
  assert.match(source, /Network error\. Please try again\./);
  assert.match(source, /finally\s*\{/);
  assert.match(source, /submitBtn\.disabled = false/);
});

await test('TEST 10 R2 file failure simulation', async () => {
  const file = new File(['V2 QA TEST PDF'], 'v2-qa-test.pdf', { type: 'application/pdf' });
  const r = await invoke({ fields: baseFields(), files: [file], r2: makeR2({ fail: true }) });
  assert.equal(r.response.status, 201);
  assert.equal(r.body.success, true);
  assert.equal(r.body.partial_success, true);
  assert.equal(r.body.submission_status, 'file_upload_failed');
  assert.equal(r.body.files_failed, 1);
  assert.ok(r.db.calls.some(c => c.sql.startsWith('UPDATE leads SET submission_status')));
});

await test('Additional: missing R2 binding returns partial success after D1 save', async () => {
  const file = new File(['V2 QA TEST PDF'], 'v2-qa-test.pdf', { type: 'application/pdf' });
  const r = await invoke({ fields: baseFields(), files: [file], includeR2: false });
  assert.equal(r.response.status, 201);
  assert.equal(r.body.submission_status, 'file_upload_failed');
  assert.equal(r.body.files_failed, 1);
});

globalThis.fetch = originalFetch;
const failed = results.filter(r => r.status === 'FAIL');
console.log(JSON.stringify({ passed: results.length - failed.length, failed: failed.length, results }, null, 2));
if (failed.length) process.exitCode = 1;

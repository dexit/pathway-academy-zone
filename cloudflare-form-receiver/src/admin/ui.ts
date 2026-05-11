export function adminHtml(): string {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Form Receiver · Admin</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0f1117;--surface:#1a1d27;--border:#2a2d3d;--accent:#6366f1;--accent2:#22d3ee;--text:#e2e8f0;--muted:#64748b;--danger:#ef4444;--warn:#f59e0b;--ok:#22c55e}
body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column}
a{color:var(--accent);text-decoration:none}
header{background:var(--surface);border-bottom:1px solid var(--border);padding:12px 24px;display:flex;align-items:center;gap:16px}
header h1{font-size:1rem;font-weight:600;letter-spacing:.5px}
header span{color:var(--muted);font-size:.8rem}
#auth-bar{margin-left:auto;display:flex;gap:8px;align-items:center}
#auth-bar input{background:#0f1117;border:1px solid var(--border);color:var(--text);padding:5px 10px;border-radius:6px;font-size:.8rem;width:220px}
#auth-bar button{background:var(--accent);color:#fff;border:none;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:.8rem}
nav{background:var(--surface);border-bottom:1px solid var(--border);display:flex;padding:0 24px;gap:4px}
nav button{background:none;border:none;color:var(--muted);padding:10px 14px;cursor:pointer;font-size:.85rem;border-bottom:2px solid transparent;transition:color .15s}
nav button.active,nav button:hover{color:var(--text);border-bottom-color:var(--accent)}
main{flex:1;padding:24px;max-width:1200px;width:100%;margin:0 auto}
.card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px;margin-bottom:16px}
.card h2{font-size:.95rem;font-weight:600;margin-bottom:16px;color:var(--text)}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px}
.stat .val{font-size:1.8rem;font-weight:700;margin-bottom:4px}
.stat .lbl{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.stat.ok .val{color:var(--ok)} .stat.warn .val{color:var(--warn)} .stat.danger .val{color:var(--danger)} .stat.info .val{color:var(--accent2)}
table{width:100%;border-collapse:collapse;font-size:.85rem}
th{text-align:left;padding:8px 12px;color:var(--muted);font-weight:500;border-bottom:1px solid var(--border)}
td{padding:8px 12px;border-bottom:1px solid var(--border);vertical-align:top}
tr:hover td{background:rgba(255,255,255,.03)}
.badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:.72rem;font-weight:600;text-transform:uppercase}
.badge.pending{background:#1e293b;color:var(--muted)}
.badge.processing{background:#1e3a5f;color:var(--accent2)}
.badge.done{background:#14532d;color:var(--ok)}
.badge.failed{background:#450a0a;color:var(--danger)}
.badge.flagged{background:#431407;color:var(--warn)}
.badge.blocked{background:#3b0764;color:#d8b4fe}
.btn{display:inline-flex;align-items:center;gap:6px;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:.82rem;font-weight:500}
.btn-primary{background:var(--accent);color:#fff}
.btn-danger{background:var(--danger);color:#fff}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text)}
.btn:disabled{opacity:.4;cursor:not-allowed}
.toolbar{display:flex;gap:8px;margin-bottom:16px;align-items:center;flex-wrap:wrap}
.toolbar select,.toolbar input[type=text]{background:var(--bg);border:1px solid var(--border);color:var(--text);padding:6px 10px;border-radius:6px;font-size:.82rem}
.pager{display:flex;gap:8px;align-items:center;margin-top:12px;font-size:.82rem;color:var(--muted)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:100}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;width:min(96vw,560px);max-height:90vh;overflow-y:auto}
.modal h3{font-size:1rem;margin-bottom:16px}
.field{margin-bottom:12px}
.field label{display:block;font-size:.8rem;color:var(--muted);margin-bottom:4px}
.field input,.field select,.field textarea{width:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:6px;font-size:.85rem;font-family:inherit}
.field textarea{min-height:80px;resize:vertical}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--accent)}
.modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px}
.err{color:var(--danger);font-size:.8rem;margin-top:4px}
.empty{text-align:center;padding:40px;color:var(--muted)}
pre{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:12px;font-size:.78rem;overflow-x:auto;white-space:pre-wrap;word-break:break-all}
.hidden{display:none!important}
#toast{position:fixed;bottom:24px;right:24px;z-index:200;display:flex;flex-direction:column;gap:8px}
.toast-item{background:var(--surface);border:1px solid var(--border);padding:10px 16px;border-radius:8px;font-size:.85rem;animation:fadeIn .2s}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
</style>
</head>
<body>
<header>
  <h1>&#9632; Form Receiver</h1>
  <span>Admin Panel</span>
  <div id="auth-bar">
    <input id="api-key-input" type="password" placeholder="Admin API key…" />
    <button onclick="saveKey()">Connect</button>
    <span id="key-status" style="color:var(--muted);font-size:.78rem"></span>
  </div>
</header>
<nav>
  <button class="active" onclick="showTab('dashboard',this)">Dashboard</button>
  <button onclick="showTab('submissions',this)">Submissions</button>
  <button onclick="showTab('forms',this)">Forms</button>
  <button onclick="showTab('logs',this)">Delivery Logs</button>
</nav>
<main>

<!-- DASHBOARD -->
<div id="tab-dashboard">
  <div class="stats" id="stats-grid">
    <div class="stat info"><div class="val" id="s-total">—</div><div class="lbl">Total</div></div>
    <div class="stat info"><div class="val" id="s-today">—</div><div class="lbl">Today</div></div>
    <div class="stat warn"><div class="val" id="s-pending">—</div><div class="lbl">Pending</div></div>
    <div class="stat ok"><div class="val" id="s-done">—</div><div class="lbl">Done</div></div>
    <div class="stat danger"><div class="val" id="s-failed">—</div><div class="lbl">Failed</div></div>
  </div>
  <div class="card">
    <h2>Recent Submissions</h2>
    <table><thead><tr><th>ID</th><th>Form</th><th>Status</th><th>Origin</th><th>Created</th></tr></thead>
    <tbody id="recent-tbody"><tr><td colspan="5" class="empty">Loading…</td></tr></tbody>
    </table>
  </div>
</div>

<!-- SUBMISSIONS -->
<div id="tab-submissions" class="hidden">
  <div class="toolbar">
    <select id="sub-form-filter" onchange="loadSubmissions()"><option value="">All forms</option></select>
    <select id="sub-status-filter" onchange="loadSubmissions()">
      <option value="">All statuses</option>
      <option>pending</option><option>processing</option><option>done</option>
      <option>failed</option><option>flagged</option><option>blocked</option>
    </select>
    <button class="btn btn-ghost" onclick="loadSubmissions()">&#8635; Refresh</button>
  </div>
  <div class="card" style="padding:0">
    <table><thead><tr><th>ID</th><th>Form</th><th>Status</th><th>Origin</th><th>Created</th><th></th></tr></thead>
    <tbody id="sub-tbody"><tr><td colspan="6" class="empty">Loading…</td></tr></tbody>
    </table>
  </div>
  <div class="pager">
    <button class="btn btn-ghost" id="sub-prev" onclick="subPage(-1)">&#8592; Prev</button>
    <span id="sub-page-info">Page 1</span>
    <button class="btn btn-ghost" id="sub-next" onclick="subPage(1)">Next &#8594;</button>
  </div>
</div>

<!-- FORMS -->
<div id="tab-forms" class="hidden">
  <div class="toolbar">
    <button class="btn btn-primary" onclick="openFormModal()">+ Register Form</button>
  </div>
  <div class="card" style="padding:0">
    <table><thead><tr><th>Form ID</th><th>Name</th><th>Allowed Origins</th><th>Notify Configs</th><th>Active</th><th></th></tr></thead>
    <tbody id="forms-tbody"><tr><td colspan="6" class="empty">Loading…</td></tr></tbody>
    </table>
  </div>

  <!-- Filter rules section (shown when a form is selected) -->
  <div id="filter-section" class="hidden card">
    <h2>Filter Rules — <span id="filter-form-label"></span>
      <button class="btn btn-ghost" style="float:right;margin-top:-4px" onclick="openFilterModal()">+ Add Rule</button>
    </h2>
    <table><thead><tr><th>Priority</th><th>Name</th><th>Source</th><th>Pattern</th><th>Value Pattern</th><th>Action</th><th></th></tr></thead>
    <tbody id="filter-tbody"></tbody>
    </table>
  </div>

  <!-- Notify configs section -->
  <div id="notify-section" class="hidden card">
    <h2>Notify Configs — <span id="notify-form-label"></span>
      <button class="btn btn-ghost" style="float:right;margin-top:-4px" onclick="openNotifyModal()">+ Add Config</button>
    </h2>
    <table><thead><tr><th>Name</th><th>URL Template</th><th>Auth</th><th>Active</th><th></th></tr></thead>
    <tbody id="notify-tbody"></tbody>
    </table>
  </div>
</div>

<!-- DELIVERY LOGS -->
<div id="tab-logs" class="hidden">
  <div class="toolbar">
    <select id="log-form-filter" onchange="loadLogs()"><option value="">All forms</option></select>
    <button class="btn btn-ghost" onclick="loadLogs()">&#8635; Refresh</button>
  </div>
  <div class="card" style="padding:0">
    <table><thead><tr><th>Time</th><th>Submission</th><th>Form</th><th>URL</th><th>Status</th><th>Duration</th><th>Error</th></tr></thead>
    <tbody id="log-tbody"><tr><td colspan="7" class="empty">Loading…</td></tr></tbody>
    </table>
  </div>
  <div class="pager">
    <button class="btn btn-ghost" id="log-prev" onclick="logPage(-1)">&#8592; Prev</button>
    <span id="log-page-info">Page 1</span>
    <button class="btn btn-ghost" id="log-next" onclick="logPage(1)">Next &#8594;</button>
  </div>
</div>

</main>

<!-- Modals -->
<div id="modal-overlay" class="modal-overlay hidden" onclick="closeModal(event)">

  <!-- Form registration modal -->
  <div id="form-modal" class="modal hidden">
    <h3 id="form-modal-title">Register Form</h3>
    <div class="field"><label>Form ID *</label><input id="fm-form-id" placeholder="contact"></div>
    <div class="field"><label>Name *</label><input id="fm-name" placeholder="Contact Form"></div>
    <div class="field"><label>Allowed Origins (one per line, * = any)</label><textarea id="fm-origins" placeholder="https://your-site.com&#10;*"></textarea></div>
    <div class="field"><label>Incoming Auth Type</label>
      <select id="fm-auth-type" onchange="renderAuthFields()">
        <option value="none">None</option>
        <option value="hmac_github">HMAC — GitHub</option>
        <option value="hmac_stripe">HMAC — Stripe</option>
        <option value="hmac_hubspot_v2">HMAC — HubSpot v2</option>
        <option value="hmac_hubspot_v3">HMAC — HubSpot v3</option>
        <option value="hmac_twilio">HMAC — Twilio</option>
        <option value="hmac_custom">HMAC — Custom</option>
        <option value="bearer">Bearer Token</option>
        <option value="basic">Basic Auth</option>
        <option value="header">Custom Header</option>
      </select>
    </div>
    <div id="fm-auth-fields"></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveForm()">Save</button>
    </div>
  </div>

  <!-- Filter rule modal -->
  <div id="filter-modal" class="modal hidden">
    <h3>Filter Rule</h3>
    <div class="field"><label>Name *</label><input id="fl-name" placeholder="Block honeypot"></div>
    <div class="field"><label>Priority (lower = evaluated first)</label><input id="fl-priority" type="number" value="100"></div>
    <div class="field"><label>Source</label>
      <select id="fl-source">
        <option value="query_param">Query Param</option>
        <option value="body_key">Body Key</option>
        <option value="body_value">Body Value</option>
        <option value="header">HTTP Header</option>
        <option value="origin">Origin</option>
        <option value="ip">IP Address</option>
      </select>
    </div>
    <div class="field"><label>Key Pattern (* = wildcard)</label><input id="fl-pattern" placeholder="honeypot"></div>
    <div class="field"><label>Value Pattern (optional, empty = any value)</label><input id="fl-value-pattern" placeholder="*spam*"></div>
    <div class="field"><label>Action</label>
      <select id="fl-action">
        <option value="block">Block (reject 422)</option>
        <option value="allow">Allow (bypass remaining rules)</option>
        <option value="flag">Flag (accept but mark)</option>
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveFilter()">Save</button>
    </div>
  </div>

  <!-- Notify config modal -->
  <div id="notify-modal" class="modal hidden">
    <h3>Notify Config</h3>
    <div class="field"><label>Name *</label><input id="nc-name" placeholder="HubSpot webhook"></div>
    <div class="field"><label>URL Template * (supports {{submission.id}}, {{field.email}}, etc.)</label>
      <input id="nc-url" placeholder="https://api.example.com/webhook/{{form.form_id}}"></div>
    <div class="field"><label>HTTP Method</label>
      <select id="nc-method"><option>POST</option><option>PUT</option><option>PATCH</option><option>GET</option></select>
    </div>
    <div class="field"><label>Extra Headers (JSON object, optional)</label>
      <textarea id="nc-headers" placeholder='{"X-Source": "form-receiver"}'></textarea>
    </div>
    <div class="field"><label>Body Template (leave empty for full submission JSON)</label>
      <textarea id="nc-body" placeholder='{"email":"{{field.email}}","message":"{{field.message}}"}'></textarea>
    </div>
    <div class="field"><label>Auth Type</label>
      <select id="nc-auth-type" onchange="renderNotifyAuthFields()">
        <option value="none">None</option>
        <option value="bearer">Bearer Token</option>
        <option value="basic">Basic Auth</option>
        <option value="header">Custom Header</option>
        <option value="hmac_sha256">HMAC-SHA256 (sign body)</option>
        <option value="hmac_sha1">HMAC-SHA1 (sign body)</option>
        <option value="oauth2_cc">OAuth2 Client Credentials</option>
      </select>
    </div>
    <div id="nc-auth-fields"></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNotify()">Save</button>
    </div>
  </div>

  <!-- Submission detail modal -->
  <div id="sub-detail-modal" class="modal hidden">
    <h3>Submission Detail</h3>
    <div id="sub-detail-content"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>
  </div>

</div>
<div id="toast"></div>

<script>
let KEY = localStorage.getItem('admin_key') || '';
let subOffset = 0, subTotal = 0;
let logOffset = 0;
let activeFormId = null;

if (KEY) {
  document.getElementById('api-key-input').value = KEY;
  document.getElementById('key-status').textContent = '● Connected';
  init();
}

function saveKey() {
  KEY = document.getElementById('api-key-input').value.trim();
  localStorage.setItem('admin_key', KEY);
  document.getElementById('key-status').textContent = KEY ? '● Connected' : '';
  if (KEY) init();
}

async function api(path, opts = {}) {
  const res = await fetch('/admin/api' + path, {
    ...opts,
    headers: { 'X-Admin-Key': KEY, 'Content-Type': 'application/json', ...(opts.headers || {}) }
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || res.statusText);
  }
  return res.json();
}

function toast(msg, ok = true) {
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.style.borderColor = ok ? 'var(--ok)' : 'var(--danger)';
  el.textContent = msg;
  document.getElementById('toast').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function showTab(name, btn) {
  document.querySelectorAll('[id^="tab-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.remove('hidden');
  btn.classList.add('active');
  if (name === 'dashboard') loadDashboard();
  if (name === 'submissions') { populateFormFilter('sub-form-filter'); loadSubmissions(); }
  if (name === 'forms') loadForms();
  if (name === 'logs') { populateFormFilter('log-form-filter'); loadLogs(); }
}

async function init() {
  await loadDashboard();
}

async function loadDashboard() {
  try {
    const d = await api('/stats');
    document.getElementById('s-total').textContent = d.total ?? 0;
    document.getElementById('s-today').textContent = d.today ?? 0;
    document.getElementById('s-pending').textContent = d.pending ?? 0;
    document.getElementById('s-done').textContent = d.done ?? 0;
    document.getElementById('s-failed').textContent = d.failed ?? 0;

    const tbody = document.getElementById('recent-tbody');
    tbody.innerHTML = d.recent.length ? d.recent.map(r => \`
      <tr>
        <td><a href="#" onclick="showSubDetail('${r.id}');return false">\${r.id.slice(0,12)}…</a></td>
        <td>\${r.form_id}</td><td>\${badge(r.status)}</td><td>\${r.origin}</td><td>\${r.created_at}</td>
      </tr>\`).join('') : '<tr><td colspan="5" class="empty">No submissions yet</td></tr>';
  } catch(e) { toast(e.message, false); }
}

async function populateFormFilter(selectId) {
  try {
    const d = await api('/forms');
    const sel = document.getElementById(selectId);
    const cur = sel.value;
    const opts = d.forms.map(f => \`<option value="\${f.form_id}">\${f.form_id}</option>\`).join('');
    sel.innerHTML = '<option value="">All forms</option>' + opts;
    if (cur) sel.value = cur;
  } catch(_) {}
}

async function loadSubmissions() {
  const formId = document.getElementById('sub-form-filter').value;
  const status = document.getElementById('sub-status-filter').value;
  try {
    const d = await api('/submissions?limit=20&offset=' + subOffset + (formId?'&form_id='+formId:'') + (status?'&status='+status:''));
    subTotal = d.total;
    document.getElementById('sub-page-info').textContent = \`\${subOffset + 1}–\${Math.min(subOffset + 20, subTotal)} of \${subTotal}\`;
    document.getElementById('sub-prev').disabled = subOffset === 0;
    document.getElementById('sub-next').disabled = subOffset + 20 >= subTotal;
    const tbody = document.getElementById('sub-tbody');
    tbody.innerHTML = d.submissions.length ? d.submissions.map(r => \`
      <tr>
        <td><a href="#" onclick="showSubDetail('\${r.id}');return false">\${r.id.slice(0,12)}…</a></td>
        <td>\${r.form_id}</td><td>\${badge(r.status)}</td><td>\${r.origin}</td><td>\${r.created_at}</td>
        <td><button class="btn btn-ghost" style="padding:3px 8px" onclick="showSubDetail('\${r.id}')">View</button></td>
      </tr>\`).join('') : '<tr><td colspan="6" class="empty">No submissions</td></tr>';
  } catch(e) { toast(e.message, false); }
}

function subPage(dir) { subOffset = Math.max(0, subOffset + dir * 20); loadSubmissions(); }

async function showSubDetail(id) {
  try {
    const d = await api('/submissions/' + id);
    document.getElementById('sub-detail-content').innerHTML = \`
      <p><b>ID:</b> \${d.id}</p>
      <p><b>Form:</b> \${d.form_id} &nbsp; <b>Status:</b> \${badge(d.status)}</p>
      <p><b>Origin:</b> \${d.origin} &nbsp; <b>Created:</b> \${d.created_at}</p>
      <p style="margin:12px 0 4px"><b>Fields</b></p>
      <pre>\${JSON.stringify(JSON.parse(d.fields), null, 2)}</pre>
      <p style="margin:12px 0 4px"><b>Metadata</b></p>
      <pre>\${JSON.stringify(JSON.parse(d.metadata), null, 2)}</pre>
    \`;
    openModalId('sub-detail-modal');
  } catch(e) { toast(e.message, false); }
}

async function loadForms() {
  try {
    const d = await api('/forms');
    const tbody = document.getElementById('forms-tbody');
    tbody.innerHTML = d.forms.length ? d.forms.map(f => \`
      <tr>
        <td><b>\${f.form_id}</b></td>
        <td>\${f.name}</td>
        <td style="font-size:.78rem">\${JSON.parse(f.allowed_origins).join(', ')}</td>
        <td>
          <a href="#" onclick="loadFormDetails('\${f.form_id}');return false">Filters &amp; Notify ↓</a>
        </td>
        <td>\${f.active ? '✓' : '✗'}</td>
        <td>
          <button class="btn btn-ghost" style="padding:3px 8px" onclick="editForm(\${JSON.stringify(f).replace(/"/g,'&quot;')})">Edit</button>
        </td>
      </tr>\`).join('') : '<tr><td colspan="6" class="empty">No forms registered</td></tr>';
  } catch(e) { toast(e.message, false); }
}

async function loadFormDetails(formId) {
  activeFormId = formId;
  document.getElementById('filter-section').classList.remove('hidden');
  document.getElementById('notify-section').classList.remove('hidden');
  document.getElementById('filter-form-label').textContent = formId;
  document.getElementById('notify-form-label').textContent = formId;
  await Promise.all([loadFilters(formId), loadNotifyConfigs(formId)]);
}

async function loadFilters(formId) {
  try {
    const d = await api('/forms/' + formId + '/filters');
    const tbody = document.getElementById('filter-tbody');
    tbody.innerHTML = d.rules.length ? d.rules.map(r => \`
      <tr>
        <td>\${r.priority}</td><td>\${r.name}</td><td>\${r.source}</td>
        <td><code>\${r.pattern}</code></td>
        <td><code>\${r.value_pattern || '(any)'}</code></td>
        <td><span class="badge \${r.action}">\${r.action}</span></td>
        <td><button class="btn btn-danger" style="padding:2px 8px" onclick="deleteFilter(\${r.id})">Del</button></td>
      </tr>\`).join('') : '<tr><td colspan="7" class="empty">No filter rules</td></tr>';
  } catch(e) { toast(e.message, false); }
}

async function loadNotifyConfigs(formId) {
  try {
    const d = await api('/forms/' + formId + '/notify-configs');
    const tbody = document.getElementById('notify-tbody');
    tbody.innerHTML = d.configs.length ? d.configs.map(c => \`
      <tr>
        <td>\${c.name}</td>
        <td style="font-size:.78rem;word-break:break-all">\${c.notify_url_template}</td>
        <td>\${c.auth_type}</td><td>\${c.active ? '✓' : '✗'}</td>
        <td><button class="btn btn-danger" style="padding:2px 8px" onclick="deleteNotifyConfig(\${c.id})">Del</button></td>
      </tr>\`).join('') : '<tr><td colspan="5" class="empty">No notify configs</td></tr>';
  } catch(e) { toast(e.message, false); }
}

async function loadLogs() {
  const formId = document.getElementById('log-form-filter').value;
  try {
    const d = await api('/delivery-log?limit=20&offset=' + logOffset + (formId ? '&form_id=' + formId : ''));
    document.getElementById('log-page-info').textContent = \`\${logOffset + 1}–\${Math.min(logOffset + 20, d.total)} of \${d.total}\`;
    document.getElementById('log-prev').disabled = logOffset === 0;
    document.getElementById('log-next').disabled = logOffset + 20 >= d.total;
    const tbody = document.getElementById('log-tbody');
    tbody.innerHTML = d.logs.length ? d.logs.map(l => \`
      <tr>
        <td style="white-space:nowrap">\${l.created_at}</td>
        <td style="font-size:.78rem">\${l.submission_id.slice(0,10)}…</td>
        <td>\${l.form_id}</td>
        <td style="font-size:.75rem;word-break:break-all">\${l.notify_url}</td>
        <td>\${l.status_code ? (\`<span class="badge \${l.status_code < 300 ? 'done' : 'failed'}">\${l.status_code}</span>\`) : '<span class="badge blocked">ERR</span>'}</td>
        <td>\${l.duration_ms ? l.duration_ms + 'ms' : '—'}</td>
        <td style="font-size:.75rem;color:var(--danger)">\${l.error || ''}</td>
      </tr>\`).join('') : '<tr><td colspan="7" class="empty">No delivery logs</td></tr>';
  } catch(e) { toast(e.message, false); }
}

function logPage(dir) { logOffset = Math.max(0, logOffset + dir * 20); loadLogs(); }

// ── Modals ──────────────────────────────────────────────────────────────────

function openModalId(id) {
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(e) {
  if (!e || e.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  }
}

function openFormModal(existing) {
  document.getElementById('fm-form-id').value = existing?.form_id || '';
  document.getElementById('fm-name').value = existing?.name || '';
  document.getElementById('fm-origins').value = existing ? JSON.parse(existing.allowed_origins).join('\\n') : '*';
  const verifyAuth = existing?.verify_auth ? JSON.parse(existing.verify_auth) : { type: 'none' };
  document.getElementById('fm-auth-type').value = verifyAuth.type;
  renderAuthFields(verifyAuth);
  openModalId('form-modal');
}
function editForm(f) { openFormModal(f); }

function renderAuthFields(existing) {
  const type = document.getElementById('fm-auth-type').value;
  const container = document.getElementById('fm-auth-fields');
  const cur = existing || {};
  const fields = {
    hmac_github:     [['secret','Secret']],
    hmac_stripe:     [['secret','Webhook Secret']],
    hmac_hubspot_v2: [['secret','Client Secret']],
    hmac_hubspot_v3: [['secret','Client Secret']],
    hmac_twilio:     [['auth_token','Auth Token']],
    hmac_custom:     [['secret','Secret'],['algorithm','Algorithm|SHA-256|SHA-1'],['header_name','Signature Header'],['prefix','Prefix (e.g. sha256=)'],['message_format','Message Format|body|timestamp.body|method+uri+body']],
    bearer:          [['token','Token']],
    basic:           [['username','Username'],['password','Password']],
    header:          [['name','Header Name'],['value','Header Value']],
  }[type] || [];

  container.innerHTML = fields.map(([key, label]) => {
    const parts = label.split('|');
    const lbl = parts[0];
    if (parts.length > 1) {
      const opts = parts.slice(1).map(o => \`<option \${cur[key]===o?'selected':''}>\${o}</option>\`).join('');
      return \`<div class="field"><label>\${lbl}</label><select id="fm-f-\${key}">\${opts}</select></div>\`;
    }
    return \`<div class="field"><label>\${lbl}</label><input id="fm-f-\${key}" value="\${cur[key]||''}"></div>\`;
  }).join('');
}

async function saveForm() {
  const formId = document.getElementById('fm-form-id').value.trim();
  const name = document.getElementById('fm-name').value.trim();
  const origins = document.getElementById('fm-origins').value.trim().split('\\n').map(s => s.trim()).filter(Boolean);
  const authType = document.getElementById('fm-auth-type').value;

  const authKeys = { hmac_github:'secret', hmac_stripe:'secret', hmac_hubspot_v2:'secret',
    hmac_hubspot_v3:'secret', hmac_twilio:'auth_token', bearer:'token', basic:null, header:null, hmac_custom:null };

  let verify_auth = { type: authType };
  const fieldsEl = document.getElementById('fm-auth-fields');
  fieldsEl.querySelectorAll('input,select').forEach(el => {
    const key = el.id.replace('fm-f-', '');
    verify_auth[key] = el.value;
  });

  try {
    await api('/forms', { method: 'POST', body: JSON.stringify({ form_id: formId, name, allowed_origins: origins, verify_auth }) });
    toast('Form saved'); closeModal(); loadForms();
  } catch(e) { toast(e.message, false); }
}

function openFilterModal() {
  document.getElementById('fl-name').value = '';
  document.getElementById('fl-priority').value = 100;
  document.getElementById('fl-source').value = 'body_key';
  document.getElementById('fl-pattern').value = '';
  document.getElementById('fl-value-pattern').value = '';
  document.getElementById('fl-action').value = 'block';
  openModalId('filter-modal');
}

async function saveFilter() {
  const body = {
    name: document.getElementById('fl-name').value.trim(),
    priority: parseInt(document.getElementById('fl-priority').value),
    source: document.getElementById('fl-source').value,
    pattern: document.getElementById('fl-pattern').value.trim(),
    value_pattern: document.getElementById('fl-value-pattern').value.trim() || null,
    action: document.getElementById('fl-action').value,
  };
  try {
    await api('/forms/' + activeFormId + '/filters', { method: 'POST', body: JSON.stringify(body) });
    toast('Filter rule saved'); closeModal(); loadFilters(activeFormId);
  } catch(e) { toast(e.message, false); }
}

async function deleteFilter(id) {
  if (!confirm('Delete this filter rule?')) return;
  try {
    await api('/forms/' + activeFormId + '/filters/' + id, { method: 'DELETE' });
    toast('Deleted'); loadFilters(activeFormId);
  } catch(e) { toast(e.message, false); }
}

function openNotifyModal() {
  ['nc-name','nc-url','nc-headers','nc-body'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('nc-method').value = 'POST';
  document.getElementById('nc-auth-type').value = 'none';
  renderNotifyAuthFields();
  openModalId('notify-modal');
}

function renderNotifyAuthFields() {
  const type = document.getElementById('nc-auth-type').value;
  const container = document.getElementById('nc-auth-fields');
  const fields = {
    bearer:      [['token','Token']],
    basic:       [['username','Username'],['password','Password']],
    header:      [['name','Header Name'],['value','Header Value']],
    hmac_sha256: [['secret','HMAC Secret'],['header_name','Signature Header (e.g. X-Signature)']],
    hmac_sha1:   [['secret','HMAC Secret'],['header_name','Signature Header']],
    oauth2_cc:   [['token_url','Token URL'],['client_id','Client ID'],['client_secret','Client Secret'],['scope','Scope (optional)']],
  }[type] || [];
  container.innerHTML = fields.map(([key, label]) =>
    \`<div class="field"><label>\${label}</label><input id="nc-f-\${key}"></div>\`
  ).join('');
}

async function saveNotify() {
  const authType = document.getElementById('nc-auth-type').value;
  const authConfig = { type: authType };
  document.getElementById('nc-auth-fields').querySelectorAll('input').forEach(el => {
    authConfig[el.id.replace('nc-f-', '')] = el.value;
  });

  const body = {
    name: document.getElementById('nc-name').value.trim(),
    notify_url_template: document.getElementById('nc-url').value.trim(),
    http_method: document.getElementById('nc-method').value,
    extra_headers: document.getElementById('nc-headers').value.trim() || null,
    body_template: document.getElementById('nc-body').value.trim() || null,
    auth_type: authType,
    auth_config: authType === 'none' ? null : authConfig,
  };
  try {
    await api('/forms/' + activeFormId + '/notify-configs', { method: 'POST', body: JSON.stringify(body) });
    toast('Notify config saved'); closeModal(); loadNotifyConfigs(activeFormId);
  } catch(e) { toast(e.message, false); }
}

async function deleteNotifyConfig(id) {
  if (!confirm('Delete this notify config?')) return;
  try {
    await api('/forms/' + activeFormId + '/notify-configs/' + id, { method: 'DELETE' });
    toast('Deleted'); loadNotifyConfigs(activeFormId);
  } catch(e) { toast(e.message, false); }
}

function badge(status) {
  return \`<span class="badge \${status}">\${status}</span>\`;
}
</script>
</body>
</html>`;
}

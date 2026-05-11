export function adminHtml(): string {
  return /* html */`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ETL Zone · Admin</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d0f18;--surf:#151722;--surf2:#1c1f2e;--brd:#252840;--acc:#6366f1;--acc2:#22d3ee;--text:#e2e8f0;--muted:#64748b;--ok:#22c55e;--warn:#f59e0b;--err:#ef4444;--info:#818cf8}
body{font:14px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column;height:100vh;overflow:hidden}
header{background:var(--surf);border-bottom:1px solid var(--brd);padding:10px 20px;display:flex;align-items:center;gap:12px;flex-shrink:0}
header h1{font-size:.9rem;font-weight:700;letter-spacing:.5px;color:var(--acc2)}
#auth-row{margin-left:auto;display:flex;gap:8px;align-items:center}
#auth-row input{background:var(--bg);border:1px solid var(--brd);color:var(--text);padding:4px 10px;border-radius:5px;font-size:.8rem;width:200px}
#auth-row button{background:var(--acc);color:#fff;border:none;padding:4px 12px;border-radius:5px;cursor:pointer;font-size:.8rem}
#key-status{font-size:.75rem;color:var(--muted)}
.layout{display:flex;flex:1;overflow:hidden}
nav{width:180px;background:var(--surf);border-right:1px solid var(--brd);padding:12px 8px;display:flex;flex-direction:column;gap:2px;flex-shrink:0;overflow-y:auto}
nav button{background:none;border:none;color:var(--muted);padding:7px 12px;cursor:pointer;font-size:.82rem;border-radius:6px;text-align:left;width:100%;transition:background .1s,color .1s}
nav button.active,nav button:hover{background:rgba(99,102,241,.15);color:var(--text)}
nav .nav-group{font-size:.7rem;color:var(--muted);padding:12px 12px 4px;text-transform:uppercase;letter-spacing:.5px}
main{flex:1;overflow-y:auto;padding:20px}
.page{display:none} .page.active{display:block}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:20px}
.stat{background:var(--surf);border:1px solid var(--brd);border-radius:8px;padding:14px 16px}
.stat .val{font-size:1.6rem;font-weight:700} .stat .lbl{font-size:.72rem;color:var(--muted);text-transform:uppercase}
.stat.ok .val{color:var(--ok)} .stat.warn .val{color:var(--warn)} .stat.err .val{color:var(--err)} .stat.info .val{color:var(--info)} .stat.acc .val{color:var(--acc2)}
.card{background:var(--surf);border:1px solid var(--brd);border-radius:8px;margin-bottom:14px}
.card-hd{padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--brd)}
.card-hd h2{font-size:.88rem;font-weight:600}
.card-bd{padding:0}
table{width:100%;border-collapse:collapse;font-size:.82rem}
th{text-align:left;padding:7px 12px;color:var(--muted);font-weight:500;border-bottom:1px solid var(--brd);white-space:nowrap}
td{padding:7px 12px;border-bottom:1px solid var(--brd);vertical-align:top;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
tr:last-child td{border-bottom:0}
tr:hover td{background:rgba(255,255,255,.02)}
.badge{display:inline-block;padding:2px 7px;border-radius:99px;font-size:.7rem;font-weight:600;text-transform:uppercase;white-space:nowrap}
.b-pending{background:#1e293b;color:var(--muted)} .b-processing{background:#1e3a5f;color:var(--acc2)}
.b-done{background:#14532d;color:var(--ok)} .b-failed{background:#450a0a;color:var(--err)}
.b-flagged{background:#431407;color:var(--warn)} .b-blocked{background:#3b0764;color:#d8b4fe}
.b-ok{background:#14532d;color:var(--ok)} .b-error{background:#450a0a;color:var(--err)}
.b-skip{background:#1e293b;color:var(--muted)} .b-partial{background:#422006;color:var(--warn)}
.b-accepted{background:#14532d;color:var(--ok)} .b-rate_limited,.b-auth_failed,.b-filter_blocked,.b-bad_request{background:#450a0a;color:var(--err)}
.btn{border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:.8rem;font-weight:500;display:inline-flex;align-items:center;gap:5px}
.btn-primary{background:var(--acc);color:#fff} .btn-ghost{background:transparent;border:1px solid var(--brd);color:var(--text)}
.btn-danger{background:var(--err);color:#fff} .btn-sm{padding:3px 8px;font-size:.75rem}
.toolbar{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;align-items:center}
.toolbar select,.toolbar input[type=text]{background:var(--surf2);border:1px solid var(--brd);color:var(--text);padding:5px 10px;border-radius:5px;font-size:.8rem}
.pager{display:flex;gap:8px;align-items:center;padding:10px 16px;font-size:.8rem;color:var(--muted)}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:100;display:flex;align-items:center;justify-content:center;display:none}
.modal-bg.open{display:flex}
.modal{background:var(--surf);border:1px solid var(--brd);border-radius:10px;padding:20px;width:min(95vw,540px);max-height:90vh;overflow-y:auto}
.modal h3{font-size:.95rem;margin-bottom:14px}
.field{margin-bottom:10px}
.field label{display:block;font-size:.78rem;color:var(--muted);margin-bottom:3px}
.field input,.field select,.field textarea{width:100%;background:var(--bg);border:1px solid var(--brd);color:var(--text);padding:7px 10px;border-radius:5px;font-size:.82rem;font-family:inherit}
.field textarea{min-height:70px;resize:vertical}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--acc)}
.modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:14px}
.empty{text-align:center;padding:32px;color:var(--muted);font-size:.85rem}
pre{background:var(--bg);border:1px solid var(--brd);border-radius:5px;padding:10px;font-size:.75rem;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:300px}
.code-editor{font-family:monospace;min-height:100px}
#toast{position:fixed;bottom:20px;right:20px;z-index:200;display:flex;flex-direction:column;gap:6px}
.toast{background:var(--surf);border:1px solid var(--brd);padding:8px 14px;border-radius:7px;font-size:.82rem;animation:fi .2s}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.section-actions{margin-bottom:12px}
.inline-section{padding:12px 16px;border-top:1px solid var(--brd)}
.inline-section h3{font-size:.82rem;font-weight:600;color:var(--muted);margin-bottom:8px}
a.link{color:var(--acc);cursor:pointer;text-decoration:none}
</style>
</head>
<body>
<header>
  <h1>⬡ ETL Zone</h1><span style="color:var(--muted);font-size:.8rem">Admin · d1-manager enhanced</span>
  <div id="auth-row">
    <input id="api-key" type="password" placeholder="Admin API key…">
    <button onclick="connect()">Connect</button>
    <span id="key-status"></span>
  </div>
</header>
<div class="layout">
<nav>
  <span class="nav-group">Overview</span>
  <button onclick="nav('dashboard',this)" class="active">Dashboard</button>
  <button onclick="nav('submissions',this)">Submissions</button>
  <span class="nav-group">Config</span>
  <button onclick="nav('forms',this)">Forms</button>
  <button onclick="nav('mapping',this)">Mapping Rules</button>
  <button onclick="nav('load-targets',this)">Load Targets</button>
  <button onclick="nav('filters',this)">Filter Rules</button>
  <button onclick="nav('notify',this)">Notify Configs</button>
  <span class="nav-group">Observability</span>
  <button onclick="nav('ingress-log',this)">Ingress Log</button>
  <button onclick="nav('etl-log',this)">ETL Log</button>
  <button onclick="nav('delivery-log',this)">Delivery Log</button>
  <span class="nav-group">Data</span>
  <button onclick="nav('d1-browser',this)">D1 Browser</button>
  <button onclick="nav('kv-browser',this)">KV Browser</button>
</nav>
<main>

<!-- DASHBOARD -->
<div id="p-dashboard" class="page active">
  <div class="stats" id="stat-grid">
    <div class="stat info"><div class="val" id="st-total">—</div><div class="lbl">Total subs</div></div>
    <div class="stat acc"><div class="val" id="st-today">—</div><div class="lbl">Today</div></div>
    <div class="stat warn"><div class="val" id="st-pending">—</div><div class="lbl">Pending</div></div>
    <div class="stat ok"><div class="val" id="st-done">—</div><div class="lbl">Done</div></div>
    <div class="stat err"><div class="val" id="st-failed">—</div><div class="lbl">Failed</div></div>
    <div class="stat info"><div class="val" id="st-ingress">—</div><div class="lbl">Ingress today</div></div>
    <div class="stat ok"><div class="val" id="st-dlok">—</div><div class="lbl">Delivery OK</div></div>
    <div class="stat err"><div class="val" id="st-dlfail">—</div><div class="lbl">Delivery fail</div></div>
  </div>
  <div class="card">
    <div class="card-hd"><h2>Recent Submissions</h2><button class="btn btn-ghost btn-sm" onclick="loadDashboard()">↻ Refresh</button></div>
    <div class="card-bd"><table><thead><tr><th>ID</th><th>Form</th><th>Status</th><th>Origin</th><th>Created</th></tr></thead>
    <tbody id="recent-body"><tr><td colspan="5" class="empty">Loading…</td></tr></tbody></table></div>
  </div>
</div>

<!-- SUBMISSIONS -->
<div id="p-submissions" class="page">
  <div class="toolbar">
    <select id="sub-form" onchange="loadSubs()"><option value="">All forms</option></select>
    <select id="sub-status" onchange="loadSubs()">
      <option value="">All</option><option>pending</option><option>processing</option>
      <option>done</option><option>failed</option><option>flagged</option><option>blocked</option>
    </select>
    <button class="btn btn-ghost" onclick="loadSubs()">↻</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>ID</th><th>Form</th><th>Status</th><th>Origin</th><th>Created</th><th></th></tr></thead>
    <tbody id="sub-body"><tr><td colspan="6" class="empty">Loading…</td></tr></tbody></table>
    <div class="pager"><button class="btn btn-ghost btn-sm" id="sub-prev" onclick="subPage(-1)">← Prev</button><span id="sub-info"></span><button class="btn btn-ghost btn-sm" id="sub-next" onclick="subPage(1)">Next →</button></div>
  </div></div>
</div>

<!-- FORMS -->
<div id="p-forms" class="page">
  <div class="toolbar"><button class="btn btn-primary" onclick="openFormModal()">+ Register Form</button></div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Form ID</th><th>Name</th><th>Allowed Origins</th><th>Active</th><th></th></tr></thead>
    <tbody id="forms-body"><tr><td colspan="5" class="empty">Loading…</td></tr></tbody></table>
  </div></div>
</div>

<!-- MAPPING RULES -->
<div id="p-mapping" class="page">
  <div class="toolbar">
    <select id="map-form" onchange="loadMappingRules()"><option value="">Select a form…</option></select>
    <button class="btn btn-primary" onclick="openMappingModal()">+ Add Rule</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Pri</th><th>Name</th><th>Source</th><th>→ Target Field</th><th>Transform</th><th>Required</th><th></th></tr></thead>
    <tbody id="map-body"><tr><td colspan="7" class="empty">Select a form to view mapping rules</td></tr></tbody></table>
  </div></div>
</div>

<!-- LOAD TARGETS -->
<div id="p-load-targets" class="page">
  <div class="toolbar">
    <select id="lt-form" onchange="loadLT()"><option value="">Select a form…</option></select>
    <button class="btn btn-primary" onclick="openLTModal()">+ Add Target</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Name</th><th>DB Binding</th><th>Table</th><th>Upsert Key</th><th>Active</th><th></th></tr></thead>
    <tbody id="lt-body"><tr><td colspan="6" class="empty">Select a form</td></tr></tbody></table>
  </div></div>
</div>

<!-- FILTER RULES -->
<div id="p-filters" class="page">
  <div class="toolbar">
    <select id="fl-form" onchange="loadFilters()"><option value="">Select a form…</option></select>
    <button class="btn btn-primary" onclick="openFilterModal()">+ Add Rule</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Pri</th><th>Name</th><th>Source</th><th>Pattern</th><th>Value Pattern</th><th>Action</th><th></th></tr></thead>
    <tbody id="fl-body"><tr><td colspan="7" class="empty">Select a form</td></tr></tbody></table>
  </div></div>
</div>

<!-- NOTIFY CONFIGS -->
<div id="p-notify" class="page">
  <div class="toolbar">
    <select id="nc-form" onchange="loadNC()"><option value="">Select a form…</option></select>
    <button class="btn btn-primary" onclick="openNCModal()">+ Add Config</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Name</th><th>URL Template</th><th>Auth</th><th>Active</th><th></th></tr></thead>
    <tbody id="nc-body"><tr><td colspan="5" class="empty">Select a form</td></tr></tbody></table>
  </div></div>
</div>

<!-- INGRESS LOG -->
<div id="p-ingress-log" class="page">
  <div class="toolbar">
    <select id="il-form"><option value="">All forms</option></select>
    <select id="il-reason"><option value="">All reasons</option><option>accepted</option><option>rate_limited</option><option>auth_failed</option><option>filter_blocked</option><option>bad_request</option><option>parse_error</option></select>
    <button class="btn btn-ghost" onclick="loadIL()">↻</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Time</th><th>Form</th><th>Method</th><th>Origin</th><th>IP</th><th>Status</th><th>Reason</th><th>ms</th></tr></thead>
    <tbody id="il-body"><tr><td colspan="8" class="empty">Loading…</td></tr></tbody></table>
    <div class="pager"><button class="btn btn-ghost btn-sm" onclick="ilPage(-1)">← Prev</button><span id="il-info"></span><button class="btn btn-ghost btn-sm" onclick="ilPage(1)">Next →</button></div>
  </div></div>
</div>

<!-- ETL LOG -->
<div id="p-etl-log" class="page">
  <div class="toolbar">
    <select id="etl-form"><option value="">All forms</option></select>
    <select id="etl-step"><option value="">All steps</option><option>extract</option><option>transform</option><option>validate</option><option>load</option><option>deliver</option><option>complete</option></select>
    <button class="btn btn-ghost" onclick="loadEL()">↻</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Time</th><th>Submission</th><th>Form</th><th>Step</th><th>Status</th><th>ms</th><th>Error</th><th></th></tr></thead>
    <tbody id="el-body"><tr><td colspan="8" class="empty">Loading…</td></tr></tbody></table>
    <div class="pager"><button class="btn btn-ghost btn-sm" onclick="elPage(-1)">← Prev</button><span id="el-info"></span><button class="btn btn-ghost btn-sm" onclick="elPage(1)">Next →</button></div>
  </div></div>
</div>

<!-- DELIVERY LOG -->
<div id="p-delivery-log" class="page">
  <div class="toolbar">
    <select id="dl-form"><option value="">All forms</option></select>
    <button class="btn btn-ghost" onclick="loadDL()">↻</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Time</th><th>Submission</th><th>Form</th><th>URL</th><th>Status</th><th>ms</th><th>Error</th></tr></thead>
    <tbody id="dl-body"><tr><td colspan="7" class="empty">Loading…</td></tr></tbody></table>
    <div class="pager"><button class="btn btn-ghost btn-sm" onclick="dlPage(-1)">← Prev</button><span id="dl-info"></span><button class="btn btn-ghost btn-sm" onclick="dlPage(1)">Next →</button></div>
  </div></div>
</div>

<!-- D1 BROWSER -->
<div id="p-d1-browser" class="page">
  <div style="display:grid;grid-template-columns:220px 1fr;gap:14px">
    <div>
      <div class="card">
        <div class="card-hd"><h2>Tables</h2><button class="btn btn-ghost btn-sm" onclick="loadD1Tables()">↻</button></div>
        <div class="card-bd" id="d1-table-list" style="padding:8px"></div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="card-hd"><h2>Query</h2></div>
        <div class="card-bd" style="padding:12px">
          <textarea id="d1-sql" class="code-editor" style="width:100%;background:var(--bg);border:1px solid var(--brd);color:var(--text);border-radius:5px;padding:8px;font-family:monospace;font-size:.82rem;resize:vertical" placeholder="SELECT * FROM form_submissions LIMIT 20"></textarea>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-primary" onclick="runD1Query(false)">▶ Query (read-only)</button>
            <button class="btn btn-danger" onclick="runD1Query(true)">⚠ Exec (mutations)</button>
          </div>
        </div>
      </div>
      <div class="card" id="d1-result-card" style="display:none">
        <div class="card-hd"><h2>Results</h2><span id="d1-result-meta" style="font-size:.78rem;color:var(--muted)"></span></div>
        <div class="card-bd"><div id="d1-result-content" style="overflow-x:auto"></div></div>
      </div>
    </div>
  </div>
</div>

<!-- KV BROWSER -->
<div id="p-kv-browser" class="page">
  <div class="toolbar">
    <select id="kv-ns"><option value="TASKS">TASKS_KV</option><option value="RATE">RATE_KV</option></select>
    <input type="text" id="kv-prefix" placeholder="Prefix filter…" style="width:200px">
    <button class="btn btn-primary" onclick="loadKV()">List</button>
  </div>
  <div class="card"><div class="card-bd">
    <table><thead><tr><th>Key</th><th>Expires</th><th></th></tr></thead>
    <tbody id="kv-body"><tr><td colspan="3" class="empty">Use list above</td></tr></tbody></table>
  </div></div>
  <div class="card" id="kv-val-card" style="display:none">
    <div class="card-hd"><h2>Value: <span id="kv-val-key"></span></h2><button class="btn btn-ghost btn-sm" onclick="document.getElementById('kv-val-card').style.display='none'">Close</button></div>
    <div class="card-bd" style="padding:12px"><pre id="kv-val-content"></pre></div>
  </div>
</div>

</main>
</div>

<!-- Modals -->
<div id="modal-bg" class="modal-bg" onclick="if(event.target===this)closeModal()">

  <div id="form-modal" class="modal" style="display:none">
    <h3>Register / Update Form</h3>
    <div class="field"><label>Form ID *</label><input id="fm-id"></div>
    <div class="field"><label>Name *</label><input id="fm-name"></div>
    <div class="field"><label>Allowed Origins (one per line, * = any)</label><textarea id="fm-origins">*</textarea></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveForm()">Save</button></div>
  </div>

  <div id="map-modal" class="modal" style="display:none">
    <h3>Mapping Rule</h3>
    <div class="field"><label>Name *</label><input id="mm-name"></div>
    <div class="field"><label>Source Expression (field name or {{template}})</label><input id="mm-src" placeholder="email  or  {{field.first}} {{field.last}}"></div>
    <div class="field"><label>Target DTO Field *</label><input id="mm-target" placeholder="email_address"></div>
    <div class="field"><label>Transform</label>
      <select id="mm-transform" onchange="renderTransformConfig()">
        <option value="passthrough">passthrough</option><option value="trim">trim</option>
        <option value="lowercase">lowercase</option><option value="uppercase">uppercase</option>
        <option value="regex_extract">regex_extract</option><option value="regex_replace">regex_replace</option>
        <option value="template">template</option><option value="number">number</option>
        <option value="boolean">boolean</option><option value="date_iso">date_iso</option>
        <option value="json_parse">json_parse</option><option value="truncate">truncate</option>
      </select>
    </div>
    <div id="mm-transform-config"></div>
    <div class="field"><label>Default Value (if source is empty)</label><input id="mm-default" placeholder="(leave blank for none)"></div>
    <div class="field"><label>Priority</label><input id="mm-priority" type="number" value="100"></div>
    <div style="display:flex;gap:12px">
      <label style="display:flex;gap:6px;align-items:center;font-size:.82rem"><input type="checkbox" id="mm-required"> Required</label>
    </div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveMappingRule()">Save</button></div>
  </div>

  <div id="lt-modal" class="modal" style="display:none">
    <h3>Load Target</h3>
    <div class="field"><label>Name *</label><input id="lt-name"></div>
    <div class="field"><label>D1 Binding Name</label><input id="lt-binding" value="DB" placeholder="DB"></div>
    <div class="field"><label>Target Table *</label><input id="lt-table" placeholder="leads"></div>
    <div class="field"><label>Upsert Key (column for ON CONFLICT, leave blank for INSERT)</label><input id="lt-upsert" placeholder="email"></div>
    <div class="field"><label>Field Allowlist (comma-separated DTO fields; blank = all)</label><input id="lt-allow" placeholder="email,name,message"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveLT()">Save</button></div>
  </div>

  <div id="fl-modal" class="modal" style="display:none">
    <h3>Filter Rule</h3>
    <div class="field"><label>Name *</label><input id="fl-name"></div>
    <div class="field"><label>Priority</label><input id="fl-priority" type="number" value="100"></div>
    <div class="field"><label>Source</label><select id="fl-source"><option value="query_param">query_param</option><option value="body_key">body_key</option><option value="body_value">body_value</option><option value="header">header</option><option value="origin">origin</option><option value="ip">ip</option></select></div>
    <div class="field"><label>Key Pattern (* = wildcard)</label><input id="fl-pattern" placeholder="honeypot"></div>
    <div class="field"><label>Value Pattern (optional)</label><input id="fl-value" placeholder="*spam*"></div>
    <div class="field"><label>Action</label><select id="fl-action"><option value="block">block</option><option value="allow">allow</option><option value="flag">flag</option></select></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveFilter()">Save</button></div>
  </div>

  <div id="nc-modal" class="modal" style="display:none">
    <h3>Notify Config</h3>
    <div class="field"><label>Name *</label><input id="nc-name"></div>
    <div class="field"><label>URL Template * ({{submission.id}}, {{field.email}}, …)</label><input id="nc-url"></div>
    <div class="field"><label>Method</label><select id="nc-method"><option>POST</option><option>PUT</option><option>GET</option></select></div>
    <div class="field"><label>Extra Headers (JSON)</label><textarea id="nc-headers" placeholder='{"X-Source":"etl-zone"}'></textarea></div>
    <div class="field"><label>Body Template (blank = full submission JSON)</label><textarea id="nc-body" placeholder='{"email":"{{field.email}}"}'></textarea></div>
    <div class="field"><label>Auth Type</label><select id="nc-auth" onchange="renderNCAuth()"><option value="none">none</option><option value="bearer">bearer</option><option value="basic">basic</option><option value="header">header</option><option value="hmac_sha256">hmac_sha256</option><option value="hmac_sha1">hmac_sha1</option><option value="oauth2_cc">oauth2_cc</option></select></div>
    <div id="nc-auth-fields"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNC()">Save</button></div>
  </div>

  <div id="detail-modal" class="modal" style="display:none;width:min(95vw,800px)">
    <h3>Submission Detail</h3>
    <div id="detail-content"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>
  </div>

  <div id="etl-detail-modal" class="modal" style="display:none;width:min(95vw,700px)">
    <h3>ETL Step Detail</h3>
    <div id="etl-detail-content"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>
  </div>

</div>
<div id="toast"></div>

<script>
let KEY = localStorage.getItem('etl_key') || '';
let forms = [];
let subOff=0, ilOff=0, elOff=0, dlOff=0;
let activeMapForm='', activeLTForm='', activeFlForm='', activeNCForm='';

if (KEY) { document.getElementById('api-key').value = KEY; document.getElementById('key-status').textContent = '● OK'; init(); }

async function connect() {
  KEY = document.getElementById('api-key').value.trim();
  localStorage.setItem('etl_key', KEY);
  document.getElementById('key-status').textContent = KEY ? '● OK' : '';
  if (KEY) init();
}

async function api(path, opts={}) {
  const r = await fetch('/api' + path, { ...opts, headers: { 'X-Admin-Key': KEY, 'Content-Type': 'application/json', ...(opts.headers||{}) } });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

function toast(msg, ok=true) {
  const el = document.createElement('div'); el.className = 'toast';
  el.style.borderColor = ok ? 'var(--ok)' : 'var(--err)'; el.textContent = msg;
  document.getElementById('toast').appendChild(el); setTimeout(() => el.remove(), 3000);
}

function nav(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('p-'+id).classList.add('active'); btn.classList.add('active');
  if (id==='dashboard') loadDashboard();
  if (id==='submissions') { fillFormSel('sub-form'); loadSubs(); }
  if (id==='forms') loadForms();
  if (id==='mapping') fillFormSel('map-form');
  if (id==='load-targets') fillFormSel('lt-form');
  if (id==='filters') fillFormSel('fl-form');
  if (id==='notify') fillFormSel('nc-form');
  if (id==='ingress-log') { fillFormSel('il-form'); loadIL(); }
  if (id==='etl-log') { fillFormSel('etl-form'); loadEL(); }
  if (id==='delivery-log') { fillFormSel('dl-form'); loadDL(); }
  if (id==='d1-browser') loadD1Tables();
}

async function init() { forms = (await api('/forms').catch(()=>({forms:[]}))).forms; await loadDashboard(); }

async function loadDashboard() {
  try {
    const d = await api('/stats');
    const s = d.submissions;
    ['total','today','pending','done','failed'].forEach(k => { const el = document.getElementById('st-'+k); if(el) el.textContent = s[k] ?? 0; });
    document.getElementById('st-ingress').textContent = d.ingress?.today ?? 0;
    document.getElementById('st-dlok').textContent = d.delivery?.ok ?? 0;
    document.getElementById('st-dlfail').textContent = d.delivery?.fail ?? 0;
    document.getElementById('recent-body').innerHTML = d.recent.length
      ? d.recent.map(r => \`<tr><td><a class="link" onclick="showDetail('\${r.id}')">\${r.id.slice(0,12)}…</a></td><td>\${r.form_id}</td><td>\${badge(r.status)}</td><td>\${r.origin}</td><td>\${r.created_at.slice(0,16)}</td></tr>\`).join('')
      : '<tr><td colspan="5" class="empty">No submissions</td></tr>';
  } catch(e) { toast(e.message, false); }
}

async function fillFormSel(id) {
  try {
    if (!forms.length) forms = (await api('/forms')).forms;
    const sel = document.getElementById(id); if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = '<option value="">All forms</option>' + forms.map(f => \`<option value="\${f.form_id}">\${f.form_id}</option>\`).join('');
    if (cur) sel.value = cur;
  } catch(_) {}
}

// ── Submissions ────────────────────────────────────────────────────────────
async function loadSubs() {
  const fid = document.getElementById('sub-form').value, st = document.getElementById('sub-status').value;
  const q = '/submissions?limit=20&offset='+subOff+(fid?'&form_id='+fid:'')+(st?'&status='+st:'');
  try {
    const d = await api(q);
    document.getElementById('sub-info').textContent = \`\${subOff+1}–\${Math.min(subOff+20,d.total)} of \${d.total}\`;
    document.getElementById('sub-prev').disabled = subOff===0;
    document.getElementById('sub-next').disabled = subOff+20>=d.total;
    document.getElementById('sub-body').innerHTML = d.submissions.length
      ? d.submissions.map(r => \`<tr><td><a class="link" onclick="showDetail('\${r.id}')">\${r.id.slice(0,12)}…</a></td><td>\${r.form_id}</td><td>\${badge(r.status)}</td><td>\${r.origin}</td><td>\${r.created_at.slice(0,16)}</td><td><button class="btn btn-ghost btn-sm" onclick="showDetail('\${r.id}')">View</button></td></tr>\`).join('')
      : '<tr><td colspan="6" class="empty">No results</td></tr>';
  } catch(e) { toast(e.message, false); }
}
function subPage(d) { subOff = Math.max(0, subOff + d*20); loadSubs(); }

async function showDetail(id) {
  try {
    const d = await api('/submissions/'+id);
    const s = d.submission;
    document.getElementById('detail-content').innerHTML = \`
      <p style="margin-bottom:8px"><b>ID:</b> \${s.id} &nbsp; <b>Form:</b> \${s.form_id} &nbsp; \${badge(s.status)}</p>
      <p style="margin-bottom:12px"><b>Origin:</b> \${s.origin} · <b>Created:</b> \${s.created_at.slice(0,16)}</p>
      <details><summary style="cursor:pointer;margin-bottom:4px">Raw Fields</summary><pre>\${fmt(s.raw_fields)}</pre></details>
      <details style="margin-top:8px"><summary style="cursor:pointer;margin-bottom:4px">DTO Fields</summary><pre>\${fmt(s.dto_fields)}</pre></details>
      <details style="margin-top:8px"><summary style="cursor:pointer;margin-bottom:4px">Metadata</summary><pre>\${fmt(s.metadata)}</pre></details>
      <p style="margin-top:12px;font-weight:600;font-size:.82rem">ETL Steps (\${d.etlLog.length})</p>
      <table style="margin-top:6px"><thead><tr><th>Step</th><th>Status</th><th>ms</th><th>Error</th><th></th></tr></thead><tbody>
      \${d.etlLog.map(l => \`<tr><td>\${l.step}</td><td>\${badge2(l.status)}</td><td>\${l.duration_ms??'—'}</td><td style="color:var(--err);font-size:.75rem">\${l.error||''}</td><td><button class="btn btn-ghost btn-sm" onclick="showETLStep(\${JSON.stringify(l).replace(/"/g,'&quot;')})">Inspect</button></td></tr>\`).join('')}
      </tbody></table>
      <p style="margin-top:12px;font-weight:600;font-size:.82rem">Deliveries (\${d.deliveries.length})</p>
      <table style="margin-top:6px"><thead><tr><th>URL</th><th>Status</th><th>ms</th><th>Error</th></tr></thead><tbody>
      \${d.deliveries.map(l => \`<tr><td style="font-size:.75rem;max-width:200px;overflow:hidden;text-overflow:ellipsis">\${l.notify_url}</td><td><span class="badge \${l.status_code<300?'b-done':'b-failed'}">\${l.status_code??'err'}</span></td><td>\${l.duration_ms??'—'}</td><td style="color:var(--err);font-size:.75rem">\${l.error||''}</td></tr>\`).join('')}
      </tbody></table>
    \`;
    openModal('detail-modal');
  } catch(e) { toast(e.message, false); }
}

function showETLStep(l) {
  document.getElementById('etl-detail-content').innerHTML = \`
    <p><b>Step:</b> \${l.step} &nbsp; <b>Status:</b> \${badge2(l.status)} &nbsp; <b>Duration:</b> \${l.duration_ms??'—'}ms</p>
    \${l.error?'<p style="color:var(--err);margin-top:8px">'+l.error+'</p>':''}
    <p style="margin-top:12px;font-weight:600;font-size:.82rem">Input</p>
    <pre>\${fmt(l.input_snapshot)}</pre>
    <p style="margin-top:12px;font-weight:600;font-size:.82rem">Output</p>
    <pre>\${fmt(l.output_snapshot)}</pre>
  \`;
  openModal('etl-detail-modal');
}

// ── Forms ────────────────────────────────────────────────────────────────────
async function loadForms() {
  try {
    const d = await api('/forms'); forms = d.forms;
    document.getElementById('forms-body').innerHTML = d.forms.length
      ? d.forms.map(f => \`<tr><td><b>\${f.form_id}</b></td><td>\${f.name}</td><td style="font-size:.75rem">\${JSON.parse(f.allowed_origins).join(', ')}</td><td>\${f.active?'✓':'✗'}</td><td><button class="btn btn-ghost btn-sm" onclick='editForm(\${JSON.stringify(f).replace(/"/g,"&quot;")})'>Edit</button></td></tr>\`).join('')
      : '<tr><td colspan="5" class="empty">No forms</td></tr>';
  } catch(e) { toast(e.message, false); }
}
function openFormModal(f) {
  document.getElementById('fm-id').value = f?.form_id||''; document.getElementById('fm-name').value = f?.name||'';
  document.getElementById('fm-origins').value = f ? JSON.parse(f.allowed_origins).join('\\n') : '*';
  openModal('form-modal');
}
function editForm(f) { openFormModal(f); }
async function saveForm() {
  const b = { form_id: document.getElementById('fm-id').value.trim(), name: document.getElementById('fm-name').value.trim(), allowed_origins: document.getElementById('fm-origins').value.trim().split('\\n').map(s=>s.trim()).filter(Boolean) };
  try { await api('/forms', { method:'POST', body: JSON.stringify(b) }); toast('Saved'); closeModal(); loadForms(); } catch(e) { toast(e.message,false); }
}

// ── Mapping Rules ────────────────────────────────────────────────────────────
async function loadMappingRules() {
  activeMapForm = document.getElementById('map-form').value;
  if (!activeMapForm) { document.getElementById('map-body').innerHTML='<tr><td colspan="7" class="empty">Select a form</td></tr>'; return; }
  try {
    const d = await api('/forms/'+activeMapForm+'/mapping-rules');
    document.getElementById('map-body').innerHTML = d.rules.length
      ? d.rules.map(r => \`<tr><td>\${r.priority}</td><td>\${r.name}</td><td style="font-size:.75rem;font-family:monospace">\${r.source_expr}</td><td style="font-family:monospace">\${r.target_field}</td><td>\${r.transform}</td><td>\${r.required?'✓':''}</td><td><button class="btn btn-danger btn-sm" onclick="delMR(\${r.id})">Del</button></td></tr>\`).join('')
      : '<tr><td colspan="7" class="empty">No rules</td></tr>';
  } catch(e) { toast(e.message, false); }
}
function openMappingModal() { if(!activeMapForm){toast('Select a form first',false);return;} ['mm-name','mm-src','mm-target','mm-default'].forEach(id=>document.getElementById(id).value=''); document.getElementById('mm-priority').value=100; document.getElementById('mm-required').checked=false; document.getElementById('mm-transform').value='passthrough'; renderTransformConfig(); openModal('map-modal'); }
function renderTransformConfig() {
  const t = document.getElementById('mm-transform').value;
  const configs = { regex_extract:[['pattern','Regex Pattern'],['flags','Flags (e.g. i)']], regex_replace:[['pattern','Regex Pattern'],['replacement','Replacement'],['flags','Flags']], template:[['template','Template (use {{value}})']], truncate:[['max_length','Max Length']] };
  const fields = configs[t] || [];
  document.getElementById('mm-transform-config').innerHTML = fields.map(([k,l])=>\`<div class="field"><label>\${l}</label><input id="mm-tc-\${k}" placeholder="\${k}"></div>\`).join('');
}
async function saveMappingRule() {
  const t = document.getElementById('mm-transform').value;
  const cfgKeys = { regex_extract:['pattern','flags'], regex_replace:['pattern','replacement','flags'], template:['template'], truncate:['max_length'] }[t]||[];
  const tc = {}; cfgKeys.forEach(k=>{const v=document.getElementById('mm-tc-'+k)?.value; if(v) tc[k]=v;});
  const b = { name:document.getElementById('mm-name').value, source_expr:document.getElementById('mm-src').value, target_field:document.getElementById('mm-target').value, transform:t, transform_config:Object.keys(tc).length?tc:null, default_value:document.getElementById('mm-default').value||null, required:document.getElementById('mm-required').checked, priority:parseInt(document.getElementById('mm-priority').value) };
  try { await api('/forms/'+activeMapForm+'/mapping-rules',{method:'POST',body:JSON.stringify(b)}); toast('Saved'); closeModal(); loadMappingRules(); } catch(e){toast(e.message,false);}
}
async function delMR(id) { if(!confirm('Delete?'))return; try{await api('/forms/'+activeMapForm+'/mapping-rules/'+id,{method:'DELETE'});toast('Deleted');loadMappingRules();}catch(e){toast(e.message,false);} }

// ── Load Targets ─────────────────────────────────────────────────────────────
async function loadLT() { activeLTForm=document.getElementById('lt-form').value; if(!activeLTForm){document.getElementById('lt-body').innerHTML='<tr><td colspan="6" class="empty">Select a form</td></tr>';return;} try{const d=await api('/forms/'+activeLTForm+'/load-targets'); document.getElementById('lt-body').innerHTML=d.targets.length?d.targets.map(t=>\`<tr><td>\${t.name}</td><td style="font-family:monospace">\${t.db_binding}</td><td style="font-family:monospace">\${t.target_table}</td><td>\${t.upsert_key||'—'}</td><td>\${t.active?'✓':'✗'}</td><td><button class="btn btn-danger btn-sm" onclick="delLT(\${t.id})">Del</button></td></tr>\`).join(''):'<tr><td colspan="6" class="empty">No targets</td></tr>';}catch(e){toast(e.message,false);}}
function openLTModal(){if(!activeLTForm){toast('Select a form first',false);return;}['lt-name','lt-binding','lt-table','lt-upsert','lt-allow'].forEach(id=>document.getElementById(id).value=id==='lt-binding'?'DB':'');openModal('lt-modal');}
async function saveLT(){const b={name:document.getElementById('lt-name').value,db_binding:document.getElementById('lt-binding').value||'DB',target_table:document.getElementById('lt-table').value,upsert_key:document.getElementById('lt-upsert').value||null,field_allowlist:document.getElementById('lt-allow').value?document.getElementById('lt-allow').value.split(',').map(s=>s.trim()):null};try{await api('/forms/'+activeLTForm+'/load-targets',{method:'POST',body:JSON.stringify(b)});toast('Saved');closeModal();loadLT();}catch(e){toast(e.message,false);}}
async function delLT(id){if(!confirm('Delete?'))return;try{await api('/forms/'+activeLTForm+'/load-targets/'+id,{method:'DELETE'});toast('Deleted');loadLT();}catch(e){toast(e.message,false);}}

// ── Filter Rules ──────────────────────────────────────────────────────────────
async function loadFilters(){activeFlForm=document.getElementById('fl-form').value;if(!activeFlForm){document.getElementById('fl-body').innerHTML='<tr><td colspan="7" class="empty">Select a form</td></tr>';return;}try{const d=await api('/forms/'+activeFlForm+'/filters');document.getElementById('fl-body').innerHTML=d.rules.length?d.rules.map(r=>\`<tr><td>\${r.priority}</td><td>\${r.name}</td><td>\${r.source}</td><td><code>\${r.pattern}</code></td><td><code>\${r.value_pattern||'*'}</code></td><td><span class="badge b-\${r.action}">\${r.action}</span></td><td><button class="btn btn-danger btn-sm" onclick="delFL(\${r.id})">Del</button></td></tr>\`).join(''):'<tr><td colspan="7" class="empty">No rules</td></tr>';}catch(e){toast(e.message,false);}}
function openFilterModal(){if(!activeFlForm){toast('Select a form first',false);return;}['fl-name','fl-pattern','fl-value'].forEach(id=>document.getElementById(id).value='');document.getElementById('fl-priority').value=100;openModal('fl-modal');}
async function saveFilter(){const b={name:document.getElementById('fl-name').value,source:document.getElementById('fl-source').value,pattern:document.getElementById('fl-pattern').value,value_pattern:document.getElementById('fl-value').value||null,action:document.getElementById('fl-action').value,priority:parseInt(document.getElementById('fl-priority').value)};try{await api('/forms/'+activeFlForm+'/filters',{method:'POST',body:JSON.stringify(b)});toast('Saved');closeModal();loadFilters();}catch(e){toast(e.message,false);}}
async function delFL(id){if(!confirm('Delete?'))return;try{await api('/forms/'+activeFlForm+'/filters/'+id,{method:'DELETE'});toast('Deleted');loadFilters();}catch(e){toast(e.message,false);}}

// ── Notify Configs ────────────────────────────────────────────────────────────
async function loadNC(){activeNCForm=document.getElementById('nc-form').value;if(!activeNCForm){document.getElementById('nc-body').innerHTML='<tr><td colspan="5" class="empty">Select a form</td></tr>';return;}try{const d=await api('/forms/'+activeNCForm+'/notify-configs');document.getElementById('nc-body').innerHTML=d.configs.length?d.configs.map(c=>\`<tr><td>\${c.name}</td><td style="font-size:.75rem;max-width:220px;overflow:hidden;text-overflow:ellipsis">\${c.notify_url_template}</td><td>\${c.auth_type}</td><td>\${c.active?'✓':'✗'}</td><td><button class="btn btn-danger btn-sm" onclick="delNC(\${c.id})">Del</button></td></tr>\`).join(''):'<tr><td colspan="5" class="empty">No configs</td></tr>';}catch(e){toast(e.message,false);}}
function openNCModal(){if(!activeNCForm){toast('Select a form first',false);return;}['nc-name','nc-url','nc-headers','nc-body'].forEach(id=>document.getElementById(id).value='');document.getElementById('nc-method').value='POST';document.getElementById('nc-auth').value='none';renderNCAuth();openModal('nc-modal');}
function renderNCAuth(){const t=document.getElementById('nc-auth').value;const flds={bearer:[['token','Token']],basic:[['username','Username'],['password','Password']],header:[['name','Header Name'],['value','Header Value']],hmac_sha256:[['secret','HMAC Secret'],['header_name','Signature Header']],hmac_sha1:[['secret','HMAC Secret'],['header_name','Signature Header']],oauth2_cc:[['token_url','Token URL'],['client_id','Client ID'],['client_secret','Client Secret'],['scope','Scope']]}[t]||[];document.getElementById('nc-auth-fields').innerHTML=flds.map(([k,l])=>\`<div class="field"><label>\${l}</label><input id="nc-af-\${k}"></div>\`).join('');}
async function saveNC(){const t=document.getElementById('nc-auth').value;const ac={type:t};document.getElementById('nc-auth-fields').querySelectorAll('input').forEach(el=>ac[el.id.replace('nc-af-','')]=el.value);const b={name:document.getElementById('nc-name').value,notify_url_template:document.getElementById('nc-url').value,http_method:document.getElementById('nc-method').value,extra_headers:document.getElementById('nc-headers').value||null,body_template:document.getElementById('nc-body').value||null,auth_type:t,auth_config:t==='none'?null:ac};try{await api('/forms/'+activeNCForm+'/notify-configs',{method:'POST',body:JSON.stringify(b)});toast('Saved');closeModal();loadNC();}catch(e){toast(e.message,false);}}
async function delNC(id){if(!confirm('Delete?'))return;try{await api('/forms/'+activeNCForm+'/notify-configs/'+id,{method:'DELETE'});toast('Deleted');loadNC();}catch(e){toast(e.message,false);}}

// ── Logs ─────────────────────────────────────────────────────────────────────
async function loadIL(){const fid=document.getElementById('il-form').value,reason=document.getElementById('il-reason').value;try{const d=await api('/ingress-log?limit=50&offset='+ilOff+(fid?'&form_id='+fid:'')+(reason?'&reason='+reason:''));document.getElementById('il-info').textContent=\`\${ilOff+1}–\${Math.min(ilOff+50,d.total)} of \${d.total}\`;document.getElementById('il-body').innerHTML=d.logs.length?d.logs.map(l=>\`<tr><td style="white-space:nowrap">\${l.created_at.slice(0,16)}</td><td>\${l.form_id||'—'}</td><td>\${l.method}</td><td>\${l.origin||'—'}</td><td>\${l.ip||'—'}</td><td>\${l.status_code}</td><td><span class="badge b-\${l.reason}">\${l.reason}</span></td><td>\${l.duration_ms??'—'}</td></tr>\`).join(''):'<tr><td colspan="8" class="empty">No logs</td></tr>';}catch(e){toast(e.message,false);}}
function ilPage(d){ilOff=Math.max(0,ilOff+d*50);loadIL();}

async function loadEL(){const fid=document.getElementById('etl-form').value,step=document.getElementById('etl-step').value;try{const d=await api('/etl-log?limit=50&offset='+elOff+(fid?'&form_id='+fid:'')+(step?'&step='+step:''));document.getElementById('el-info').textContent=\`\${elOff+1}–\${Math.min(elOff+50,d.total)} of \${d.total}\`;document.getElementById('el-body').innerHTML=d.logs.length?d.logs.map(l=>\`<tr><td style="white-space:nowrap">\${l.created_at.slice(0,16)}</td><td><a class="link" onclick="showDetail('\${l.submission_id}')">\${l.submission_id.slice(0,10)}…</a></td><td>\${l.form_id}</td><td>\${l.step}</td><td>\${badge2(l.status)}</td><td>\${l.duration_ms??'—'}</td><td style="color:var(--err);font-size:.75rem;max-width:150px;overflow:hidden;text-overflow:ellipsis">\${l.error||''}</td><td><button class="btn btn-ghost btn-sm" onclick='showETLStep(\${JSON.stringify(l).replace(/"/g,"&quot;")})'>Detail</button></td></tr>\`).join(''):'<tr><td colspan="8" class="empty">No ETL logs</td></tr>';}catch(e){toast(e.message,false);}}
function elPage(d){elOff=Math.max(0,elOff+d*50);loadEL();}

async function loadDL(){const fid=document.getElementById('dl-form').value;try{const d=await api('/delivery-log?limit=50&offset='+dlOff+(fid?'&form_id='+fid:''));document.getElementById('dl-info').textContent=\`\${dlOff+1}–\${Math.min(dlOff+50,d.total)} of \${d.total}\`;document.getElementById('dl-body').innerHTML=d.logs.length?d.logs.map(l=>\`<tr><td style="white-space:nowrap">\${l.created_at.slice(0,16)}</td><td>\${l.submission_id.slice(0,10)}…</td><td>\${l.form_id}</td><td style="font-size:.75rem;max-width:180px;overflow:hidden;text-overflow:ellipsis">\${l.notify_url}</td><td><span class="badge \${l.status_code&&l.status_code<300?'b-done':'b-failed'}">\${l.status_code??'net err'}</span></td><td>\${l.duration_ms??'—'}</td><td style="color:var(--err);font-size:.75rem">\${l.error||''}</td></tr>\`).join(''):'<tr><td colspan="7" class="empty">No deliveries</td></tr>';}catch(e){toast(e.message,false);}}
function dlPage(d){dlOff=Math.max(0,dlOff+d*50);loadDL();}

// ── D1 Browser ────────────────────────────────────────────────────────────────
async function loadD1Tables(){try{const d=await api('/d1/tables');document.getElementById('d1-table-list').innerHTML=d.tables.map(t=>\`<div style="padding:4px 8px;cursor:pointer;border-radius:4px;font-size:.8rem;font-family:monospace" onclick="d1SelectTable('\${t.name}')" onmouseenter="this.style.background='var(--surf2)'" onmouseleave="this.style.background=''">\${t.name}</div>\`).join('');}catch(e){toast(e.message,false);}}
function d1SelectTable(name){document.getElementById('d1-sql').value='SELECT * FROM '+name+' LIMIT 50';runD1Query(false);}
async function runD1Query(exec){const sql=document.getElementById('d1-sql').value.trim();if(!sql)return;try{let d;if(exec){if(!confirm('Run this SQL mutation?'))return;d=await api('/d1/exec',{method:'POST',body:JSON.stringify({sql,confirm:true})});}else{d=await api('/d1/query',{method:'POST',body:JSON.stringify({sql})});}document.getElementById('d1-result-card').style.display='';const meta=d.meta?JSON.stringify(d.meta):'';document.getElementById('d1-result-meta').textContent=meta;if(d.results&&d.results.length){const cols=Object.keys(d.results[0]);document.getElementById('d1-result-content').innerHTML=\`<table><thead><tr>\${cols.map(c=>'<th>'+c+'</th>').join('')}</tr></thead><tbody>\${d.results.map(r=>\`<tr>\${cols.map(c=>'<td>'+String(r[c]??'')+'</td>').join('')}</tr>\`).join('')}</tbody></table>\`;}else{document.getElementById('d1-result-content').innerHTML='<div class="empty">'+JSON.stringify(d)+'</div>';}}catch(e){toast(e.message,false);}}

// ── KV Browser ────────────────────────────────────────────────────────────────
async function loadKV(){const ns=document.getElementById('kv-ns').value,prefix=document.getElementById('kv-prefix').value;try{const d=await api('/kv/list?ns='+ns+'&prefix='+encodeURIComponent(prefix));document.getElementById('kv-body').innerHTML=d.keys.length?d.keys.map(k=>\`<tr><td style="font-family:monospace;font-size:.8rem">\${k.name}</td><td>\${k.expiration?new Date(k.expiration*1000).toISOString().slice(0,16):'—'}</td><td><button class="btn btn-ghost btn-sm" onclick="getKV('\${k.name}')">Get</button><button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="delKV('\${k.name}')">Del</button></td></tr>\`).join(''):'<tr><td colspan="3" class="empty">No keys</td></tr>';}catch(e){toast(e.message,false);}}
async function getKV(key){const ns=document.getElementById('kv-ns').value;try{const d=await api('/kv/get?ns='+ns+'&key='+encodeURIComponent(key));document.getElementById('kv-val-key').textContent=key;document.getElementById('kv-val-content').textContent=typeof d.value==='string'?d.value:JSON.stringify(d,null,2);document.getElementById('kv-val-card').style.display='';}catch(e){toast(e.message,false);}}
async function delKV(key){if(!confirm('Delete KV key '+key+'?'))return;const ns=document.getElementById('kv-ns').value;try{await api('/kv/delete?ns='+ns+'&key='+encodeURIComponent(key),{method:'DELETE'});toast('Deleted');loadKV();}catch(e){toast(e.message,false);}}

// ── Modals ────────────────────────────────────────────────────────────────────
function openModal(id){document.getElementById('modal-bg').classList.add('open');document.querySelectorAll('.modal').forEach(m=>m.style.display='none');document.getElementById(id).style.display='';}
function closeModal(){document.getElementById('modal-bg').classList.remove('open');}

// ── Helpers ───────────────────────────────────────────────────────────────────
function badge(s){return \`<span class="badge b-\${s}">\${s}</span>\`;}
function badge2(s){return \`<span class="badge b-\${s}">\${s}</span>\`;}
function fmt(v){try{return JSON.stringify(JSON.parse(v),null,2);}catch{return v??'—';}}
</script>
</body></html>`;
}

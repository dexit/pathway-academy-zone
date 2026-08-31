# ETL Zone — Setup Guide

Multi-worker Cloudflare ETL platform. Free tier throughout.

## Architecture

```
                    ┌─────────────────────────────────────────┐
                    │            Shared D1 database           │
                    │  form_submissions  ingress_log          │
                    │  filter_rules      etl_log              │
                    │  mapping_rules     delivery_log         │
                    │  load_targets      notify_configs       │
                    └───────────────────┬─────────────────────┘
                                        │
    ┌───────────────────────────────────┼──────────────────────────────────┐
    │                                   │                                  │
    ▼                                   ▼                                  ▼
Worker: gateway              Worker: etl (Workflow host)        Worker: admin
POST /submit/:formId          FormETLWorkflow                    GET / → admin UI
  → rate-limit (RATE_KV)        step: extract                   GET /api/* → JSON API
  → HMAC verify                 step: transform (mapping_rules)   D1 browser
  → filter fast-path            step: load → target tables        KV browser
  → INSERT form_submissions     step: deliver (notify_configs)     observability logs
  → LOG to ingress_log          step: complete                     CRUD for all config
  → ETL_WORKFLOW.create()       LOG each step → etl_log
                                        │
                                        ▼
                               Worker: scheduler (cron)
                                 */5 min: retry stalled subs
                                 hourly: retry failed deliveries
                                 daily:  prune old logs
```

## 1. Prerequisites

```bash
npm install -g wrangler
wrangler login
```

## 2. Create Resources (once)

```bash
# D1 database (shared across all workers)
wrangler d1 create etl-zone-db
# → paste database_id into ALL four wrangler.jsonc files

# KV namespaces (shared)
wrangler kv namespace create TASKS_KV
# → paste id into all wrangler.jsonc as TASKS_KV id

wrangler kv namespace create RATE_KV
# → paste id into all wrangler.jsonc as RATE_KV id
```

## 3. Apply Migrations

```bash
npm run db:migrate          # remote (production)
npm run db:migrate:local    # local dev
```

## 4. Set Secrets

```bash
# Admin API key (used by admin worker + verified by admin UI)
wrangler secret put ADMIN_API_KEY --name etl-zone-admin

# (same secret used by gateway for any auth that needs it)
wrangler secret put ADMIN_API_KEY --name etl-zone-gateway
```

## 5. Deploy (order matters: ETL first, then gateway)

```bash
npm run deploy:all

# Individual deploys:
npm run deploy:etl          # 1st: Workflow class must exist before gateway references it
npm run deploy:gateway      # 2nd: cross-script Workflow binding resolves
npm run deploy:admin        # 3rd: admin UI
npm run deploy:scheduler    # 4th: cron triggers
```

## 6. Register a Form (via admin UI or curl)

```bash
# Via curl:
curl -X POST https://etl-zone-admin.<subdomain>.workers.dev/api/forms \
  -H "X-Admin-Key: <your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "form_id": "contact",
    "name":    "Contact Form",
    "allowed_origins": ["https://your-site.com"]
  }'
```

## 7. Add Mapping Rules (ETL transform config)

```bash
curl -X POST https://etl-zone-admin.<subdomain>.workers.dev/api/forms/contact/mapping-rules \
  -H "X-Admin-Key: <your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name":        "Email (lowercase)",
    "source_expr": "email",
    "target_field":"email",
    "transform":   "lowercase",
    "required":    true,
    "priority":    10
  }'
```

## 8. Add a Load Target (write DTO to a D1 table)

```bash
curl -X POST https://etl-zone-admin.<subdomain>.workers.dev/api/forms/contact/load-targets \
  -H "X-Admin-Key: <your-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name":        "CRM leads table",
    "db_binding":  "DB",
    "target_table":"leads",
    "upsert_key":  "email"
  }'
```

## 9. Submit a Form

```bash
# JSON
curl -X POST https://etl-zone-gateway.<subdomain>.workers.dev/submit/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "message": "Hello!"}'

# FormData (from browser)
fetch('https://etl-zone-gateway.<subdomain>.workers.dev/submit/contact', {
  method: 'POST',
  body: new FormData(formElement),
})
```

## Admin Panel

Open `https://etl-zone-admin.<subdomain>.workers.dev/` and enter your admin key.

| Tab | What it shows |
|-----|--------------|
| Dashboard | Submission stats, delivery rates, ingress volume |
| Submissions | All submissions with ETL step drill-down |
| Forms | Register/edit forms with verify_auth |
| Mapping Rules | DTO transform pipeline (12 transform types) |
| Load Targets | D1 tables to INSERT/UPSERT transformed data |
| Filter Rules | Wildcard block/allow/flag rules |
| Notify Configs | Outbound webhook delivery with auth |
| Ingress Log | Every gateway request (accepted + rejected) |
| ETL Log | Per-step execution log with input/output snapshots |
| Delivery Log | Per-attempt webhook delivery status |
| D1 Browser | Run SQL queries, inspect schema, list tables |
| KV Browser | Browse TASKS_KV and RATE_KV namespaces |

## Transform Types

| Transform | Description | Config |
|-----------|-------------|--------|
| `passthrough` | Copy as-is | — |
| `trim` | String.trim() | — |
| `lowercase` / `uppercase` | Case conversion | — |
| `regex_extract` | Extract capture group 1 | `{ pattern, flags }` |
| `regex_replace` | Replace with substitution | `{ pattern, replacement, flags }` |
| `template` | Mini-template (`{{value}}`) | `{ template }` |
| `number` | parseFloat | — |
| `boolean` | 1/true/yes → true | — |
| `date_iso` | Parse → ISO 8601 | — |
| `json_parse` | JSON.parse value | — |
| `truncate` | slice(0, max) | `{ max_length }` |

## Free Tier Limits

| Resource | Free | Notes |
|----------|------|-------|
| Workers requests | 100K/day | Across all 4 workers combined |
| D1 reads | 5M rows/day | |
| D1 writes | 100K rows/day | |
| D1 storage | 500MB | Log pruning keeps this in check |
| KV reads | 100K/day | |
| KV writes | 1K/day | Rate limiter uses ≤2 writes/IP/60s window |
| Workflow executions | 100K/day | |
| Workflow concurrent instances | 25 | Waiting/sleeping instances don't count |
| Workflow subrequests per step | 50 | Deliver step capped at 20 notify configs (41 subreqs) |
| Workflow state retention | 3 days | ETL+delivery data persists in D1 indefinitely |
| CPU per Worker request / step | 10ms | Paid plan raises this to 30s–5min |
| Cron triggers | Included | |

### Key free-tier design choices

- **KV** used only for rate limiting and OAuth2 token caching — not as a task queue (avoids 1K/day write ceiling).
- **D1** is the authoritative status store for `form_submissions`; Workflows read from it, not KV.
- Rate limiter writes KV **once per IP per 60-second window** (new-window + limit-latch), not per request.
- Deliver step is limited to **20 notify configs** per submission to stay under the 50 subrequest/step ceiling.
- Log cleanup runs daily and prunes `ingress_log`/`etl_log` after 30 days to protect the 500 MB D1 quota.

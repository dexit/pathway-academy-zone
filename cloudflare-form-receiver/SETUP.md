# Cloudflare Form Receiver — Setup

All resources run on the **free tier** (Workers, D1, KV, Workflows).

## 1. Prerequisites

```bash
npm install -g wrangler
wrangler login
```

## 2. Create Cloud Resources

```bash
# D1 database
wrangler d1 create form-receiver-db
# → copy the database_id into wrangler.jsonc → d1_databases[0].database_id

# KV namespaces
wrangler kv namespace create TASKS_KV
# → copy id into wrangler.jsonc → kv_namespaces[0].id

wrangler kv namespace create RATE_KV
# → copy id into wrangler.jsonc → kv_namespaces[1].id
```

## 3. Apply D1 Migrations

```bash
cd cloudflare-form-receiver
npm install
npm run db:setup          # remote (production)
npm run db:setup:local    # local dev
```

## 4. Set Admin Secret

```bash
wrangler secret put ADMIN_API_KEY
# Enter a strong random string when prompted
```

## 5. Deploy

```bash
npm run deploy
# → https://form-receiver.<your-subdomain>.workers.dev
```

## 6. Register a Form

```bash
curl -X POST https://form-receiver.<subdomain>.workers.dev/admin/forms \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: <your-admin-key>" \
  -d '{
    "form_id": "contact",
    "name": "Contact Form",
    "allowed_origins": ["https://your-site.com"],
    "notify_url": "https://hooks.example.com/form-notify"
  }'
```

## API Reference

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/submit/:formId` | none | Accept a form submission |
| `POST` | `/submit?form_id=x` | none | Same, query-param variant |
| `GET`  | `/status/:id` | none | Poll submission status |
| `GET`  | `/health` | none | Health check |
| `POST` | `/admin/forms` | X-Admin-Key | Register / update a form |
| `GET`  | `/admin/submissions` | X-Admin-Key | List submissions (paginated) |
| `GET`  | `/admin/submissions/:id` | X-Admin-Key | Full submission detail |
| `GET`  | `/admin/tasks` | X-Admin-Key | Active KV task queue |

### Submitting from a browser form

```html
<form id="contact">
  <input name="email" type="email" required>
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>

<script>
document.getElementById('contact').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('https://form-receiver.<subdomain>.workers.dev/submit/contact', {
    method: 'POST',
    body: new FormData(e.target),
  });
  const data = await res.json();
  console.log('Submission ID:', data.submissionId);
});
</script>
```

### JSON submission (API clients)

```bash
curl -X POST https://form-receiver.<subdomain>.workers.dev/submit/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","message":"Hello!"}'
```

## Architecture

```
Browser / API client
        │
        ▼
  Worker (src/index.ts)
   ├── Rate limit check  ──── RATE_KV (per-IP window counter)
   ├── Parse fields
   ├── INSERT into D1  ──────── form_submissions table
   ├── PUT task in KV  ──────── TASKS_KV  task:{id}
   └── FORM_WORKFLOW.create()
              │
              ▼
   FormProcessingWorkflow (src/workflow.ts)
    Step 1 — mark processing  (D1 + KV update)
    Step 2 — load & validate submission from D1
    Step 3 — check registered_forms, verify origin
    Step 4 — POST webhook to notify_url (if set)
    Step 5 — mark done (D1 + KV update, KV TTL = 1h)
```

## Free Tier Limits

| Resource | Free Allowance |
|----------|---------------|
| Workers requests | 100 K / day |
| KV reads | 100 K / day |
| KV writes | 1 K / day |
| D1 row reads | 5 M / day |
| D1 row writes | 100 K / day |
| D1 storage | 500 MB |
| Workflows | Included with Workers free tier |

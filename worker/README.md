# planary-stats

Planary's own page-view counter on `stats.planary.ch`: a Cloudflare Worker with D1. planary.ch
(on Vercel) and the apps send one beacon per page view (`src/lib/analytics.ts` in the site).

**What it keeps per view:** day, site, path (no query, tokens and ids replaced by `:id`),
referring host, country, device type, and a visitor hash. **What it never keeps:** cookies, IP
addresses, full URLs or referrers.

The visitor hash is `SHA-256(salt | IP | user agent | site)` with a random salt per day. The
daily cron deletes old salts, so a hash can't be recomputed or linked across days. Views are
deleted after 395 days. Browsers that send Do Not Track aren't counted.

## API

| Route | Who | What |
|---|---|---|
| `POST /e` | planary.ch and `*.planary.ch` | `{"u": location.href, "r": document.referrer}`, sent as `text/plain` |
| `GET /api/sites?days=30` | admins | sites with views in the range |
| `GET /api/stats?site=planary.ch&days=30` | admins | totals, per day, top paths, referrers, countries, devices |

Admins sign in through planary-auth (bearer token, checked over the `AUTH` service binding) and
must be listed in `ADMIN_EMAILS` (`wrangler.jsonc`). Visitors are unique per day; the total is the
sum of the days.

## Run

```bash
npm install
npm run typecheck && npm test
npm run db:migrate:local && npm run dev   # http://localhost:8788
```

Deploys from `.github/workflows/stats-deploy.yml` once `CLOUDFLARE_API_TOKEN` (from the account
that owns the planary.ch zone) is set as a repository secret.

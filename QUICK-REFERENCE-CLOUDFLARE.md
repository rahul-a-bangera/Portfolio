# ?? Quick Reference: Cloudflare Workers Commands

## ?? Installation

```bash
cd workers
npm install
```

## ?? Development

```bash
# Start local dev server (http://localhost:8787)
npm run dev

# Test endpoints locally
curl http://localhost:8787/contact
curl http://localhost:8787/resume
curl http://localhost:8787/blog
```

## ?? Deployment

### Via GitHub Actions (Recommended)
```bash
git add .
git commit -m "feat: deploy workers"
git push origin main
```

### Via CLI (Manual)
```bash
# One-time login
npx wrangler login

# Deploy
npm run deploy

# View logs
npm run tail
```

## ?? Worker URLs

After deployment, your API will be available at:
```
https://portfolio-api.<your-subdomain>.workers.dev/contact
https://portfolio-api.<your-subdomain>.workers.dev/resume
https://portfolio-api.<your-subdomain>.workers.dev/blog
```

## ?? GitHub Secrets Required

1. `CLOUDFLARE_API_TOKEN` - Get from: https://dash.cloudflare.com/profile/api-tokens
2. `CLOUDFLARE_ACCOUNT_ID` - Get from: https://dash.cloudflare.com ? Workers & Pages

## ?? Environment File Update

**File:** `PortfolioFrontend/src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.YOUR-SUBDOMAIN.workers.dev'
};
```

## ?? Testing

### Local Testing
```bash
cd workers
npm run dev

# In another terminal
curl http://localhost:8787/contact
```

### Production Testing
```bash
# Replace with your actual URL
curl https://portfolio-api.yourname.workers.dev/contact
curl https://portfolio-api.yourname.workers.dev/resume
curl https://portfolio-api.yourname.workers.dev/blog
```

## ?? Monitoring

```bash
# View real-time logs
cd workers
npm run tail
```

Or visit: https://dash.cloudflare.com ? Workers & Pages ? portfolio-api ? Logs

## ?? Update & Redeploy

```bash
# Make changes to workers/src/handlers/*.ts
cd workers
npm run deploy
```

## ?? Custom Domain (Optional)

1. Update `workers/wrangler.toml`:
```toml
[[routes]]
pattern = "api.yourdomain.com/*"
zone_name = "yourdomain.com"
```

2. Add CNAME in Cloudflare DNS:
   - Name: `api`
   - Target: `portfolio-api.yourname.workers.dev`
   - Proxy: Enabled

3. Deploy:
```bash
npm run deploy
```

## ?? Documentation

- **Complete Setup:** `misc/09-CLOUDFLARE-WORKERS-SETUP.md`
- **Migration Guide:** `misc/MIGRATION-AZURE-TO-CLOUDFLARE.md`
- **API Docs:** `workers/README.md`
- **Quick Start:** `CLOUDFLARE-MIGRATION-COMPLETE.md`

## ? Quick Troubleshooting

### Worker not responding?
```bash
# Check deployment
wrangler deployments list

# View logs
npm run tail
```

### CORS errors?
CORS is pre-configured in `workers/src/index.ts` to allow all origins.

### GitHub Actions failing?
Verify secrets are set correctly in: Settings ? Secrets and variables ? Actions

## ?? Cost

**FREE TIER:**
- 100,000 requests/day
- Unlimited bandwidth
- Global edge (200+ cities)
- No credit card required

Perfect for personal portfolios! ??

## ?? Quick Links

- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Workers Docs:** https://developers.cloudflare.com/workers/
- **GitHub Actions:** https://github.com/YOUR-USERNAME/Portfolio/actions
- **Your Site:** https://rahul-a.in

---

**Need help?** See `misc/09-CLOUDFLARE-WORKERS-SETUP.md` for detailed instructions.

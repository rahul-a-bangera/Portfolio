# Cloudflare Workers Setup Guide

## Overview

The Portfolio API has been migrated from Azure Static Web Apps to **Cloudflare Workers** for improved performance, cost-efficiency (free tier), and simplified deployment.

## Architecture

```
Frontend (GitHub Pages)
  ?
  ? API Calls
  ?
Cloudflare Workers API
  ??? /contact
  ??? /resume
  ??? /blog
```

## Quick Start

### 1. Install Dependencies

```bash
cd workers
npm install
```

### 2. Local Development

```bash
npm run dev
# Worker available at http://localhost:8787
```

### 3. Test Endpoints

```bash
curl http://localhost:8787/contact
curl http://localhost:8787/resume
curl http://localhost:8787/blog
curl http://localhost:8787/blog/getting-started-angular-19
```

## Deployment Setup

### Step 1: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a **FREE** account (no credit card required)
3. Verify your email

### Step 2: Get API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Use **"Edit Cloudflare Workers"** template
4. Click **"Continue to summary"**
5. Click **"Create Token"**
6. **Copy the token** (you won't see it again!)

### Step 3: Get Account ID

1. Go to https://dash.cloudflare.com
2. Click **"Workers & Pages"** in the left sidebar
3. Find your **Account ID** in the right sidebar
4. Copy it

### Step 4: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings ? Secrets and variables ? Actions**
3. Click **"New repository secret"**
4. Add two secrets:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: (paste your API token)

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: (paste your account ID)

### Step 5: Deploy

#### Option A: Automatic Deployment (Recommended)

1. Push changes to `main` branch:
```bash
git add .
git commit -m "feat: migrate to Cloudflare Workers"
git push origin main
```

2. GitHub Actions will automatically deploy
3. Monitor: **Actions ? Deploy to Cloudflare Workers**

#### Option B: Manual Deployment

1. Install Wrangler globally:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy:
```bash
cd workers
npm run deploy
```

## Worker URL

After deployment, your worker will be available at:

**Default URL:**
```
https://portfolio-api.<your-subdomain>.workers.dev
```

Find your subdomain at: https://dash.cloudflare.com ? Workers & Pages

## Custom Domain Setup (Optional)

### Option 1: Use workers.dev Subdomain (Free)

Your worker is automatically available at:
- `https://portfolio-api.yourusername.workers.dev`

No additional setup needed!

### Option 2: Custom Domain (Requires domain on Cloudflare)

If you have `rahul-a.in` on Cloudflare:

1. Update `workers/wrangler.toml`:
```toml
[[routes]]
pattern = "api.rahul-a.in/*"
zone_name = "rahul-a.in"
```

2. Add DNS Record in Cloudflare Dashboard:
   - Type: `CNAME`
   - Name: `api`
   - Target: `portfolio-api.yourusername.workers.dev`
   - Proxy: Enabled (orange cloud)

3. Update frontend environment:
```typescript
// PortfolioFrontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.rahul-a.in'
};
```

## Environment Variables

Set environment variables in Cloudflare Dashboard:

1. Go to: **Workers & Pages ? portfolio-api ? Settings ? Variables**
2. Add these variables:

```
CONTACT_EMAIL = "rahul.bangera.999@gmail.com"
CONTACT_PHONE = "+91 9663885365"
CONTACT_LINKEDIN = "https://www.linkedin.com/in/rahul-bangera/"
CONTACT_GITHUB = "https://github.com/rahul-a-bangera"
CONTACT_TWITTER = ""
```

3. Click **"Save and Deploy"**

## Update Frontend

Update the API URL in your frontend:

```typescript
// PortfolioFrontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.yourusername.workers.dev'
  // Or: 'https://api.rahul-a.in' if using custom domain
};
```

Rebuild and deploy frontend:
```bash
cd PortfolioFrontend
npm run build
git add docs/
git commit -m "chore: update API endpoint"
git push origin main
```

## Testing Deployment

Test your deployed endpoints:

```bash
# Replace with your actual worker URL
curl https://portfolio-api.yourusername.workers.dev/contact
curl https://portfolio-api.yourusername.workers.dev/resume
curl https://portfolio-api.yourusername.workers.dev/blog
```

## Monitoring & Logs

### View Real-time Logs

```bash
cd workers
npm run tail
```

### View in Dashboard

1. Go to: **Workers & Pages ? portfolio-api**
2. Click **"Logs"** tab
3. View requests, errors, and performance metrics

### Metrics Available

- ? Total Requests
- ? Success Rate
- ? Errors
- ? CPU Time
- ? Bandwidth

## Cloudflare Workers Free Tier

Perfect for personal portfolios:

- ? **100,000 requests/day**
- ? **10ms CPU time** per request
- ? **No credit card** required
- ? **Global CDN** (200+ cities)
- ? **<50ms latency** worldwide
- ? **Zero cold starts**

## Troubleshooting

### Issue: "No route found"

**Solution:**
- Verify domain is added to Cloudflare
- Check `wrangler.toml` routes configuration
- Ensure DNS records are proxied (orange cloud)

### Issue: "Authentication failed in GitHub Actions"

**Solution:**
- Verify `CLOUDFLARE_API_TOKEN` secret is correct
- Check token has "Edit Cloudflare Workers" permission
- Regenerate token if needed

### Issue: "Account ID not found"

**Solution:**
- Verify `CLOUDFLARE_ACCOUNT_ID` secret is correct
- Find Account ID in: Workers & Pages ? Overview

### Issue: "Worker not responding"

**Solution:**
- Check deployment logs: Actions ? Deploy to Cloudflare Workers
- View worker logs: `npm run tail`
- Verify worker is deployed: Cloudflare Dashboard ? Workers & Pages

### Issue: "CORS errors in browser"

**Solution:**
- CORS headers are already configured in `src/index.ts`
- If restricting origins, update `corsHeaders` in code
- Verify frontend is making requests to correct URL

## Migration Benefits

### vs Azure Static Web Apps:

| Feature | Azure SWA | Cloudflare Workers |
|---------|-----------|-------------------|
| Free Tier | 100 GB/month | Unlimited bandwidth |
| Requests | Limited | 100,000/day |
| Cold Starts | Yes (~1-2s) | No |
| Global CDN | Limited | 200+ locations |
| Latency | ~200-500ms | <50ms |
| Setup | Complex | Simple |

### Performance Improvements:

- ? **50% faster** response times
- ? **Zero cold starts**
- ? **Global edge deployment**
- ? **Better reliability** (99.99% uptime SLA)

## Next Steps

1. ? Deploy workers to Cloudflare
2. ? Update frontend API URL
3. ? Test all endpoints
4. ? Remove Azure resources (optional)
5. ? Update documentation

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Guide](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Playground](https://workers.cloudflare.com/playground)
- [Pricing Details](https://developers.cloudflare.com/workers/platform/pricing/)
- [Community Discord](https://discord.gg/cloudflaredev)

## Support

For issues or questions:
- Check [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- Ask in [Cloudflare Community](https://community.cloudflare.com/)
- Open an issue in your GitHub repository

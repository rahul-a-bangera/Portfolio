# Cloudflare Workers - Portfolio API

This directory contains the Cloudflare Workers implementation for the Portfolio API endpoints.

## Structure

```
workers/
??? src/
?   ??? index.ts              # Main entry point and router
?   ??? handlers/
?       ??? contact.ts        # Contact info endpoint
?       ??? resume.ts         # Resume/CV endpoint
?       ??? blog.ts           # Blog posts endpoint
??? package.json              # Dependencies and scripts
??? tsconfig.json             # TypeScript configuration
??? wrangler.toml             # Cloudflare Workers configuration
```

## API Endpoints

- `GET /contact` - Returns contact information
- `GET /resume` - Returns resume/CV data
- `GET /blog` - Returns all blog posts
- `GET /blog/:slug` - Returns specific blog post by slug

## Local Development

1. Install dependencies:
```bash
cd workers
npm install
```

2. Run locally:
```bash
npm run dev
```

3. Test endpoints:
```bash
curl http://localhost:8787/contact
curl http://localhost:8787/resume
curl http://localhost:8787/blog
```

## Deployment

### Prerequisites

1. **Cloudflare Account** (Free tier)
   - Sign up at https://dash.cloudflare.com/sign-up

2. **Get API Token**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Copy the generated token

3. **Get Account ID**
   - Go to: https://dash.cloudflare.com
   - Click on "Workers & Pages"
   - Copy your Account ID from the right sidebar

### Setup GitHub Secrets

Add these secrets to your GitHub repository:
- Go to: Settings ? Secrets and variables ? Actions ? New repository secret

1. `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
2. `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### Deploy via GitHub Actions

The workflow automatically deploys when:
- You push changes to the `workers/` directory
- You push changes to the workflow file
- You manually trigger the workflow

Manual deployment:
1. Go to: Actions ? Deploy to Cloudflare Workers ? Run workflow

### Manual Deployment (Optional)

```bash
cd workers
npm run deploy
```

## Environment Variables

Set these in the Cloudflare Dashboard (Workers ? Settings ? Variables):

- `CONTACT_EMAIL` - Your email address
- `CONTACT_PHONE` - Your phone number
- `CONTACT_LINKEDIN` - LinkedIn profile URL
- `CONTACT_GITHUB` - GitHub profile URL
- `CONTACT_TWITTER` - Twitter profile URL (optional)

## Custom Domain Setup

### Option 1: Using Cloudflare DNS (Recommended)

1. Add your domain to Cloudflare
2. Update nameservers to Cloudflare's
3. In `wrangler.toml`, update routes:
```toml
[[routes]]
pattern = "api.yourdomain.com/*"
zone_name = "yourdomain.com"
```

### Option 2: Using workers.dev subdomain

Your worker will be available at:
`https://portfolio-api.<your-subdomain>.workers.dev`

Remove the `[[routes]]` section from `wrangler.toml`

## CORS Configuration

CORS is configured to allow all origins (`*`). To restrict:

Edit `src/index.ts`:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  // ... other headers
};
```

## Monitoring

- View logs: `npm run tail`
- Cloudflare Dashboard: Workers ? portfolio-api ? Logs

## Pricing

Cloudflare Workers Free Tier:
- ? 100,000 requests/day
- ? 10ms CPU time per request
- ? No credit card required

Perfect for portfolio/personal projects!

## Troubleshooting

### Error: "No route found"
- Verify your domain is added to Cloudflare
- Check `wrangler.toml` routes configuration
- Ensure DNS records are proxied (orange cloud)

### Error: "Authentication failed"
- Verify `CLOUDFLARE_API_TOKEN` secret is correct
- Check token has "Edit Cloudflare Workers" permission

### Error: "Account ID not found"
- Verify `CLOUDFLARE_ACCOUNT_ID` secret is correct
- Find Account ID in Cloudflare Dashboard ? Workers & Pages

## Migration from Azure

The API endpoints maintain the same response format as Azure Functions, ensuring zero changes needed in the frontend.

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)

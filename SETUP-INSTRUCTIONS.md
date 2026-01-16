# Portfolio Setup Instructions

Welcome! This portfolio uses **Cloudflare Workers** and **KV storage** for a privacy-first approach. All personal data is stored in Cloudflare KV, not in the repository.

---

## For Repository Cloners

If you've cloned this repository, follow these steps to set up your own portfolio:

---

## ?? Quick Start (15 minutes)

### 1. Create Your Data Files (5 min)

```bash
# Navigate to workers data directory
cd workers/data

# Copy templates
cp templates/resume-template.json resume.json
cp templates/blog-template.json blog-posts.json
cp templates/contact-template.json contact.json
```

**Edit each file with your personal information.**

### 2. Set Up Cloudflare Workers (3 min)

```bash
# Install dependencies
cd workers
npm install

# Login to Cloudflare (opens browser)
npx wrangler login

# Create KV namespace
npx wrangler kv:namespace create "PORTFOLIO_DATA"
npx wrangler kv:namespace create "PORTFOLIO_DATA" --preview
```

**Copy the namespace IDs from the output.**

### 3. Update Configuration (2 min)

Edit `workers/wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "PORTFOLIO_DATA"
id = "YOUR_PRODUCTION_NAMESPACE_ID"  # Paste here
preview_id = "YOUR_PREVIEW_NAMESPACE_ID"  # Paste here
```

### 4. Upload Data to KV (1 min)

```bash
node scripts/upload-to-kv.js
```

You should see "[SUCCESS] Uploaded: 8 items"

### 5. Deploy Workers (2 min)

```bash
npm run deploy
```

**Copy your Worker URL** (e.g., `https://portfolio-api.your-subdomain.workers.dev`)

### 6. Update Frontend (2 min)

Edit `PortfolioFrontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.your-subdomain.workers.dev'  // Your Worker URL
};
```

### 7. Build & Deploy Frontend (5 min)

```bash
cd PortfolioFrontend
npm install
npm run build
```

Deploy the `docs/` folder to:
- GitHub Pages (free, easy)
- Cloudflare Pages (free, fast)
- Vercel (free, automatic)
- Netlify (free, simple)

---

## ?? Detailed Setup

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**
- **Cloudflare account** (free) - [Sign up](https://dash.cloudflare.com/sign-up)
- **GitHub account** (for deployment)

### Frontend Setup

**1. Install Dependencies:**
```bash
cd PortfolioFrontend
npm install
```

**2. Configure Environment:**

Edit both environment files:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

```typescript
export const environment = {
  production: false,  // true for prod
  apiUrl: 'http://localhost:8787'  // or your worker URL
};
```

**3. Run Locally:**
```bash
npm start
# Open http://localhost:4200
```

**4. Build for Production:**
```bash
npm run build
# Outputs to: ../docs/
```

### Workers Setup (Detailed)

**1. Install Wrangler:**
```bash
npm install -g wrangler@latest
```

**2. Login to Cloudflare:**
```bash
npx wrangler login
```

This opens a browser window for OAuth authentication.

**3. Create KV Namespace:**
```bash
# Production namespace
npx wrangler kv:namespace create "PORTFOLIO_DATA"

# Preview namespace (for local dev)
npx wrangler kv:namespace create "PORTFOLIO_DATA" --preview
```

**Save the IDs from the output!**

**4. Configure `wrangler.toml`:**
```toml
name = "portfolio-api"
main = "src/index.ts"
compatibility_date = "2024-01-15"
compatibility_flags = ["nodejs_compat"]

[[kv_namespaces]]
binding = "PORTFOLIO_DATA"
id = "abc123..."  # Your production ID
preview_id = "xyz789..."  # Your preview ID
```

**5. Test Locally:**
```bash
cd workers
npm run dev
# Test: curl http://localhost:8787/resume
```

**6. Deploy to Production:**
```bash
npm run deploy
```

---

## ??? Data Structure

### Resume Data (`workers/data/resume.json`)

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "you@example.com",
    "phone": "+1234567890",
    "location": "City, Country",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "website": "https://yoursite.com"
  },
  "summary": "Your professional summary...",
  "skills": {
    "frontend": ["Angular", "React", "Vue"],
    "backend": [".NET", "Node.js", "Python"],
    "cloud": ["Azure", "AWS", "Cloudflare"],
    "database": ["SQL", "MongoDB", "PostgreSQL"],
    "tools": ["Git", "Docker", "VS Code"]
  },
  "experience": [...],
  "education": [...],
  "certifications": [...],
  "projects": [...]
}
```

### Blog Posts (`workers/data/blog-posts.json`)

```json
[
  {
    "id": 1,
    "slug": "post-slug",
    "title": "Post Title",
    "description": "Brief description",
    "content": "Full content...",
    "author": "Your Name",
    "publishDate": "2024-01-01",
    "tags": ["Tech", "Tutorial"],
    "imageUrl": "/assets/blog/image.jpg",
    "readTime": "5 min read",
    "featured": true
  }
]
```

### Contact Info (`workers/data/contact.json`)

```json
{
  "email": "you@example.com",
  "phone": "+1234567890",
  "socialLinks": {
    "LinkedIn": "https://linkedin.com/in/yourprofile",
    "GitHub": "https://github.com/yourusername",
    "Twitter": "https://twitter.com/yourhandle"
  }
}
```

---

## ?? Privacy & Security

### What's Private (Not in Git)

? **In Cloudflare KV** (secure, private):
- Personal contact information
- Resume/CV data
- Blog post content

? **In Git** (public, safe):
- Source code
- Templates
- Configuration (without secrets)
- Documentation

### Best Practices

1. **Never commit personal data to Git**
   - Check `.gitignore` is working
   - Review files before `git add`

2. **Use environment variables for secrets**
   - API tokens
   - Database credentials
   - Service keys

3. **Rotate credentials periodically**
   - Cloudflare API tokens
   - GitHub tokens

4. **Backup your data**
   - Download KV data regularly
   - Keep offline backups
   - Use version control for content

---

## ?? Deployment Options

### Option 1: GitHub Pages (Recommended for Frontend)

**Pros:**
- ? Free
- ? Automatic deployment
- ? Custom domain support
- ? SSL included

**Setup:**
1. Push `docs/` folder to GitHub
2. Enable GitHub Pages in repo settings
3. Select `main` branch, `/docs` folder
4. Add custom domain (optional)

### Option 2: Cloudflare Pages

**Pros:**
- ? Free
- ? Global CDN
- ? Fast build times
- ? Integrated with Workers

**Setup:**
1. Connect GitHub repo to Cloudflare Pages
2. Build command: `cd PortfolioFrontend && npm run build`
3. Output directory: `docs`
4. Deploy!

### Option 3: Vercel / Netlify

**Pros:**
- ? Free tier
- ? Automatic deployments
- ? Great DX

**Setup:**
- Connect repo
- Configure build settings
- Deploy

---

## ?? Testing

### Test Workers Locally

```bash
cd workers
npm run dev

# Test endpoints
curl http://localhost:8787/resume
curl http://localhost:8787/blog
curl http://localhost:8787/contact
```

### Test Frontend Locally

```bash
cd PortfolioFrontend
npm start

# Open browser
http://localhost:4200
```

### Test Production

```bash
# Test Workers API
curl https://portfolio-api.your-subdomain.workers.dev/resume

# Visit frontend
https://your-site.com
```

---

## ?? Monitoring

### Cloudflare Dashboard

- **Workers Analytics:** https://dash.cloudflare.com ? Workers & Pages
- **KV Analytics:** Workers ? KV ? Your namespace
- **View logs:** `npm run tail` in workers directory

### Frontend Analytics

Add your preferred analytics:
- Google Analytics
- Plausible (privacy-friendly)
- Cloudflare Web Analytics (free)

---

## ?? Customization

### Change Theme

Edit `PortfolioFrontend/src/styles.css`:
```css
:root {
  --terminal-green: #00ff96;  /* Your color */
  /* ... other variables */
}
```

### Add New Sections

1. Create component: `ng generate component components/new-section`
2. Add route in `app.routes.ts`
3. Update navigation

### Modify API

Edit handlers in `workers/src/handlers/`:
- `resume.ts` - Resume endpoint
- `blog.ts` - Blog endpoints
- `contact.ts` - Contact endpoint

---

## ?? Costs

**Total Monthly Cost: $0**

| Service | Free Tier | Usage |
|---------|-----------|-------|
| **Cloudflare Workers** | 100K req/day | Well within limits |
| **Cloudflare KV** | 100K reads/day, 1GB | More than enough |
| **GitHub Pages** | 100GB bandwidth | Plenty for portfolio |

With caching, you'll use only **~50-100 KV reads/day** even with 100 visitors!

---

## ?? Additional Resources

### Documentation
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare KV Docs](https://developers.cloudflare.com/kv/)
- [Angular Docs](https://angular.io/docs)

### Tutorials
- `misc/11-KV-MIGRATION-GUIDE.md` - Complete KV setup guide
- `misc/09-CLOUDFLARE-WORKERS-SETUP.md` - Workers setup guide

### Community
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)

---

## ?? Troubleshooting

### Workers deployment fails

**Check:**
1. Logged in to Cloudflare: `npx wrangler whoami`
2. KV namespace IDs in `wrangler.toml`
3. No syntax errors in TypeScript: `npm run build`

### KV data not uploading

**Check:**
1. Data files exist in `workers/data/`
2. JSON is valid (use JSON validator)
3. Running from `workers/` directory
4. Internet connection active

### Frontend can't reach API

**Check:**
1. CORS enabled in Workers (already configured)
2. API URL correct in `environment.prod.ts`
3. Workers deployed and active
4. Network tab in DevTools for errors

### Cache not working

**Check:**
1. Browser localStorage enabled
2. Not in private/incognito mode
3. Console logs show cache hits/misses
4. Clear cache and try again

---

## ?? You're Done!

Your privacy-first portfolio is now live!

**Next Steps:**
1. Add more blog posts
2. Update your resume regularly
3. Share your portfolio URL
4. Add analytics
5. Customize the design

**Questions?** Open an issue on GitHub!

---

**Built with:**
- Angular 19
- Cloudflare Workers & KV
- GitHub Pages
- TypeScript
- Terminal-inspired design

**License:** MIT (customize as needed)

**Author:** Your Name

**Last Updated:** January 2024

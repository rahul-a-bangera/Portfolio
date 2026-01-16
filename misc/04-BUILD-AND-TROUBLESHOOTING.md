# Build and Troubleshooting Guide

**Last Updated**: December 2024  
**Version**: 1.0.0

---

## Table of Contents

1. [Build Configuration](#build-configuration)
2. [Common Build Issues](#common-build-issues)
3. [CSS Budget Management](#css-budget-management)
4. [Deployment Troubleshooting](#deployment-troubleshooting)
5. [Cloudflare Workers Troubleshooting](#cloudflare-workers-troubleshooting)
6. [Migration Guides](#migration-guides)

---

## Build Configuration

### Build Commands

```bash
# Navigate to frontend
cd PortfolioFrontend

# Development build (with watch)
npm start

# Production build
npm run build

# Build with verbose output
npm run build -- --verbose
```

### Angular Build Configuration

**File**: `PortfolioFrontend/angular.json`

```json
{
  "projects": {
    "portfolio-frontend": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "../docs",
            "baseHref": "/",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "optimization": true,
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "extractLicenses": true,
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "2mb",
                "maximumError": "5mb"
              },
              {
                "type": "anyComponentStyle",
                "maximumWarning": "8kb",
                "maximumError": "12kb"
              }
            ]
          }
        }
      }
    }
  }
}
```

### Build Output

```
docs/
??? assets/
?   ??? blog/                      # Markdown blog posts
?   ??? images/                    # Image assets
?   ??? resume/                    # Resume PDF
??? CNAME                          # Custom domain (rahul-a.in)
??? index.html                     # Main HTML
??? 404.html                       # GitHub Pages 404 handler
??? main.[hash].js                 # ~108 KB (gzipped)
??? styles.[hash].css              # ~11 KB (gzipped)
??? polyfills.[hash].js            # ~9 KB (gzipped)
??? runtime.[hash].js              # ~0.5 KB (gzipped)

Total Bundle Size: ~129 KB (gzipped)
```

### Build Performance

| Metric | Local | GitHub Actions |
|--------|-------|----------------|
| **Build Time** | 12-15 seconds | 15-20 seconds |
| **Bundle Size** | ~129 KB (gzipped) | ~129 KB (gzipped) |
| **Files Generated** | 15-20 files | 15-20 files |

---

## Common Build Issues

### Issue 1: Build Fails with CSS Budget Error

**Error Message:**
```
Error: bundle initial exceeded maximum budget.
Budget: 12.00 KB was not met by 2.45 KB with a total of 14.45 KB.
```

**Cause**: Component CSS file exceeds 12 KB limit.

**Solution A - Optimize CSS (Recommended)**

1. Remove duplicate styles
2. Consolidate repeated styles into utility classes
3. Move global styles to `styles.css`

```css
/* Before - Repeated in multiple components */
.card {
  background: rgba(15, 15, 30, 0.9);
  border: 2px solid rgba(0, 255, 150, 0.3);
  /* ... 20 more lines ... */
}

/* After - Move to global styles.css */
/* Component only has component-specific styles */
```

**Solution B - Adjust Budget (If Justified)**

If your CSS is necessary for comprehensive responsive design:

Edit `angular.json`:
```json
{
  "budgets": [
    {
      "type": "anyComponentStyle",
      "maximumWarning": "10kb",
      "maximumError": "15kb"  // Increased from 12kb
    }
  ]
}
```

**When to increase budget:**
- Multiple responsive breakpoints (5+)
- Complex animations
- Extensive Material Design overrides
- Comprehensive accessibility styles

### Issue 2: Build Fails with "Module Not Found"

**Error Message:**
```
Error: Module not found: Error: Can't resolve '@angular/material/button'
```

**Solution:**
```bash
# Reinstall dependencies
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify Angular Material is installed
npm list @angular/material
```

### Issue 3: TypeScript Compilation Errors

**Error Message:**
```
Error: src/app/components/home.component.ts(15,3): error TS2322: Type 'string' is not assignable to type 'number'.
```

**Solution:**
1. Fix the TypeScript error in the specified file
2. Check type definitions
3. Verify imports are correct

```typescript
// Before (Error)
age: number = "25";  // String assigned to number

// After (Fixed)
age: number = 25;  // Correct type
```

### Issue 4: Build Succeeds but Site Doesn't Load

**Symptoms:**
- Build completes successfully
- Deployed to GitHub Pages
- Site shows blank page or 404

**Causes & Solutions:**

**A. Missing Base Href**

Check `angular.json`:
```json
{
  "baseHref": "/Portfolio/"  // For repository site
  // OR
  "baseHref": "/"  // For custom domain
}
```

For custom domain (`rahul-a.in`), use `/`  
For GitHub Pages (`username.github.io/Portfolio/`), use `/Portfolio/`

**B. Missing CNAME File**

Ensure `docs/CNAME` exists with your domain:
```
rahul-a.in
```

**C. GitHub Pages Not Configured**

1. Go to: Repository ? Settings ? Pages
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/docs`
5. Click "Save"

### Issue 5: Assets Not Loading (404 Errors)

**Error in Console:**
```
GET https://rahul-a.in/assets/profile.jpg 404 (Not Found)
```

**Solution:**

Check asset paths in components:
```typescript
// Correct (relative to assets folder)
profilePic = 'assets/profile.jpg';

// Incorrect (absolute path)
profilePic = '/assets/profile.jpg';
```

Verify files are in `src/assets/` and copied during build:
```json
// angular.json
{
  "assets": [
    "src/assets"
  ]
}
```

---

## CSS Budget Management

### Current Budgets

| Budget Type | Warning | Error | Purpose |
|-------------|---------|-------|---------|
| **Initial Bundle** | 2 MB | 5 MB | Total JS bundle size |
| **Component Styles** | 8 KB | 12 KB | Individual component CSS |

### Why 12 KB Limit?

The 12 KB limit allows for comprehensive responsive design:
- 5 breakpoints (480px, 768px, 960px, 1024px, 1920px+)
- Complex animations
- Material Design overrides
- Accessibility styles

### Monitoring CSS Size

```bash
# Build and check sizes
npm run build

# View bundle sizes
ls -lh docs/*.css
```

### Reducing CSS Size

#### 1. Remove Unused Styles
```css
/* Before */
.unused-class { /* ... */ }  // Never used in template
.another-unused { /* ... */ }

/* After */
/* Removed unused classes */
```

#### 2. Use CSS Custom Properties
```css
/* Before - Repeated values */
.card { border: 2px solid rgba(0, 255, 150, 0.3); }
.button { border: 2px solid rgba(0, 255, 150, 0.3); }
.input { border: 2px solid rgba(0, 255, 150, 0.3); }

/* After - Use variable */
:root { --terminal-border: rgba(0, 255, 150, 0.3); }
.card { border: 2px solid var(--terminal-border); }
.button { border: 2px solid var(--terminal-border); }
.input { border: 2px solid var(--terminal-border); }
```

#### 3. Consolidate Media Queries
```css
/* Before - Scattered */
.card { padding: 20px; }
@media (max-width: 768px) { .card { padding: 16px; } }

.button { margin: 20px; }
@media (max-width: 768px) { .button { margin: 16px; } }

/* After - Grouped */
.card { padding: 20px; }
.button { margin: 20px; }

@media (max-width: 768px) {
  .card { padding: 16px; }
  .button { margin: 16px; }
}
```

---

## Deployment Troubleshooting

### GitHub Actions Workflow Fails

#### Issue: Workflow Not Triggered

**Solution:**
1. Check workflow file exists: `.github/workflows/deploy.yml`
2. Verify branch name in workflow (should be `main`)
3. Check GitHub Actions is enabled: Settings ? Actions ? Allow all actions

#### Issue: Build Step Fails

**View Logs:**
1. Go to: https://github.com/rahul-a-bangera/Portfolio/actions
2. Click on failed workflow run
3. Click on "build-and-deploy" job
4. Expand failing step

**Common Causes:**
- Missing dependencies (run `npm ci`)
- TypeScript errors
- Build configuration issues

#### Issue: Deploy Step Fails

**Error:**
```
Error: Unable to push to GitHub Pages
```

**Solution:**
1. Check repository permissions: Settings ? Actions ? General
2. Workflow permissions: "Read and write permissions"
3. Verify `docs/` folder is committed
4. Check branch protection rules

### Custom Domain Not Working

#### Issue: Site Loads but Shows GitHub 404

**Solution:**
1. Verify `docs/CNAME` contains your domain:
   ```
   rahul-a.in
   ```

2. Check DNS settings at domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153 (GitHub Pages IP)
   
   Type: CNAME
   Name: www
   Value: rahul-a-bangera.github.io
   ```

3. Wait 24-48 hours for DNS propagation

4. Verify GitHub Pages settings:
   - Settings ? Pages
   - Custom domain: `rahul-a.in`
   - Enforce HTTPS: Enabled

#### Issue: HTTPS Not Working

**Error:** "Your connection is not private"

**Solution:**
1. Wait 24-48 hours after DNS setup
2. GitHub automatically provisions SSL certificate
3. Check "Enforce HTTPS" is enabled in Settings ? Pages
4. Try disabling and re-enabling HTTPS

---

## Cloudflare Workers Troubleshooting

### Local Development Issues

#### Issue: Worker Not Starting

**Error:**
```
Error: Failed to start worker
```

**Solution:**
```bash
# Navigate to workers directory
cd workers

# Install dependencies
npm install

# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::8787
```

**Solution:**
```bash
# Find process using port 8787
lsof -i :8787  # macOS/Linux
netstat -ano | findstr :8787  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
wrangler dev --port 8788
```

### Deployment Issues

#### Issue: Authentication Failed

**Error:**
```
Error: Unauthorized: Invalid API Token
```

**Solution:**
1. Get new API token: https://dash.cloudflare.com/profile/api-tokens
2. Update GitHub secret: `CLOUDFLARE_API_TOKEN`
3. Or login locally: `wrangler login`

#### Issue: Worker Deploy Fails

**Error:**
```
Error: Script startup exceeded CPU time limit
```

**Solution:**
1. Check for infinite loops in `workers/src/index.ts`
2. Optimize heavy computations
3. Add timeout handling

#### Issue: CORS Errors

**Error in Browser Console:**
```
Access to fetch at 'https://portfolio-api.workers.dev/contact' 
has been blocked by CORS policy
```

**Solution:**

Add CORS headers in `workers/src/index.ts`:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://rahul-a.in',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS (preflight)
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}

// Add to all responses
return new Response(JSON.stringify(data), {
  headers: {
    ...corsHeaders,
    'Content-Type': 'application/json',
  },
});
```

### KV Storage Issues

#### Issue: KV Namespace Not Found

**Error:**
```
Error: KV namespace binding "PORTFOLIO_KV" not found
```

**Solution:**
```bash
# Create KV namespace
wrangler kv:namespace create "PORTFOLIO_KV"

# Copy namespace ID and update wrangler.toml
[[kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "your-namespace-id-here"
```

#### Issue: Data Not Persisting

**Solution:**
```bash
# Test locally with --local-protocol
wrangler dev --local-protocol=https

# Or deploy to preview first
wrangler deploy --env preview
```

---

## Migration Guides

### Azure to Cloudflare Workers Migration (Completed)

**Summary:** Migrated from Azure Static Web Apps API to Cloudflare Workers for better performance and free tier.

**What Changed:**
- API endpoint: `https://gentle-moss-xxx.azurestaticapps.net` ? `https://portfolio-api.workers.dev`
- Deployment: Azure Functions ? Cloudflare Workers
- Storage: Azure Storage ? Cloudflare KV

**Steps Taken:**
1. Created Cloudflare Workers project
2. Ported API functions from Azure Functions to Workers handlers
3. Updated frontend API URLs
4. Set up GitHub Actions for automatic deployment
5. Tested all endpoints
6. Updated documentation

**Files Changed:**
- `workers/src/index.ts` - Main Worker code
- `workers/wrangler.toml` - Cloudflare configuration
- `.github/workflows/deploy.yml` - Added Workers deployment
- `PortfolioFrontend/src/environments/environment.prod.ts` - Updated API URL

---

## Build Checklist

Before deploying, ensure:

- [X] Build succeeds locally: `npm run build`
- [X] No TypeScript errors
- [X] No console errors in browser
- [X] All assets load correctly (images, fonts, PDFs)
- [X] Responsive design tested (mobile, tablet, desktop)
- [X] Links work correctly
- [X] Forms submit successfully (if applicable)
- [X] Blog posts display correctly
- [X] CSS within budget limits
- [X] Bundle size under 150 KB (gzipped)

---

## Useful Commands

```bash
# Frontend
cd PortfolioFrontend
npm start                  # Dev server
npm run build             # Production build
npm install               # Install dependencies
npm audit                 # Security check

# Workers
cd workers
npm run dev               # Local worker
npm run deploy            # Deploy to Cloudflare
wrangler kv:key list --binding=PORTFOLIO_KV  # List KV keys

# Git
git status                # Check changes
git add .                 # Stage all changes
git commit -m "message"   # Commit
git push origin main      # Deploy (triggers GitHub Actions)

# Debugging
# Check GitHub Actions logs
# URL: https://github.com/rahul-a-bangera/Portfolio/actions

# Check Cloudflare Workers logs
wrangler tail             # Realtime logs
```

---

## Next Steps

- **Setup questions?** ? See [01-SETUP-AND-DEPLOYMENT.md](01-SETUP-AND-DEPLOYMENT.md)
- **Architecture details?** ? See [02-TECHNICAL-ARCHITECTURE.md](02-TECHNICAL-ARCHITECTURE.md)
- **Design questions?** ? See [03-DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md)

---

**Contact**: rahul.bangera.999@gmail.com  
**Portfolio**: https://rahul-a.in

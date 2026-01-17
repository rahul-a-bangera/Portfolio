# Setup and Deployment Guide

**Last Updated**: December 2024  
**Prerequisites**: Node.js 20+, npm 10+, Git

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Development Workflow](#development-workflow)
3. [Blog Management](#blog-management)
4. [Deployment Process](#deployment-process)
5. [API Setup](#api-setup)
6. [Environment Configuration](#environment-configuration)

---

## Initial Setup

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/rahul-a-bangera/Portfolio.git
cd Portfolio
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd PortfolioFrontend

# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli@19

# Install project dependencies
npm install
```

### Step 3: Verify Installation

```bash
# Check Angular version
ng version

# Should show:
# Angular CLI: 19.0.x
# Node: 20.x.x
# Package Manager: npm 10.x.x
```

### Step 4: Start Development Server

```bash
# Start dev server
npm start

# Open browser to http://localhost:4200
# Hot reload is enabled - changes auto-refresh
```

---

## Development Workflow

### Project Structure

```
PortfolioFrontend/
??? src/
?   ??? app/
?   ?   ??? components/       # UI components
?   ?   ??? services/         # Business logic
?   ?   ??? models/           # TypeScript interfaces
?   ?   ??? utils/            # Helper functions
?   ??? assets/
?   ?   ??? blog/             # [ACTION] Markdown blog posts
?   ?   ??? images/           # Image assets
?   ?   ??? resume/           # Resume PDF
?   ??? styles.css            # Global styles
?   ??? index.html            # Main HTML
??? angular.json              # Angular configuration
??? package.json              # Dependencies
??? tsconfig.json             # TypeScript config
```

### Making Changes

1. **Edit files** in `src/` directory
2. **Save** - changes auto-reload in browser
3. **Test** on different screen sizes (DevTools responsive mode)
4. **Build** for production before committing

```bash
# Build for production
npm run build

# Output goes to docs/ folder (GitHub Pages deployment)
```

### Code Style Guidelines

- Use **standalone components** (no modules)
- Use **strict TypeScript** mode
- Follow **Angular 19** best practices
- Use **CSS custom properties** for styling
- Add **responsive styles** for all breakpoints
- Include **ARIA labels** for accessibility

---

## Blog Management

### [ACTION] How to Add a New Blog Post

The blog system reads markdown files from `PortfolioFrontend/src/assets/blog/` directory.

#### Step 1: Create Markdown File

Create a new `.md` file in `PortfolioFrontend/src/assets/blog/`:

**File**: `PortfolioFrontend/src/assets/blog/my-awesome-post.md`

```markdown
---
title: "My Awesome Blog Post"
slug: "my-awesome-post"
summary: "A brief summary of what this post is about. This appears in the card view."
author: "Rahul A"
date: "2024-12-15"
category: "Angular"
tags: ["Angular", "TypeScript", "Web Development"]
readTime: 5
---

# My Awesome Blog Post

Your blog content goes here in markdown format...

## Section Heading

More content with **bold** and *italic* text.

### Code Examples

```typescript
const greeting = 'Hello, World!';
console.log(greeting);
```

## Another Section

- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3
```

#### Step 2: Register the Filename

Edit: `PortfolioFrontend/src/app/services/markdown-blog.service.ts`

Add your filename (without `.md` extension) to the `blogFiles` array:

```typescript
private blogFiles = [
  'getting-started-angular-19',
  'building-restful-apis-dotnet-core',
  'css-grid-vs-flexbox',
  'web-performance-optimization',
  'microservices-azure-guide',
  'my-awesome-post'  // [ACTION] Add your filename here
];
```

#### Step 3: Build and Deploy

```bash
# Build for production
npm run build

# Commit and push
git add .
git commit -m "feat: Add new blog post - My Awesome Post"
git push origin main

# GitHub Actions will auto-deploy to https://rahul-a.in
```

### Frontmatter Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Blog post title (displayed in card and header) |
| `slug` | string | Yes | URL-friendly identifier (should match filename) |
| `summary` | string | Yes | Brief description (appears in card view) |
| `author` | string | Yes | Author name |
| `date` | string | Yes | Publication date (YYYY-MM-DD format) |
| `category` | string | No | Category (e.g., "Angular", ".NET", "DevOps") |
| `tags` | array | No | Array of tags for filtering |
| `readTime` | number | No | Estimated read time in minutes |

### File Naming Rules

- Use **kebab-case** for filenames: `my-awesome-post.md`
- Filename (without `.md`) should **match the slug** in frontmatter
- Example: `getting-started-angular-19.md` ? slug: `"getting-started-angular-19"`

### [ACTION] Blog Post Checklist

Before publishing a blog post, ensure:

- [X] Frontmatter is between `---` markers
- [X] All required fields are present (title, slug, summary, author, date)
- [X] Slug matches filename (without .md)
- [X] Filename added to `markdown-blog.service.ts`
- [X] Content is written in valid markdown
- [X] Code blocks have language specified (```typescript, ```css, etc.)
- [X] Build succeeds (`npm run build`)
- [X] Post appears correctly on localhost:4200/blog

---

## Deployment Process

### GitHub Pages Deployment

The portfolio is deployed to **GitHub Pages** with auto-deployment via **GitHub Actions**.

#### How It Works

1. **Push to main branch** triggers GitHub Actions workflow
2. **Workflow builds** the Angular app (`npm run build`)
3. **Build output** (in `docs/`) is committed and pushed
4. **GitHub Pages** serves content from `docs/` folder
5. **Custom domain** (rahul-a.in) points to GitHub Pages

#### Deployment Workflow File

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./PortfolioFrontend
        run: npm ci

      - name: Build Angular app
        working-directory: ./PortfolioFrontend
        run: npm run build -- --configuration production --base-href /Portfolio/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
          cname: rahul-a.in
```

#### Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Build for production
cd PortfolioFrontend
npm run build

# 2. Commit build output
cd ..
git add docs/
git commit -m "chore: Build for deployment"

# 3. Push to GitHub
git push origin main

# 4. Monitor deployment
# Visit: https://github.com/rahul-a-bangera/Portfolio/actions
```

#### Custom Domain Setup

1. **Domain DNS Settings** (at domain registrar):
   ```
   Type: CNAME
   Name: www
   Value: rahul-a-bangera.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153 (GitHub Pages IP)
   ```

2. **CNAME File** (in `docs/` folder):
   ```
   rahul-a.in
   ```

3. **GitHub Repository Settings**:
   - Go to: Settings ? Pages
   - Custom domain: `rahul-a.in`
   - Enforce HTTPS: ? Enabled

#### Deployment Checklist

Before deploying:

- [X] Code builds successfully (`npm run build`)
- [X] All tests pass (if applicable)
- [X] Responsive design tested (mobile, tablet, desktop)
- [X] No console errors in browser
- [X] Links work correctly
- [X] Images load properly
- [X] Blog posts display correctly
- [X] Contact form submits successfully

#### Deployment URLs

- **Primary URL**: https://rahul-a.in
- **GitHub Pages URL**: https://rahul-a-bangera.github.io/Portfolio/
- **Deployment Status**: https://github.com/rahul-a-bangera/Portfolio/actions

---

## API Setup

The portfolio uses **Cloudflare Workers** for serverless API endpoints.

### Cloudflare Workers Setup

#### Step 1: Install Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

#### Step 2: Configure Workers

**File**: `workers/wrangler.toml`

```toml
name = "portfolio-api"
main = "src/index.ts"
compatibility_date = "2024-12-01"

[env.production]
name = "portfolio-api-production"
route = "https://portfolio-api.rahul-a-workers.workers.dev/*"

[[kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "your-kv-namespace-id"
```

#### Step 3: Deploy Workers

```bash
# Navigate to workers directory
cd workers

# Install dependencies
npm install

# Deploy to Cloudflare
npm run deploy

# Or deploy manually
wrangler deploy
```

#### Step 4: Test API

```bash
# Test contact form endpoint
curl -X POST https://portfolio-api.rahul-a-workers.workers.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/contact` | GET | Get contact information |
| `/profile` | GET | Get profile data (name and specialist content) |
| `/resume` | GET | Get complete resume data |
| `/resume/personal` | GET | Get personal info only (optimized for home page) |
| `/blog` | GET | Get all blog posts |
| `/blog/:slug` | GET | Get specific blog post by slug |
| `/assets/resume` | GET | Download resume PDF |
| `/assets/profile` | GET | Get profile picture |

### KV Namespace Setup

Cloudflare KV is used for storing contact form submissions:

```bash
# Create KV namespace
wrangler kv:namespace create "PORTFOLIO_KV"

# List KV namespaces
wrangler kv:namespace list

# Put test data
wrangler kv:key put --binding=PORTFOLIO_KV "test-key" "test-value"

# Get data
wrangler kv:key get --binding=PORTFOLIO_KV "test-key"
```

---

## Environment Configuration

### Frontend Environment Variables

**File**: `PortfolioFrontend/src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8787/api'
};
```

**File**: `PortfolioFrontend/src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.rahul-a-workers.workers.dev/api'
};
```

### Workers Environment Variables

Set secrets in Cloudflare:

```bash
# Set email API key (if using email service)
wrangler secret put EMAIL_API_KEY

# Set other secrets
wrangler secret put ANOTHER_SECRET
```

---

## Troubleshooting

### Build Fails

**Issue**: Build fails with CSS budget error

```
Error: bundle initial exceeded maximum budget
```

**Solution**: See [04-BUILD-AND-TROUBLESHOOTING.md](04-BUILD-AND-TROUBLESHOOTING.md) for CSS budget fixes.

### Deployment Fails

**Issue**: GitHub Actions workflow fails

**Solution**:
1. Check workflow logs: https://github.com/rahul-a-bangera/Portfolio/actions
2. Verify `docs/` folder exists and has content
3. Ensure `CNAME` file is in `docs/` folder
4. Check GitHub Pages settings (Settings ? Pages)

### Blog Posts Not Showing

**Issue**: New blog post doesn't appear on site

**Solution**:
1. Verify filename added to `markdown-blog.service.ts`
2. Check frontmatter is between `---` markers
3. Ensure slug matches filename
4. Rebuild: `npm run build`
5. Check browser console for errors

### API Not Working

**Issue**: Contact form doesn't submit

**Solution**:
1. Check Workers deployment status
2. Verify API URL in `environment.prod.ts`
3. Check CORS settings in Workers
4. Test API directly with curl/Postman
5. Check Cloudflare Workers logs

---

## Next Steps

- **Design questions?** ? See [03-DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md)
- **Architecture details?** ? See [02-TECHNICAL-ARCHITECTURE.md](02-TECHNICAL-ARCHITECTURE.md)
- **Build issues?** ? See [04-BUILD-AND-TROUBLESHOOTING.md](04-BUILD-AND-TROUBLESHOOTING.md)

---

**Contact**: rahul.bangera.999@gmail.com  
**Portfolio**: https://rahul-a.in

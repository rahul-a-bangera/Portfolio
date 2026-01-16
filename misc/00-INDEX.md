# Portfolio Documentation Index

**Last Updated**: December 2024  
**Project Version**: 1.0.0  
**Angular Version**: 19.0.0

---

## Quick Navigation

This portfolio project has **5 consolidated documentation files** that contain everything you need to understand, build, and maintain the project.

### Documentation Files

1. **[00-INDEX.md](00-INDEX.md)** *(This File)*
   - Project overview and quick reference
   - Directory structure
   - Quick commands
   - Common patterns

2. **[01-SETUP-AND-DEPLOYMENT.md](01-SETUP-AND-DEPLOYMENT.md)**
   - Installation and setup instructions
   - Development workflow
   - Deployment process (GitHub Pages)
   - Blog management (how to add/upload blogs)
   - API setup (Azure Functions & Cloudflare Workers)

3. **[02-TECHNICAL-ARCHITECTURE.md](02-TECHNICAL-ARCHITECTURE.md)**
   - Tech stack and dependencies
   - System architecture and component hierarchy
   - Data flow and services
   - Code quality standards
   - Performance metrics

4. **[03-DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md)**
   - Color palette and typography
   - Responsive design guidelines
   - Component patterns
   - Theme consistency rules
   - Accessibility standards

5. **[04-BUILD-AND-TROUBLESHOOTING.md](04-BUILD-AND-TROUBLESHOOTING.md)**
   - Build configuration
   - CSS budget management
   - Common issues and fixes
   - Migration guides
   - Troubleshooting checklist

---

## Project Overview

### What is This?

A modern, fully responsive portfolio website built with **Angular 19**, featuring:
- Cyberpunk terminal-inspired design with terminal green (#00ff96) theme
- Material Design components
- Markdown-based blog system
- Serverless API (Cloudflare Workers)
- Auto-deployment via GitHub Actions
- Custom domain: **https://rahul-a.in**

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 19, TypeScript 5.7, Material Design |
| **Styling** | CSS3, CSS Custom Properties, Flexbox/Grid |
| **API** | Cloudflare Workers (Node.js) |
| **Storage** | Cloudflare KV |
| **Deployment** | GitHub Pages + Cloudflare Workers |
| **CI/CD** | GitHub Actions |

### Live Links

- **Portfolio**: https://rahul-a.in
- **GitHub Pages**: https://rahul-a-bangera.github.io/Portfolio/
- **Workers API**: https://portfolio-api.rahul-a-workers.workers.dev
- **Repository**: https://github.com/rahul-a-bangera/Portfolio

---

## Directory Structure

```
Portfolio/
?
??? .github/
?   ??? copilot-instructions.md    # GitHub Copilot configuration
?   ??? workflows/
?       ??? deploy.yml             # Auto-deployment workflow
?
??? docs/                          # GitHub Pages build output (auto-generated)
?   ??? index.html
?   ??? assets/
?   ??? CNAME                      # Custom domain configuration
?   ??? 404.html                   # GitHub Pages 404 page
?
??? misc/                          # [ACTION] All project documentation (5 files)
?   ??? 00-INDEX.md                # This file - Quick reference
?   ??? 01-SETUP-AND-DEPLOYMENT.md # Setup, deployment, blog guide
?   ??? 02-TECHNICAL-ARCHITECTURE.md # Tech stack, architecture
?   ??? 03-DESIGN-SYSTEM.md        # Theme, responsive, UI patterns
?   ??? 04-BUILD-AND-TROUBLESHOOTING.md # Build, fixes, migrations
?
??? PortfolioFrontend/             # Angular 19 application
?   ??? src/
?   ?   ??? app/
?   ?   ?   ??? components/        # UI components
?   ?   ?   ??? services/          # Business logic
?   ?   ?   ??? models/            # TypeScript interfaces
?   ?   ?   ??? utils/             # Helper functions
?   ?   ??? assets/
?   ?   ?   ??? blog/              # [ACTION] Markdown blog posts go here
?   ?   ?   ??? images/            # Image assets
?   ?   ?   ??? resume/            # Resume PDF
?   ?   ??? styles.css             # Global styles
?   ?   ??? index.html             # Main HTML
?   ??? angular.json               # Angular configuration
?   ??? package.json               # Dependencies
?   ??? tsconfig.json              # TypeScript config
?
??? workers/                       # Cloudflare Workers API
?   ??? src/
?   ?   ??? index.ts               # Main API entry point
?   ?   ??? handlers/              # API route handlers
?   ??? data/                      # Static data and templates
?   ??? wrangler.toml              # Cloudflare config
?   ??? package.json               # API dependencies
?
??? README.md                      # [KEEP] GitHub repository main page
??? SETUP-INSTRUCTIONS.md          # [DEPRECATED - See 01-SETUP-AND-DEPLOYMENT.md]
```

---

## Quick Commands

### Development
```bash
# Navigate to frontend
cd PortfolioFrontend

# Install dependencies
npm install

# Start dev server (http://localhost:4200)
npm start

# Build for production (outputs to docs/)
npm run build
```

### Deployment
```bash
# Commit changes
git add .
git commit -m "feat: Add new feature"

# Push to GitHub (triggers auto-deployment)
git push origin main

# Monitor deployment
# Visit: https://github.com/rahul-a-bangera/Portfolio/actions
```

### Adding a Blog Post
```bash
# 1. Create markdown file
# File: PortfolioFrontend/src/assets/blog/my-new-post.md

# 2. Register in service
# Edit: PortfolioFrontend/src/app/services/markdown-blog.service.ts
# Add filename to blogFiles array

# 3. Build and deploy
npm run build
git add .
git commit -m "feat: Add new blog post"
git push origin main
```

### Workers API (Local Development)
```bash
# Navigate to workers
cd workers

# Install dependencies
npm install

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

---

## Common Patterns

### Component Creation Template
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  title = 'Example Component';
  
  constructor() {}
  
  handleAction(): void {
    // Implementation
  }
}
```

### CSS Structure Template
```css
/* Container */
.component-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Use CSS custom properties */
.component-title {
  color: var(--terminal-green);
  font-family: var(--monospace-font);
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .component-container {
    padding: 20px 16px;
  }
}
```

### Copy to Clipboard Pattern
```typescript
async copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log('[SUCCESS] Copied to clipboard');
  } catch (err) {
    console.error('[ERROR] Failed to copy:', err);
  }
}
```

---

## Key Files to Know

### Frontend Core Files
- **`PortfolioFrontend/src/styles.css`** - Global styles and CSS variables
- **`PortfolioFrontend/src/app/app.component.ts`** - Main app component
- **`PortfolioFrontend/angular.json`** - Angular configuration (build settings)
- **`PortfolioFrontend/src/app/services/markdown-blog.service.ts`** - Blog management

### Deployment Files
- **`.github/workflows/deploy.yml`** - Auto-deployment workflow
- **`docs/CNAME`** - Custom domain configuration (rahul-a.in)
- **`PortfolioFrontend/src/404.html`** - GitHub Pages 404 handler

### Configuration Files
- **`PortfolioFrontend/package.json`** - Frontend dependencies
- **`PortfolioFrontend/tsconfig.json`** - TypeScript configuration
- **`workers/wrangler.toml`** - Cloudflare Workers configuration

---

## Color Palette (Terminal Green Theme)

```css
--terminal-green: #00ff96           /* Primary accent */
--terminal-bg-dark: #0f0f1e         /* Main background */
--terminal-bg-medium: #1a1a2e       /* Secondary background */
--terminal-text: rgba(255,255,255,0.9)  /* Primary text */
```

**Always use these exact colors. Do not introduce new colors without updating 03-DESIGN-SYSTEM.md**

---

## Responsive Breakpoints

```css
/* Desktop Default (1024px+) - No media query needed */

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) { }

/* Mobile (480px - 768px) */
@media (max-width: 768px) { }

/* Mobile Small (< 480px) */
@media (max-width: 480px) { }
```

---

## Important Rules

### DO's [SUCCESS]
- Always maintain terminal green theme (#00ff96)
- Add responsive styles for all breakpoints (768px, 480px)
- Test on mobile devices before deploying
- Update documentation when making changes
- Use CSS custom properties (variables)
- Follow Angular 19 best practices (standalone components)
- Use semantic HTML and ARIA labels

### DON'Ts [WARNING]
- **Don't create new .md files** - Update these 5 consolidated files
- Don't introduce new colors without updating 03-DESIGN-SYSTEM.md
- Don't skip mobile testing
- Don't use inline styles in templates
- Don't hardcode values (use CSS variables)
- Don't commit `node_modules/` or `dist/`
- Don't modify `docs/` manually (it's auto-generated)
- **Don't use emojis** (causes encoding issues in CI/CD)

---

## Getting Help

### Documentation Navigation
1. **Setup/Deployment issues?** ? See [01-SETUP-AND-DEPLOYMENT.md](01-SETUP-AND-DEPLOYMENT.md)
2. **Architecture questions?** ? See [02-TECHNICAL-ARCHITECTURE.md](02-TECHNICAL-ARCHITECTURE.md)
3. **Design/styling issues?** ? See [03-DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md)
4. **Build failing?** ? See [04-BUILD-AND-TROUBLESHOOTING.md](04-BUILD-AND-TROUBLESHOOTING.md)

### External Resources
- **Angular Docs**: https://angular.dev
- **Material Design**: https://material.angular.io
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **GitHub Pages**: https://pages.github.com

### Contact
- **Developer**: Rahul A
- **Email**: rahul.bangera.999@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/rahul-bangera/
- **Portfolio**: https://rahul-a.in

---

## Recent Changes

### December 2024
- [SUCCESS] Consolidated documentation from 21+ files to 5 organized files
- [SUCCESS] Migrated from Azure Functions to Cloudflare Workers
- [SUCCESS] Implemented markdown-based blog system
- [SUCCESS] Set up auto-deployment via GitHub Actions
- [SUCCESS] Custom domain (rahul-a.in) configured with GitHub Pages

---

**Next Steps**: Choose the relevant documentation file from the list above based on what you need to learn or fix.

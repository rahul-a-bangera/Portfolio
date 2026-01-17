# Portfolio Website

[![Deploy Status](https://img.shields.io/badge/Deploy-Automated-success?style=flat-square&logo=github-actions)](https://github.com/yourusername/Portfolio/actions)
[![Live Site](https://img.shields.io/badge/Live-Demo-00ff96?style=flat-square)](https://yourwebsite.com)
[![Angular](https://img.shields.io/badge/Angular-19.0.0-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> A modern, high-performance portfolio website showcasing professional experience, skills, and projects. Built with Angular 19, powered by Cloudflare Workers API, and deployed on GitHub Pages with a custom domain.

**Live Site**: [https://yourwebsite.com](https://yourwebsite.com)  
**API**: [https://your-api.workers.dev](https://your-api.workers.dev)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Design & UI
- **Terminal-Inspired Theme**: Cyberpunk aesthetic with terminal green (#00ff96) accents on dark backgrounds
- **Responsive Layout**: Mobile-first design optimized for all devices (320px - 4K+)
- **Material Design**: Angular Material components with custom theming
- **Ambient Effects**: 
  - Animated grid background with floating particles
  - Click spark effects with GPU-accelerated animations
  - Glassmorphism cards with backdrop blur
  - Smooth scroll behavior and section transitions

### Core Sections

| Section | Features |
|---------|----------|
| **Home** | Profile card, CV download, contact popup, social links |
| **Resume** | 5-tab interface: Summary, Skills, Tools, Experience, Education |
| **Blog** | Dynamic posts, category filtering, tag system, pagination |
| **Contact** | Contact form, social media links, copy-to-clipboard functionality |

### Performance & UX
- **Fast Load Times**: Optimized bundle size (~128 KB gzipped)
- **Smart Caching**: API responses cached with configurable TTL
- **Offline-Ready**: Service worker support for offline functionality
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **SEO Optimized**: Meta tags, Open Graph, structured data

### Technical Features
- **Standalone Components**: Modern Angular architecture without NgModules
- **Lazy Loading**: Route-based code splitting
- **State Management**: RxJS for reactive data flow
- **Environment Config**: Separate dev/prod configurations
- **Local Development**: JSON templates for development without API
- **Error Handling**: Comprehensive error boundaries and fallbacks

---

## Tech Stack

### Frontend
```
Angular          19.0.0      Modern web framework
TypeScript       5.7.0       Type-safe JavaScript
Angular Material 19.0.0      UI component library
RxJS             7.8.0       Reactive programming
Marked           17.0.1      Markdown parsing
```

### Backend API (Cloudflare Workers)
```
TypeScript       5.7.2       Worker scripts
Wrangler         4.59.2      Cloudflare CLI
Workers KV       -           Key-value storage
```

### Build & Deployment
```
Angular CLI      19.0.0      Build tooling
GitHub Actions   -           CI/CD pipeline
GitHub Pages     -           Static hosting
Cloudflare       -           Edge API hosting
```

### Development Tools
```
Concurrently     8.2.2       Multi-process runner
PowerShell       -           Automation scripts
```

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
             ▼                                ▼
    ┌────────────────┐              ┌─────────────────┐
    │  GitHub Pages  │              │   Cloudflare    │
    │  (Static SPA)  │              │    Workers      │
    │  rahul-a.in    │              │  (Edge API)     │
    └────────────────┘              └────────┬────────┘
             │                               │
             │                               ▼
             │                      ┌─────────────────┐
             │                      │   Workers KV    │
             │                      │  (Data Store)   │
             │                      └─────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │  Local Development     │
    │  JSON Templates        │
    │  (Dev Mode Only)       │
    └────────────────────────┘
```

### Data Flow

**Production Mode:**
1. User visits `https://rahul-a.in`
2. GitHub Pages serves static Angular app
3. Angular app makes API calls to `portfolio-api.rahul-a-works.workers.dev`
4. Cloudflare Workers fetches data from Workers KV
5. Cached responses returned to client (1 hour TTL)

**Development Mode:**
1. User runs `npm start` locally
2. Angular dev server starts on `localhost:4200`
3. App loads data from `assets/data/local/templates/*.json`
4. Hot module replacement for instant updates

---

---

## Quick Start

### Prerequisites

```bash
# Required
Node.js >= 18.0.0
npm >= 9.0.0

# Optional (for backend development)
.NET SDK >= 8.0
Azure Functions Core Tools >= 4.x
```

### Installation & Setup

**Clone the repository:**
```bash
git clone https://github.com/rahul-a-bangera/Portfolio.git
cd Portfolio
```

**Option 1: Quick Start (Recommended)**
```bash
# Windows PowerShell
.\scripts\quick-start.ps1

# Linux/Mac
./scripts/setup-local-dev.sh
```

**Option 2: Manual Setup**
```bash
# Install all dependencies
npm run install:all

# Start frontend only
npm run start:frontend-only

# Start all services (frontend + backend + API)
npm start
```

### Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5091 (if started)
- **Azure Functions**: http://localhost:7071 (if started)

---

## Project Structure

```
Portfolio/
│
├── 📂 PortfolioFrontend/          # Angular 19 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # UI Components
│   │   │   │   ├── header.component.*
│   │   │   │   ├── home.component.*
│   │   │   │   ├── resume.component.*
│   │   │   │   ├── blog.component.*
│   │   │   │   ├── blog-detail.component.*
│   │   │   │   ├── contact.component.*
│   │   │   │   ├── footer.component.*
│   │   │   │   ├── main-layout.component.*
│   │   │   │   └── ambient/      # Ambient effects
│   │   │   │       ├── animated-background.component.*
│   │   │   │       ├── click-spark.component.*
│   │   │   │       └── floating-particles.component.*
│   │   │   ├── services/         # Business logic
│   │   │   │   ├── profile.service.ts
│   │   │   │   ├── resume.service.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   ├── contact.service.ts
│   │   │   │   └── cache.service.ts
│   │   │   └── models/           # TypeScript interfaces
│   │   ├── assets/
│   │   │   ├── data/local/       # Development JSON templates
│   │   │   ├── images/           # Static images
│   │   │   └── documents/        # PDFs, etc.
│   │   ├── environments/         # Environment configs
│   │   ├── styles.css            # Global styles
│   │   └── index.html            # App shell
│   ├── angular.json              # Angular workspace config
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 workers/                    # Cloudflare Workers API
│   ├── src/
│   │   ├── index.ts              # Main router & CORS
│   │   └── handlers/             # API endpoints
│   │       ├── profile.ts        # GET /profile
│   │       ├── contact.ts        # GET /contact
│   │       ├── resume.ts         # GET /resume/*
│   │       ├── blog.ts           # GET /blog/*
│   │       └── assets.ts         # GET /assets/*
│   ├── scripts/                  # Utility scripts
│   │   ├── upload-to-kv.js       # Upload data to Workers KV
│   │   └── convert-assets-to-base64.js
│   ├── data/                     # Source data
│   │   ├── profile.json
│   │   ├── contact.json
│   │   ├── resume.json
│   │   └── blog/
│   ├── wrangler.toml             # Cloudflare config
│   ├── package.json
│   └── README.md                 # API documentation
│
├── 📂 docs/                       # GitHub Pages output
│   ├── assets/                   # Built assets
│   ├── CNAME                     # Custom domain
│   └── index.html                # Built app
│
├── 📂 scripts/                    # Development scripts
│   ├── quick-start.ps1           # Quick start (Windows)
│   ├── quick-start.bat           # Quick start batch
│   ├── setup-local-dev.ps1       # Full setup (Windows)
│   ├── setup-local-dev.sh        # Full setup (Linux/Mac)
│   ├── start-dev.ps1             # Start all services
│   ├── start-backend.ps1         # Start backend only
│   ├── test-api.ps1              # Basic API tests
│   ├── test-profile-api.ps1      # Profile endpoint tests
│   ├── test-all-api-endpoints.ps1 # Full API tests
│   └── README.md                 # Scripts documentation
│
├── 📂 misc/                       # Consolidated documentation
│   ├── 00-INDEX.md               # Quick reference
│   ├── 01-SETUP-AND-DEPLOYMENT.md
│   ├── 02-TECHNICAL-ARCHITECTURE.md
│   ├── 03-DESIGN-SYSTEM.md
│   └── 04-BUILD-AND-TROUBLESHOOTING.md
│
├── 📂 .github/
│   ├── workflows/
│   │   ├── deploy.yml            # Frontend deployment
│   │   └── deploy-workers.yml    # API deployment
│   └── copilot-instructions.md   # AI coding guidelines
│
├── 📂 PortfolioBackend/           # .NET API (optional)
├── 📂 PortfolioAPI/               # Azure Functions (optional)
│
├── package.json                  # Root workspace config
├── README.md                     # This file
├── .gitignore
└── LICENSE

```

---

## API Documentation

### Base URL
- **Production**: `https://your-api.workers.dev`
- **Protocol**: HTTPS only
- **CORS**: Enabled for all origins (`Access-Control-Allow-Origin: *`)

### Endpoints

#### `GET /profile`
Returns profile name and specialist content.

**Response:**
```json
{
  "name": "Your Full Name",
  "specialistContent": "Your Title | Your Specialization"
}
```
**Cache**: 1 hour

---

#### `GET /contact`
Returns all contact information.

**Response:**
```json
{
  "email": "your.email@example.com",
  "phone": "+1 234 567 8900",
  "linkedin": "https://www.linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "location": "Your City, Country"
}
```
**Cache**: 1 hour

---

#### `GET /resume`
Returns complete resume data.

**Response:**
```json
{
  "personalInfo": { ... },
  "shortSummary": "...",
  "summary": "...",
  "skills": [ ... ],
  "tools": [ ... ],
  "experience": [ ... ],
  "education": [ ... ]
}
```
**Cache**: 1 hour

---

#### `GET /resume/{section}`
Returns specific resume section.

**Sections**: `summary`, `skills`, `tools`, `experience`, `education`, `personal`

**Example**: `GET /resume/skills`

---

#### `GET /blog`
Returns all blog posts.

**Response:**
```json
{
  "posts": [
    {
      "id": "1",
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "content": "...",
      "date": "2024-01-15",
      "category": "Technology",
      "tags": ["angular", "typescript"],
      "readTime": 5
    }
  ]
}
```
**Cache**: 1 hour

---

#### `GET /blog/{slug}`
Returns specific blog post by slug.

**Example**: `GET /blog/my-first-post`

---

#### `GET /assets/{type}`
Returns binary assets (images, files).

**Types**: `profile-image`, `resume-pdf`, etc.

**Cache**: 24 hours

---

### Error Responses

**404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "The requested endpoint does not exist",
  "availableEndpoints": ["/profile", "/contact", "/resume", "/blog", "/assets"]
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

### Rate Limiting
- No rate limits currently enforced
- Cloudflare Workers KV provides global edge caching

### Authentication
- Public API, no authentication required
- POST endpoints require CSRF protection (future)

---

## Deployment

### Frontend (GitHub Pages)

**Automatic Deployment:**
- Push to `main` branch triggers GitHub Actions
- Angular app builds to `docs/` folder
- GitHub Pages serves from `docs/` directory
- Custom domain: `rahul-a.in`

**Manual Deployment:**
```bash
cd PortfolioFrontend
npm run build
# Commit docs/ folder
git add docs/
git commit -m "Deploy: Update frontend"
git push origin main
```

**GitHub Actions Workflow:** `.github/workflows/deploy.yml`

---

### Backend API (Cloudflare Workers)

**Automatic Deployment:**
- Push to `main` branch triggers Workers deployment
- Wrangler deploys to Cloudflare Edge network

**Manual Deployment:**
```bash
cd workers
npm run deploy
```

**Upload Data to Workers KV:**
```bash
cd workers
node scripts/upload-to-kv.js
```

**GitHub Actions Workflow:** `.github/workflows/deploy-workers.yml`

---

### Environment Configuration

**Development** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: '',
  useLocalData: true  // Load from JSON templates
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-api.rahul-a-works.workers.dev',
  useLocalData: false  // Use Cloudflare Workers API
};
```

---

## Development

### Available Scripts

**Root Workspace:**
```bash
npm start                    # Start all services
npm run start:frontend-only  # Frontend only
npm run start:backend-only   # Backend only (.NET)
npm run start:api-only       # Azure Functions only
npm run install:all          # Install all dependencies
npm run build:all            # Build frontend + API
npm run test:api             # Run API tests
```

**Frontend:**
```bash
cd PortfolioFrontend
npm start                    # Dev server (localhost:4200)
npm run build                # Production build
```

**Workers API:**
```bash
cd workers
npm run dev                  # Local dev server
npm run deploy               # Deploy to Cloudflare
npm run tail                 # View live logs
```

### Local Development Modes

**Mode 1: Frontend Only (Recommended for UI work)**
```bash
npm run start:frontend-only
# Uses JSON templates from assets/data/local/
```

**Mode 2: Full Stack (Frontend + API)**
```bash
# Terminal 1: Start Workers API
cd workers
npm run dev

# Terminal 2: Start Frontend
cd PortfolioFrontend
# Update environment.ts: useLocalData = false
npm start
```

### Testing

**API Endpoint Tests:**
```powershell
# Test all endpoints
.\scripts\test-all-api-endpoints.ps1

# Test specific endpoint
.\scripts\test-profile-api.ps1
```

**Manual Testing:**
```bash
# Profile endpoint
curl https://your-api.workers.dev/profile

# Resume endpoint
curl https://your-api.workers.dev/resume

# Blog endpoint
curl https://your-api.workers.dev/blog
```

---

## Documentation

All technical documentation is consolidated in the `misc/` folder:

| File | Description |
|------|-------------|
| **00-INDEX.md** | Quick reference, common patterns, troubleshooting |
| **01-SETUP-AND-DEPLOYMENT.md** | Installation, setup, deployment guides |
| **02-TECHNICAL-ARCHITECTURE.md** | Tech stack, architecture, data flow |
| **03-DESIGN-SYSTEM.md** | Colors, typography, responsive design |
| **04-BUILD-AND-TROUBLESHOOTING.md** | Build config, common issues, fixes |

**Additional Documentation:**
- `scripts/README.md` - Development scripts guide
- `workers/README.md` - Cloudflare Workers API documentation
- `.github/copilot-instructions.md` - AI coding guidelines

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow coding conventions in `.github/copilot-instructions.md`
   - Use terminal green theme (#00ff96)
   - Maintain responsive design
   - Add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
   Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- **NO EMOJIS** in code, configs, or log messages
- Use text markers: `[SUCCESS]`, `[ERROR]`, `[WARNING]`, `[INFO]`
- TypeScript: Strict mode, PascalCase for classes, camelCase for properties
- CSS: Use CSS custom properties, BEM-like naming, rem/em units
- Components: Standalone components, no NgModules
- Follow Angular 19 best practices

### Testing Checklist

- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on mobile (iPhone, Android)
- [ ] Test on tablet (iPad)
- [ ] Verify responsive design (320px - 4K)
- [ ] Check accessibility (keyboard nav, screen readers)
- [ ] Run API tests (`npm run test:api`)
- [ ] Build succeeds without errors
- [ ] No console errors

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**[Your Name]**

- **Website**: [https://yourwebsite.com](https://yourwebsite.com)
- **Email**: your.email@example.com
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)

> **Note**: Contact information is displayed dynamically on the live site from Workers KV. Update `workers/data/contact.json` and upload to KV.

---

## Acknowledgments

- **Angular Team** - Amazing framework and tooling
- **Cloudflare** - Fast, reliable edge computing platform
- **Material Design** - Beautiful, accessible UI components
- **GitHub** - Free hosting and CI/CD
- **Community** - Open source contributors and supporters

---

## Project Stats

- **Lines of Code**: ~15,000+ (TypeScript, HTML, CSS)
- **Components**: 15+ Angular components
- **API Endpoints**: 5 main endpoints with sub-routes
- **Deployment Time**: ~2-3 minutes (automated)
- **Bundle Size**: ~128 KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

---

<div align="center">

** Star this repo if you find it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/Portfolio?style=social)](https://github.com/yourusername/Portfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/Portfolio?style=social)](https://github.com/yourusername/Portfolio/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/yourusername/Portfolio?style=social)](https://github.com/yourusername/Portfolio/watchers)

Made with  by [Your Name](https://yourwebsite.com)

</div>

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start individual services**
   ```bash
   # Frontend only
   npm run start:frontend-only

   # Backend only
   npm run start:backend-only

   # Azure Functions only
   npm run start:api-only
   ```

4. **Open in browser**
   ```
   http://localhost:4200
   ```

</details>

### 🎯 Available Commands

From the root directory:

| Command | Description |
|---------|-------------|
| `npm start` | Start all services (Frontend + Backend + API) |
| `npm run start:frontend-only` | Start only Angular frontend |
| `npm run start:backend-only` | Start only .NET backend |
| `npm run start:api-only` | Start only Azure Functions |
| `npm run install:all` | Install dependencies for all projects |
| `npm run build:all` | Build frontend and API |
| `npm run test:api` | Test all API endpoints |

### Building for Production

```bash
npm run build:all
# or for frontend only
cd PortfolioFrontend
npm run build

# Output will be in ../docs/ folder
```

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Optimizations |
|--------|------------|---------------|
| **Desktop** | 1920px+ | Full layout, all features |
| **Laptop** | 1024px - 1920px | Optimized spacing |
| **Tablet** | 768px - 1024px | Adjusted components |
| **Mobile Large** | 480px - 768px | Icon navigation, stacked layout |
| **Mobile Small** | < 480px | Optimized for small screens |

### Key Responsive Features
- ✅ Touch targets minimum 44x44px
- ✅ Icon-only navigation on mobile
- ✅ Single-column layouts on small screens
- ✅ Font size optimization (16px minimum for inputs)
- ✅ Horizontal scrolling for overflow content
- ✅ Tab scroll buttons with terminal green theme

---

## Design System

### Color Palette
```css
--terminal-green: #00ff96           /* Primary accent */
--terminal-bg-dark: #0f0f1e         /* Main background */
--terminal-bg-medium: #1a1a2e       /* Secondary background */
--terminal-bg-light: #16213e        /* Tertiary background */
--terminal-text: rgba(255,255,255,0.9)      /* Primary text */
--terminal-text-secondary: rgba(255,255,255,0.6)  /* Secondary text */
```

### Typography
- **Headings**: Monaco, Menlo, Ubuntu Mono (monospace)
- **Body Text**: Segoe UI, Roboto, sans-serif
- **Base Font Size**: 15px (desktop), 13-14px (mobile)

### Spacing
- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 40px, 48px

---

## Documentation

**All documentation has been consolidated into 5 comprehensive files in the `misc/` folder.**

### [ACTION] Complete Documentation

1. **[00-INDEX.md](misc/00-INDEX.md)** - Quick reference, overview, common patterns
2. **[01-SETUP-AND-DEPLOYMENT.md](misc/01-SETUP-AND-DEPLOYMENT.md)** - Setup, deployment, **blog management**
3. **[02-TECHNICAL-ARCHITECTURE.md](misc/02-TECHNICAL-ARCHITECTURE.md)** - Tech stack, architecture, code quality
4. **[03-DESIGN-SYSTEM.md](misc/03-DESIGN-SYSTEM.md)** - Theme, responsive design, UI patterns
5. **[04-BUILD-AND-TROUBLESHOOTING.md](misc/04-BUILD-AND-TROUBLESHOOTING.md)** - Build config, fixes, migrations

### Quick Links

- **How to add a blog post?** → See [01-SETUP-AND-DEPLOYMENT.md#blog-management](misc/01-SETUP-AND-DEPLOYMENT.md#blog-management)
- **Setup instructions?** → See [01-SETUP-AND-DEPLOYMENT.md](misc/01-SETUP-AND-DEPLOYMENT.md)
- **Build failing?** → See [04-BUILD-AND-TROUBLESHOOTING.md](misc/04-BUILD-AND-TROUBLESHOOTING.md)
- **Design guidelines?** → See [03-DESIGN-SYSTEM.md](misc/03-DESIGN-SYSTEM.md)

---

## 🔄 Deployment

### Automatic Deployment (CI/CD)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Workflow Steps:**
1. Push changes to `main` branch
2. GitHub Actions builds the Angular app
3. Copies build output to `docs/` folder
4. Deploys to GitHub Pages
5. Site is live at rahul-a.in

**Monitor Deployment:**
- Go to: [Actions Tab](https://github.com/rahul-a-bangera/Portfolio/actions)
- Check for green checkmark (✅)
- Deployment time: ~2-3 minutes

### Manual Deployment

```bash
# Build the application
cd PortfolioFrontend
npm run build

# Commit and push
git add .
git commit -m "Update site content"
git push origin main
```

---

## 🧪 Testing

### Browser Testing
- ✅ Chrome/Edge (Latest)
- ✅ Safari (iOS 12+)
- ✅ Firefox (Latest)
- ✅ Samsung Internet

### Device Testing
- ✅ Desktop (1920x1080, 2560x1440)
- ✅ Laptop (1366x768, 1440x900)
- ✅ Tablet (iPad 768x1024)
- ✅ Mobile (iPhone SE 375px, iPhone 12 390px, iPhone Pro Max 428px)

### Feature Testing
- ✅ All navigation links
- ✅ CV download functionality
- ✅ Contact popup and copy-to-clipboard
- ✅ External links (LinkedIn)
- ✅ Smooth scrolling
- ✅ Tab navigation with scroll buttons
- ✅ Responsive layout on all breakpoints

---

## 🔒 Security

- ✅ HTTPS enforced by GitHub Pages
- ✅ External links use `rel="noopener noreferrer"`
- ✅ No sensitive data in client-side code
- ✅ Latest Angular 19 with security patches
- ✅ Regular dependency updates

---

## Performance Metrics

### Bundle Sizes
```
main.js       →  456.81 KB (107.96 KB gzipped)
styles.css    →   94.68 KB (8.78 KB gzipped)
polyfills.js  →   34.86 KB (11.35 KB gzipped)
runtime.js    →    914 bytes (521 bytes gzipped)

Total         →  587.27 KB (128.61 KB gzipped)
```

### Load Times
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+ (estimated)

---

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rahul A**  
*Software Engineer | .NET & Azure Specialist*

-  Website: [rahul-a.in](https://rahul-a.in)
- 💼 LinkedIn: [rahul-bangera](https://www.linkedin.com/in/rahul-bangera/)
- 📧 Email: rahul.bangera.999@gmail.com
- 📱 Mobile: +91 9663 885 365
- 📍 Location: Mangalore, Karnataka, India

---

## Acknowledgments

- **Angular Team** - For the amazing framework
- **Material Design** - For the component library
- **GitHub Pages** - For free hosting
- **Google Fonts** - For the typography

---

## 📈 Status

**Production Status**: ✅ LIVE  
**Last Updated**: December 11, 2024  
**Version**: 1.0.0  
**Deployment**: Automatic via GitHub Actions

---

** If you like this project, please give it a star!**

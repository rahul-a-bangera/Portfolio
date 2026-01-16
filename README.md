# 🚀 Rahul A - Portfolio Website

[![Deploy Status](https://github.com/rahul-a-bangera/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/rahul-a-bangera/Portfolio/actions)
[![Live Site](https://img.shields.io/badge/Live-rahul--a.in-00ff96)](https://rahul-a.in)
[![Angular](https://img.shields.io/badge/Angular-19.0-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, fully responsive single-page portfolio website built with Angular 19, featuring a cyberpunk terminal-inspired design with Material Design components. Deployed on GitHub Pages with a custom domain.

## 🌐 Live Site

**Primary URL**: [https://rahul-a.in](https://rahul-a.in)  
**GitHub Pages**: [https://rahul-a-bangera.github.io/Portfolio/](https://rahul-a-bangera.github.io/Portfolio/)
**API Documentation**: [https://gentle-moss-0d321ce00.2.azurestaticapps.net](https://gentle-moss-0d321ce00.2.azurestaticapps.net)

---

## ✨ Features

### 🎨 Design & Theme
- **Cyberpunk Terminal Theme**: Dark background with terminal green (#00ff96) accents
- **Animated Background**: Dynamic grid pattern with floating particles
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur
- **Smooth Animations**: GPU-accelerated transitions and hover effects

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes (320px - 2560px+)
- **Touch-Friendly**: 44x44px minimum touch targets (iOS guidelines)
- **Icon Navigation**: Icon-only navigation on mobile devices
- **Auto-Closing Modals**: Smart popup behavior on scroll

### 🧭 Sections

#### **Home**
- Profile card with animated border glow
- CV download functionality
- Contact information popup with copy-to-clipboard
- LinkedIn profile link
- Social media integration

#### **Resume**
- **Tabbed Interface** with 5 sections:
  - Summary & Introduction
  - Technical Skills (grid layout)
  - Tools & Technologies
  - Professional Experience (timeline)
  - Education
- Horizontal scroll with visible navigation buttons
- Responsive skill badges with hover effects

#### **Blog**
- Dynamic blog post cards
- Category filtering
- Tag system
- Read time estimation
- Pagination support

#### **Contact**
- Contact information cards
- Interactive contact form
- Social media links
- Email and phone display with hover effects

### 🎯 User Experience Features
- **Smooth Scroll Navigation**: Auto-scroll to sections
- **Sticky Header**: Always accessible navigation
- **Copy to Clipboard**: Quick copy for email and phone
- **Download CV**: One-click PDF download
- **External Links**: Open in new tabs with security attributes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 19.0.0 | Frontend framework |
| **TypeScript** | 5.7.0 | Type-safe JavaScript |
| **Angular Material** | 19.0.0 | UI component library |
| **RxJS** | 7.8.0 | Reactive programming |
| **CSS3** | Latest | Styling with custom properties |

### Build & Deployment
| Tool | Purpose |
|------|---------|
| **Angular CLI** | Build and development server |
| **GitHub Actions** | CI/CD pipeline |
| **GitHub Pages** | Static site hosting |
| **Custom Domain** | DNS configuration (rahul-a.in) |

### Performance
- **Bundle Size**: 128.61 KB (gzipped)
- **Build Time**: ~15-20 seconds
- **Deploy Time**: ~2-3 minutes
- **First Load**: < 3 seconds

---

## 📁 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # GitHub Pages deployment
│       └── deploy-workers.yml      # Cloudflare Workers deployment
│
├── workers/                        # Cloudflare Workers API
│   ├── src/
│   │   ├── index.ts               # Main router
│   │   └── handlers/
│   │       ├── contact.ts         # Contact endpoint
│   │       ├── resume.ts          # Resume endpoint
│   │       └── blog.ts            # Blog endpoint
│   ├── wrangler.toml              # Workers configuration
│   ├── package.json               # Dependencies
│   └── README.md                  # API documentation
│
├── docs/                           # Build output (GitHub Pages)
│   ├── assets/
│   │   ├── profile.jpg            # Profile picture
│   │   └── Rahul-A-Resume.pdf     # CV PDF
│   ├── CNAME                      # Custom domain configuration
│   ├── index.html                 # Main HTML file
│   └── *.js, *.css               # Built bundles
│
├── PortfolioFrontend/             # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── header.component.*      # Navigation header
│   │   │   │   ├── home.component.*        # Home/Landing section
│   │   │   │   ├── resume.component.*      # Resume with tabs
│   │   │   │   ├── blog.component.*        # Blog posts
│   │   │   │   └── contact.component.*     # Contact form
│   │   │   └── app.component.*             # Root component
│   │   ├── assets/                         # Images and files
│   │   ├── styles.css                      # Global styles
│   │   ├── index.html                      # HTML template
│   │   ├── main.ts                         # Entry point
│   │   └── CNAME                           # Domain config
│   ├── angular.json                        # Angular configuration
│   ├── package.json                        # Dependencies
│   ├── tsconfig.json                       # TypeScript config
│   └── *.md                                # Documentation files
│
├── misc/                                   # Documentation
│   ├── 00-DOCUMENTATION-INDEX.md
│   ├── 01-TECHNICAL.md
│   ├── 02-ARCHITECTURE.md
│   ├── 03-THEME.md
│   ├── 04-SETUP.md
│   ├── 05-DEPLOYMENT.md
│   ├── 06-RESPONSIVE.md
│   ├── 07-BUILD.md
│   ├── 08-AZURE-SETUP.md (deprecated)
│   └── 09-CLOUDFLARE-WORKERS-SETUP.md     # NEW!
│
├── .nojekyll                              # Disable Jekyll processing
└── README.md                              # This file
```

---

## 🚀 Quick Start

**NEW: Start all services (Frontend + Backend + Azure Functions) with one command!**

See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

### ⚡ One-Command Setup

```powershell
# Option 1: Use PowerShell script (recommended)
.\start-dev.ps1

# Option 2: Use npm directly
npm start
```

This will start:
- **Frontend**: http://localhost:4200 (Angular)
- **Backend**: http://localhost:5091 (.NET Core API)
- **Azure Functions**: http://localhost:7071 (Serverless API)

### 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **.NET SDK**: v8.0 or higher
- **Azure Functions Core Tools**: v4.x (optional)

### 🔧 Manual Setup (Alternative)

<details>
<summary>Click to expand traditional setup instructions</summary>

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahul-a-bangera/Portfolio.git
   cd Portfolio
   ```

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

## 🎨 Design System

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

## 📚 Documentation

### User Guides
- [Deployment Checklist](misc/DEPLOYMENT_CHECKLIST.md)
- [GitHub Pages Setup](misc/GITHUB_PAGES_DEPLOYMENT.md)
- [Custom Domain Configuration](misc/CUSTOM_DOMAIN_SETUP.md)

### Developer Guides
- [Responsive Design Improvements](PortfolioFrontend/RESPONSIVE_DESIGN_IMPROVEMENTS.md)
- [Responsive Quick Reference](PortfolioFrontend/RESPONSIVE_QUICK_REFERENCE.md)
- [Mobile UX Fixes](PortfolioFrontend/MOBILE_UX_FIXES.md)
- [Theme Consistency Guidelines](misc/THEME_CONSISTENCY.md)

### Reports
- [Production Readiness Report](PRODUCTION_READINESS_REPORT.md)
- [Code Quality Report](misc/CODE_QUALITY_REPORT.md)

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

## 📊 Performance Metrics

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

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rahul A**  
*Software Engineer | .NET & Azure Specialist*

- 🌐 Website: [rahul-a.in](https://rahul-a.in)
- 💼 LinkedIn: [rahul-bangera](https://www.linkedin.com/in/rahul-bangera/)
- 📧 Email: rahul.bangera.999@gmail.com
- 📱 Mobile: +91 9663 885 365
- 📍 Location: Mangalore, Karnataka, India

---

## 🙏 Acknowledgments

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

**⭐ If you like this project, please give it a star!**

# GitHub Copilot Instructions for Portfolio Project

## Project Overview
This is a modern, responsive portfolio website built with Angular 19 and deployed on GitHub Pages with a custom domain (rahul-a.in). The project features a cyberpunk terminal-inspired design with a consistent color scheme.

## Documentation Structure

**All documentation is consolidated into 5 files in the `misc/` folder:**

1. **00-INDEX.md** - Documentation overview, quick reference, common patterns
2. **01-SETUP-AND-DEPLOYMENT.md** - Installation, setup, deployment, and blog management
3. **02-TECHNICAL-ARCHITECTURE.md** - Tech stack, architecture, components, data flow
4. **03-DESIGN-SYSTEM.md** - Colors, typography, responsive design, accessibility
5. **04-BUILD-AND-TROUBLESHOOTING.md** - Build configuration, common issues, migrations

**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**


## File Organization

### Documentation Files
- **Root**: `README.md` only (main project documentation, public-facing)
- **misc/**: All technical documentation (consolidated files: 00-INDEX, 01-SETUP-AND-DEPLOYMENT, 02-TECHNICAL-ARCHITECTURE, 03-DESIGN-SYSTEM, 04-BUILD-AND-TROUBLESHOOTING)
- **workers/**: `README.md` (Cloudflare Workers API documentation)
- **.github/**: `copilot-instructions.md` (this file)

**Rule**: Never create new .md files outside this structure. Update existing files instead.

## Code Style & Conventions

### General Rules
- **NO EMOJIS** - Never use emojis in code, configuration files, workflows, or log messages
- Use text markers instead: `[SUCCESS]`, `[ERROR]`, `[WARNING]`, `[INFO]`, `[ACTION]`
- Emojis cause encoding issues in GitHub Actions and other CI/CD systems
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

### TypeScript/Angular
- Use **standalone components** (no modules)
- Follow **Angular 19** best practices
- Use **strict TypeScript** mode
- Use **PascalCase** for component class names
- Use **camelCase** for properties and methods
- Use **kebab-case** for component selectors (e.g., `app-header`)
- Prefer **template literals** for string concatenation
- Use **async/await** over promises where appropriate
- Use **readonly** for properties that shouldn't be modified

### CSS/Styling
- Use **CSS custom properties** defined in `:root`
- Follow **BEM-like naming** for CSS classes (e.g., `.card-title`, `.button--primary`)
- Use **rem/em** units for responsive sizing
- Use **px** only for borders and fine details
- Always provide **fallback colors** for rgba values
- Use **::ng-deep** sparingly and document why it's needed
- Prefer **flexbox** and **grid** for layouts

### File Organization
- Components in `PortfolioFrontend/src/app/components/`
- Each component has: `.ts`, `.html`, `.css` files
- Global styles in `PortfolioFrontend/src/styles.css`
- Assets in `PortfolioFrontend/src/assets/`
- **Documentation in `misc/` folder (8 consolidated files ONLY)**
- Build output in `docs/` folder (for GitHub Pages)
- **Azure Functions API in `PortfolioAPI/` folder**

## Design System

### Color Palette (Terminal Green Theme)
```css
--terminal-green: #00ff96           /* Primary accent - use for CTAs, links, highlights */
--terminal-bg-dark: #0f0f1e         /* Main background */
--terminal-bg-medium: #1a1a2e       /* Secondary background */
--terminal-bg-light: #16213e        /* Tertiary background */
--terminal-text: rgba(255,255,255,0.9)      /* Primary text */
--terminal-text-secondary: rgba(255,255,255,0.6)  /* Secondary text */
--terminal-border: rgba(0,255,150,0.2)      /* Default borders */
--terminal-border-bright: rgba(0,255,150,0.5)  /* Active/hover borders */
```

**Always use these exact color values. Do not introduce new colors without updating 03-THEME.md**

### Typography
- **Headings**: Monaco, Menlo, Ubuntu Mono, Courier New (monospace fonts)
- **Body Text**: Segoe UI, Roboto, sans-serif
- **Base Font Size**: 15px (desktop), 13-14px (mobile)
- **Line Height**: 1.6-1.7 for body text, 1.3-1.4 for headings
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

### Spacing Scale
Use multiples of 8px: `8px, 16px, 24px, 32px, 40px, 48px, 60px`

### Component Patterns
- **Cards**: Dark background with green border glow, border-radius: 8px
- **Buttons**: Terminal green (#00ff96) background, uppercase text, letter-spacing: 0.5px
- **Hover States**: Increase glow effect, slight translateY(-2px) or scale(1.05)
- **Icons**: Material Icons, size 20-24px, color matches text or accent

## Responsive Design Guidelines

### Breakpoints
```css
/* Desktop Default - No media query needed (1024px+) */

/* Tablet - 960px to 1024px */
@media (max-width: 1024px) { }

/* Mobile Large - 768px to 960px */
@media (max-width: 960px) { }

/* Mobile Medium - 480px to 768px */
@media (max-width: 768px) { }

/* Mobile Small - Below 480px */
@media (max-width: 480px) { }
```

### Touch Targets
- **Minimum size**: 44x44px on mobile (iOS guidelines)
- **Preferred size**: 48x48px (Android guidelines)
- **Spacing**: Minimum 8px between touch targets

### Mobile Optimizations
- Icon-only navigation on screens < 768px
- Single-column layouts on screens < 768px
- Font size minimum 16px for inputs (prevents iOS zoom)
- Stack cards vertically on mobile
- Reduce padding: 32px ? 24px ? 20px ? 16px ? 12px

### Responsive Text
- Use `clamp()` for fluid typography when appropriate
- Scale headings: h1 desktop (32px) ? mobile (20px)
- Maintain readability: line-height stays 1.6+ on all screens

## Component Guidelines
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

### When Creating New Components
1. Use standalone component decorator
2. Import only what's needed (CommonModule, Material modules)
3. Include TypeScript interface for any data models
4. Add responsive CSS for all breakpoints
5. Use semantic HTML (header, section, article, nav, etc.)
6. Add ARIA labels for accessibility
7. Test on mobile and desktop viewports

### Component Structure Template
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Properties
  title = 'Example';
  
  // Constructor
  constructor() {}
  
  // Methods
  handleClick(): void {
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

/* Main elements */
.component-title {
  color: var(--terminal-green);
  font-family: var(--monospace-font);
}

/* Interactive elements */
.component-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 255, 150, 0.4);
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .component-container {
    padding: 20px 16px;
  }
  
  .component-title {
    font-size: 20px;
  }
}
```

## Angular Material Usage

### Preferred Components
- `MatToolbar` - Navigation header
- `MatCard` - Content containers
- `MatButton` - Interactive buttons  
- `MatIcon` - Icons (Material Icons font)
- `MatTabs` - Tabbed content
- Always customize with terminal green theme

### Material Theme Override
Override Material component styles using `::ng-deep` when necessary:
```css
::ng-deep .mat-mdc-button {
  color: var(--terminal-green) !important;
  font-family: var(--monospace-font);
}
```

## Performance Guidelines

### Bundle Size Limits
- **Total Bundle**: Keep under 150 KB (gzipped)
- **Component CSS**: Keep under 12 KB per file (see 07-BUILD.md)
- **Images**: Optimize and use appropriate formats (JPEG for photos)

### Performance Best Practices
- Use `OnPush` change detection when possible
- Lazy load images with `loading="lazy"`
- Minimize use of `::ng-deep`
- Avoid inline styles in templates
- Use CSS animations over JavaScript when possible
- Leverage GPU acceleration (transform, opacity)

## Accessibility Requirements

### Essential ARIA Attributes
- Add `aria-label` to icon-only buttons
- Use `aria-expanded` for collapsible sections
- Add `aria-current="page"` to active navigation items
- Include `alt` text for all images
- Use `role` attributes when semantic HTML isn't sufficient

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Support Escape key to close modals/popups

### Color Contrast
- Maintain WCAG AA standards (4.5:1 for normal text)
- Terminal green on dark background passes AA
- Test all text color combinations

## Git & Deployment

### Commit Message Format
Use conventional commits:
```
feat: Add new blog post filtering feature
fix: Resolve mobile navigation toggle issue
docs: Update technical documentation (in misc/01-TECHNICAL.md)
style: Improve button hover animations
refactor: Simplify contact form validation
perf: Optimize image loading
test: Add unit tests for resume component
chore: Update Angular to version 19.1
```

### Branch Strategy
- `main` - Production branch (auto-deploys to GitHub Pages)
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`

### Deployment Process
1. Make changes in feature branch
2. Test locally with `npm start`
3. Build with `npm run build`
4. Merge to `main` (triggers auto-deployment via GitHub Actions)
5. Verify deployment at https://rahul-a.in

## Documentation
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

### When to Update Documentation
- **Code changes**: Update relevant file in `misc/` (00-04)
- **New features**: Update 02-TECHNICAL-ARCHITECTURE.md
- **Architecture changes**: Update 02-TECHNICAL-ARCHITECTURE.md
- **Theme changes**: Update 03-DESIGN-SYSTEM.md
- **Setup changes**: Update 01-SETUP-AND-DEPLOYMENT.md
- **Deployment changes**: Update 01-SETUP-AND-DEPLOYMENT.md
- **Responsive changes**: Update 03-DESIGN-SYSTEM.md
- **Build changes**: Update 04-BUILD-AND-TROUBLESHOOTING.md
- **API changes**: Update 01-SETUP-AND-DEPLOYMENT.md (API Setup section)

### Documentation Rules
1. **NEVER create new .md files** - Update existing consolidated files
2. All docs go in `misc/` except `README.md` (root)
3. Keep documentation concise and up-to-date
4. Use clear headings and code examples
5. Include tables for comparisons
6. Use ? ? ?? ?? for visual markers

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on iPhone (375px, 390px, 428px)
- [ ] Test on iPad (768px, 1024px)
- [ ] Test on desktop (1920px, 2560px)
- [ ] Verify all links work
- [ ] Check all forms submit correctly
- [ ] Test keyboard navigation
- [ ] Verify ARIA labels with screen reader

## Common Patterns

### Loading States
```typescript
isLoading = false;

async loadData(): Promise<void> {
  this.isLoading = true;
  try {
    // Fetch data
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    this.isLoading = false;
  }
}
```

### Copy to Clipboard
```typescript
async copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    this.showSuccessMessage('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
    this.showErrorMessage('Failed to copy');
  }
}
```

### Scroll to Section
```typescript
scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
```

### Auto-close on Scroll
```typescript
@HostListener('window:scroll', ['$event'])
onWindowScroll(): void {
  if (this.isPopupOpen) {
    const scrollDiff = Math.abs(window.pageYOffset - this.lastScrollPosition);
    if (scrollDiff > 50) {
      this.closePopup();
    }
  }
}
```

## Troubleshooting Common Issues

### Build Fails
- Check `angular.json` CSS budget limits (see 07-BUILD.md)
- Verify all imports are correct
- Run `npm install` to update dependencies
- Check for TypeScript errors with `ng build`

### Styles Not Applying
- Check if using correct CSS custom properties
- Verify `::ng-deep` placement (before Material selectors)
- Clear browser cache (Ctrl+Shift+R)
- Check specificity of selectors

### Responsive Design Issues
- Verify media queries are in correct order (mobile-last)
- Check viewport meta tag in `index.html`
- Test with actual devices, not just DevTools
- Verify touch target sizes (minimum 44x44px)
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

### GitHub Pages Deployment
- Check GitHub Actions logs
- Verify `docs/` folder is committed
- Ensure `CNAME` file exists in `docs/`
- Wait 5-10 minutes for DNS propagation

## Quick Commands Reference

```bash
# Development
npm start                    # Start dev server (localhost:4200)
npm run build               # Build for production (outputs to docs/)

# Git
git status                  # Check file changes
git add .                   # Stage all changes
git commit -m "message"     # Commit with message
git push origin main        # Push to GitHub (triggers deployment)

# Deployment
# Just push to main - GitHub Actions handles the rest!
# Monitor: https://github.com/rahul-a-bangera/Portfolio/actions
# Live site: https://rahul-a.in
```

## Project-Specific Rules

### DO's ?
- Always maintain terminal green theme (#00ff96)
- Add responsive styles for all breakpoints
- Test on mobile devices
- Use Material Icons for consistency
- Document changes in appropriate misc/ file (00-08)
- Keep bundle sizes optimized
- Follow accessibility guidelines
- Use semantic HTML
- Add ARIA labels
- Test keyboard navigation

### DON'Ts ?
- **Don't create new .md files** - Update existing misc/ files (00-08)
- Don't introduce new color schemes without updating 03-THEME.md
- Don't skip mobile testing
- Don't use inline styles in templates
- Don't hardcode values (use CSS variables)
- Don't ignore accessibility
- Don't commit `node_modules/` or `dist/`
- Don't modify `docs/` manually (it's auto-generated)
- Don't exceed CSS budget limits without justification
- Don't break existing theme consistency

## Contact & Support

**Developer**: Rahul A  
**Email**: rahul.bangera.999@gmail.com  
**LinkedIn**: https://www.linkedin.com/in/rahul-bangera/  
**Live Site**: https://rahul-a.in  
**Repository**: https://github.com/rahul-a-bangera/Portfolio

---

**Last Updated**: December 11, 2024  
**Project Version**: 1.0.0  
**Angular Version**: 19.0.0
**IMPORTANT: Do NOT create new .md files. Update existing consolidated documentation files instead.**

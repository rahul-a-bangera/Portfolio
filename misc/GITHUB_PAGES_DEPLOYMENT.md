# GitHub Pages Deployment Guide

## Overview
This document provides step-by-step instructions to deploy the Angular Portfolio to GitHub Pages.

## Repository Information
- **Repository**: `rahul-a-bangera/Portfolio`
- **Branch**: `main`
- **GitHub Pages URL**: `https://rahul-a-bangera.github.io/Portfolio/`

## Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher
- Git installed and configured
- Push access to the GitHub repository

## Configuration Changes Made

### 1. Angular Configuration (`PortfolioFrontend/angular.json`)
- **Output Path**: Changed to `../docs` (root docs folder)
- **Base Href**: Set to `/Portfolio/` for GitHub Pages routing
- **Production Budgets**: Configured for optimal bundle size
- **Build Target**: Production optimized

### 2. GitHub Pages Setup Files
- **`.nojekyll`**: Created in root to prevent Jekyll processing
- **GitHub Actions Workflow**: Automated deployment pipeline

## Deployment Options

### Option 1: Automatic Deployment (Recommended)

**Using GitHub Actions** ?

1. **Enable GitHub Pages in Repository Settings**
   ```
   Repository ? Settings ? Pages
   Source: GitHub Actions
   ```

2. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor Deployment**
   - Go to: `https://github.com/rahul-a-bangera/Portfolio/actions`
   - Watch the deployment workflow
   - Takes ~2-3 minutes

4. **Access Your Site**
   - URL: `https://rahul-a-bangera.github.io/Portfolio/`

### Option 2: Manual Deployment

**Build and Deploy Manually**

1. **Build the Angular App**
   ```bash
   cd PortfolioFrontend
   npm install
   npm run build -- --configuration production
   ```

2. **Verify Build Output**
   ```bash
   # Check that docs folder was created in root
   ls ../docs
   ```

3. **Copy .nojekyll File**
   ```bash
   cp ../.nojekyll ../docs/
   ```

4. **Commit and Push**
   ```bash
   cd ..
   git add docs .nojekyll
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

5. **Configure GitHub Pages**
   ```
   Repository ? Settings ? Pages
   Source: Deploy from a branch
   Branch: main
   Folder: /docs
   Save
   ```

## GitHub Repository Settings

### Required Settings

1. **Go to Repository Settings**
   ```
   https://github.com/rahul-a-bangera/Portfolio/settings
   ```

2. **Enable GitHub Pages**
   - Navigate to: **Settings ? Pages**
   - **Source**: 
     - For Automatic: `GitHub Actions`
     - For Manual: `Deploy from a branch` ? `main` ? `/docs`
   - Click **Save**

3. **Verify Deployment**
   - Check the green checkmark at the top
   - Click "Visit site" button

## Build Commands

### Development Build
```bash
cd PortfolioFrontend
npm run build -- --configuration development
```

### Production Build (for GitHub Pages)
```bash
cd PortfolioFrontend
npm run build -- --configuration production --base-href /Portfolio/
```

### Local Testing
```bash
cd PortfolioFrontend
npm start
# Access at: http://localhost:4200
```

## File Structure After Build

```
Portfolio/
??? .github/
?   ??? workflows/
?       ??? deploy.yml          # GitHub Actions workflow
??? .nojekyll                   # Prevent Jekyll processing
??? docs/                       # Build output (GitHub Pages source)
?   ??? index.html
?   ??? assets/
?   ?   ??? profile.jpg
?   ?   ??? Rahul-A-Resume.pdf
?   ??? *.js                    # Compiled JavaScript
?   ??? *.css                   # Compiled CSS
?   ??? .nojekyll              # Copy of root .nojekyll
??? PortfolioFrontend/         # Angular source code
??? misc/                      # Documentation
```

## GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) automatically:

1. ? Triggers on push to `main` branch
2. ? Installs Node.js and dependencies
3. ? Builds Angular app with production config
4. ? Copies `.nojekyll` to docs folder
5. ? Uploads artifact to GitHub Pages
6. ? Deploys to GitHub Pages

**Workflow Status**: Check at `https://github.com/rahul-a-bangera/Portfolio/actions`

## Troubleshooting

### Issue: 404 Page Not Found

**Solution 1**: Check Base Href
```bash
# Verify baseHref in angular.json is set to /Portfolio/
```

**Solution 2**: Verify GitHub Pages Settings
```
Settings ? Pages ? Source should be correct
```

**Solution 3**: Clear Browser Cache
```
Hard refresh: Ctrl + Shift + R (Windows/Linux)
             Cmd + Shift + R (Mac)
```

### Issue: Assets Not Loading (Images, PDF)

**Solution**: Check file paths in code
```typescript
// Correct paths (relative to baseHref)
'assets/profile.jpg'
'assets/Rahul-A-Resume.pdf'
```

### Issue: Routing Issues (Page Refresh 404)

**Solution**: Create `404.html` redirect
```bash
# Copy index.html to 404.html in docs folder
cp docs/index.html docs/404.html
```

### Issue: Build Fails

**Solution 1**: Clear node_modules and reinstall
```bash
cd PortfolioFrontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Solution 2**: Check Node/npm versions
```bash
node --version  # Should be 20.x or higher
npm --version   # Should be 9.x or higher
```

### Issue: CSS Not Applied

**Solution**: Check styles.css is included in angular.json
```json
"styles": ["src/styles.css"]
```

## Custom Domain (Optional)

### Using Custom Domain

1. **Add CNAME Record in DNS**
   ```
   Type: CNAME
   Name: www (or @)
   Value: rahul-a-bangera.github.io
   ```

2. **Create CNAME File**
   ```bash
   echo "yourdomain.com" > docs/CNAME
   git add docs/CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. **Configure in GitHub**
   ```
   Settings ? Pages ? Custom domain
   Enter: yourdomain.com
   Save
   ```

## Performance Optimization

### Already Configured ?

- ? Production mode compilation
- ? Code minification
- ? CSS optimization
- ? Asset optimization
- ? Output hashing for cache busting

### Bundle Size

After production build:
```
Initial chunk files:
- main.*.js      ~433 KB ? ~105 KB (gzipped)
- styles.*.css   ~93 KB  ? ~8 KB (gzipped)
- polyfills.*.js ~35 KB  ? ~11 KB (gzipped)

Total: ~562 KB ? ~126 KB (gzipped)
```

## Maintenance

### Updating the Site

1. Make changes to code
2. Commit and push to main
3. GitHub Actions automatically rebuilds and deploys
4. Wait 2-3 minutes
5. Refresh your site

### Manual Update
```bash
cd PortfolioFrontend
npm run build
cd ..
git add docs
git commit -m "Update site"
git push origin main
```

## Security Considerations

### Environment Variables
- No sensitive data in code ?
- All URLs are public ?
- Resume PDF is publicly accessible ?

### Content Security
- All assets served over HTTPS ?
- External links open in new tabs ?
- LinkedIn URL uses rel="noopener noreferrer" ?

## Monitoring

### Check Deployment Status
```
Actions Tab: https://github.com/rahul-a-bangera/Portfolio/actions
Pages: https://github.com/rahul-a-bangera/Portfolio/settings/pages
```

### Analytics (Optional)
Add Google Analytics in `src/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review this documentation
3. Check Angular build errors in terminal

---

**Last Updated**: December 2024
**Site URL**: https://rahul-a-bangera.github.io/Portfolio/
**Status**: ? Ready for Deployment

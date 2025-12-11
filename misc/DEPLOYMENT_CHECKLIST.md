# GitHub Pages Deployment Checklist

## ? Pre-Deployment Checklist

### Configuration Files
- [x] `angular.json` updated with `baseHref: "/Portfolio/"`
- [x] `angular.json` output path set to `../docs`
- [x] `.nojekyll` file created in root
- [x] `.nojekyll` file copied to docs folder
- [x] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [x] `.gitignore` updated to track docs folder

### Build Verification
- [x] Production build successful
- [x] Assets copied to docs folder
- [x] Resume PDF included in docs/assets
- [x] Profile image included in docs/assets

### Code Quality
- [x] All components use terminal theme consistently
- [x] Contact popup functional
- [x] CV download working
- [x] LinkedIn link added
- [x] Navigation fixed (no hidden headings)

## ?? Deployment Steps

### Step 1: Commit All Changes
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
```

### Step 2: Push to GitHub
```bash
git push origin main
```

### Step 3: Configure GitHub Pages
1. Go to: https://github.com/rahul-a-bangera/Portfolio/settings/pages
2. **Source**: Select `GitHub Actions`
3. Save

### Step 4: Monitor Deployment
1. Go to: https://github.com/rahul-a-bangera/Portfolio/actions
2. Wait for workflow to complete (~2-3 minutes)
3. Check for green checkmark

### Step 5: Verify Site
1. Visit: https://rahul-a-bangera.github.io/Portfolio/
2. Test all navigation links
3. Test CV download
4. Test contact popup
5. Verify LinkedIn link

## ?? Post-Deployment Verification

### Navigation Tests
- [ ] HOME button works
- [ ] RESUME button works (heading visible)
- [ ] BLOG button works
- [ ] CONTACT button works

### Functionality Tests
- [ ] Download CV button downloads PDF
- [ ] LinkedIn link opens in new tab
- [ ] Email/Mobile popup opens
- [ ] Copy buttons work in popup
- [ ] Popup closes on overlay click

### Visual Tests
- [ ] Terminal theme consistent across all pages
- [ ] Animations working (grid, particles)
- [ ] Profile image loads
- [ ] All icons display correctly
- [ ] Responsive on mobile

### Asset Tests
- [ ] Profile picture loads
- [ ] Resume PDF downloads
- [ ] All CSS styles applied
- [ ] No 404 errors in console

## ?? Troubleshooting

### If Site Doesn't Load
1. Check GitHub Actions logs for errors
2. Verify GitHub Pages is enabled in settings
3. Wait 5-10 minutes (DNS propagation)
4. Clear browser cache (Ctrl + Shift + R)

### If Assets Don't Load
1. Check browser console for 404 errors
2. Verify baseHref is `/Portfolio/` (with slashes)
3. Rebuild with: `npm run build -- --configuration production`
4. Recommit and push

### If Routing Doesn't Work
1. Create 404.html: `cp docs/index.html docs/404.html`
2. Commit and push

## ?? Expected Results

### Build Output
```
Initial total: ~574 KB ? ~127 KB (gzipped)
Build time: ~15-20 seconds
```

### Deployment Time
```
GitHub Actions: ~2-3 minutes
Total: ~3-5 minutes from push to live
```

### Site URL
```
Production: https://rahul-a-bangera.github.io/Portfolio/
```

## ?? Success Criteria

? Site loads at GitHub Pages URL
? All pages accessible via navigation
? Terminal theme visible throughout
? CV downloads successfully
? Contact popup works
? No console errors
? Mobile responsive
? All assets load

## ?? Notes

- First deployment may take 5-10 minutes
- Subsequent deployments take 2-3 minutes
- GitHub Actions runs automatically on push to main
- No manual build/deploy steps needed after setup

---

**Status**: Ready for Deployment ?
**Last Updated**: December 2024

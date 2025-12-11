# Custom Domain Setup Guide (rahul-a.in)

## Overview
This guide covers the complete setup for using your custom domain `rahul-a.in` with GitHub Pages.

## Prerequisites
- ? Domain registered: `rahul-a.in` (GoDaddy)
- ? GitHub repository: `rahul-a-bangera/Portfolio`
- ? CNAME already configured in GoDaddy

## DNS Configuration (Already Done ?)

### Your Current GoDaddy DNS Settings:
```
Type: CNAME
Name: www (or @)
Value: rahul-a-bangera.github.io
TTL: 600 (or default)
```

### Recommended DNS Setup:

#### For Root Domain (rahul-a.in):
```
Type: A Record
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 600
```

#### For WWW Subdomain (www.rahul-a.in):
```
Type: CNAME
Name: www
Value: rahul-a-bangera.github.io
TTL: 600
```

**Note**: If you already have CNAME for root (@), you may need to change it to A records as shown above.

## GitHub Pages Configuration

### 1. CNAME File
- ? Created: `PortfolioFrontend/src/CNAME`
- ? Contains: `rahul-a.in`
- ? Will be copied to `docs/CNAME` during build

### 2. Base Href
- ? Changed from `/Portfolio/` to `/`
- ? Updated in `angular.json`
- ? Updated in GitHub Actions workflow

### 3. Build Configuration
- ? Output path: `../docs`
- ? CNAME included in assets
- ? Production optimized

## Deployment Steps

### Step 1: Build and Deploy

```bash
# Navigate to frontend
cd PortfolioFrontend

# Build for production
npm run build -- --configuration production

# Verify CNAME file exists
ls ../docs/CNAME

# Commit and push
cd ..
git add .
git commit -m "Setup custom domain rahul-a.in"
git push origin main
```

### Step 2: Configure GitHub Pages

1. **Go to Repository Settings**
   ```
   https://github.com/rahul-a-bangera/Portfolio/settings/pages
   ```

2. **Set Source**
   - Source: `GitHub Actions` (recommended)
   - OR: Deploy from branch ? `main` ? `/docs`

3. **Set Custom Domain**
   - Enter: `rahul-a.in`
   - Check "Enforce HTTPS" (wait for certificate)
   - Click **Save**

### Step 3: Wait for DNS Propagation

```bash
# Check DNS propagation (may take 5 minutes to 48 hours)
nslookup rahul-a.in
nslookup www.rahul-a.in

# Or use online tools:
# https://www.whatsmydns.net/
```

### Step 4: Verify HTTPS Certificate

GitHub Pages will automatically provision an SSL certificate:
- Takes 5-10 minutes after DNS is properly configured
- Check at: Repository Settings ? Pages
- Status will show: "Your site is published at https://rahul-a.in"

## URLs After Setup

### Your Site Will Be Accessible At:

- **Primary**: `https://rahul-a.in` ?
- **WWW**: `https://www.rahul-a.in` (if CNAME configured)
- **GitHub**: `https://rahul-a-bangera.github.io/Portfolio/` (will redirect)

## Verification Checklist

### DNS Verification
```bash
# Check A records (for root domain)
dig rahul-a.in +short
# Should return GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME (for www)
dig www.rahul-a.in +short
# Should return: rahul-a-bangera.github.io
```

### Site Verification
- [ ] Site loads at `https://rahul-a.in`
- [ ] HTTPS certificate is valid (green padlock)
- [ ] All pages accessible
- [ ] Assets load correctly (images, CSS, JS)
- [ ] Resume PDF downloads
- [ ] Contact popup works
- [ ] LinkedIn link works

## Troubleshooting

### Issue: Domain Not Resolving

**Check DNS Settings in GoDaddy:**
1. Login to GoDaddy
2. Go to My Products ? Domain ? DNS
3. Verify A records point to GitHub IPs
4. Verify CNAME points to `rahul-a-bangera.github.io`

**Wait for Propagation:**
```bash
# DNS propagation can take up to 48 hours
# Usually completes in 5-30 minutes
```

### Issue: "Domain Not Verified" in GitHub

**Solution:**
1. Go to Repository Settings ? Pages
2. Remove custom domain
3. Save
4. Wait 1 minute
5. Re-add custom domain: `rahul-a.in`
6. Save
7. Wait for DNS check to complete

### Issue: HTTPS Certificate Not Provisioning

**Solution:**
1. Verify DNS is correctly configured
2. Remove and re-add custom domain in GitHub Pages
3. Wait 10-15 minutes
4. If still fails, check DNS propagation with online tools

### Issue: Site Loads but Shows 404

**Check:**
1. CNAME file exists in docs folder: `docs/CNAME`
2. CNAME file contains: `rahul-a.in` (exactly)
3. No trailing spaces or newlines in CNAME file
4. Rebuild and redeploy

### Issue: Assets Not Loading (404 on CSS/JS/Images)

**Solution:**
1. Verify baseHref is `/` not `/Portfolio/`
2. Check `angular.json` baseHref setting
3. Rebuild: `npm run build -- --configuration production --base-href /`
4. Commit and push

## GoDaddy DNS Configuration Details

### Current Setup to Verify:

1. **Login to GoDaddy**
2. **Go to**: My Products ? Domains ? rahul-a.in ? DNS
3. **Verify these records exist:**

```
Type  | Name | Value                        | TTL
------|------|------------------------------|-----
A     | @    | 185.199.108.153             | 600
A     | @    | 185.199.109.153             | 600
A     | @    | 185.199.110.153             | 600
A     | @    | 185.199.111.153             | 600
CNAME | www  | rahul-a-bangera.github.io.  | 600
```

**Important**: 
- A records for `@` (root domain)
- CNAME for `www` subdomain
- Remove any conflicting A or CNAME records

## Testing Commands

### Test DNS Resolution
```bash
# Windows
nslookup rahul-a.in
nslookup www.rahul-a.in

# Linux/Mac
dig rahul-a.in
dig www.rahul-a.in
```

### Test HTTPS Certificate
```bash
# Open in browser and check certificate
https://rahul-a.in

# Or use curl
curl -I https://rahul-a.in
```

### Test Site Accessibility
```bash
# Check if site responds
curl -L https://rahul-a.in

# Check specific pages
curl -L https://rahul-a.in/
```

## Build Commands for Custom Domain

### Production Build
```bash
cd PortfolioFrontend
npm run build -- --configuration production --base-href /
```

### Verify Build Output
```bash
# Check CNAME file
cat ../docs/CNAME
# Should output: rahul-a.in

# Check index.html base href
grep -n "base href" ../docs/index.html
# Should show: <base href="/">
```

## Timeline

### Expected Timeline:
```
1. Build & Deploy: 2-3 minutes
2. GitHub Pages Deploy: 2-3 minutes
3. DNS Propagation: 5 minutes - 48 hours (usually 15-30 minutes)
4. HTTPS Certificate: 5-10 minutes after DNS resolves
Total: 15-60 minutes typically
```

## Benefits of Custom Domain

? **Professional**: `rahul-a.in` vs `rahul-a-bangera.github.io`
? **Branding**: Your own domain name
? **SEO**: Better for search engine optimization
? **Portable**: Can move hosting without changing domain
? **HTTPS**: Free SSL certificate from GitHub Pages
? **Email**: Can setup custom email (e.g., contact@rahul-a.in)

## Maintenance

### Updating Your Site
```bash
# Make changes to code
# Commit and push
git add .
git commit -m "Update portfolio content"
git push origin main

# GitHub Actions will automatically:
# 1. Build the site
# 2. Deploy to GitHub Pages
# 3. Site live at rahul-a.in in 2-3 minutes
```

### Renewing Domain
- GoDaddy domain renewal: Annually (~$15-20/year)
- GitHub Pages: Always free
- SSL Certificate: Auto-renewed by GitHub

## Security

### HTTPS Enforcement
- ? Automatic HTTPS redirect
- ? Free SSL certificate
- ? Certificate auto-renewed
- ? TLS 1.2+ supported

### Best Practices
- Keep GitHub repository public for free hosting
- Don't commit sensitive data
- Use environment variables for any API keys (if needed)

## Support Resources

- **GitHub Pages**: https://docs.github.com/en/pages
- **Custom Domain Guide**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GoDaddy Support**: https://www.godaddy.com/help
- **DNS Propagation Check**: https://www.whatsmydns.net/

## Next Steps

1. ? Verify DNS settings in GoDaddy match the configuration above
2. ? Build and deploy the site
3. ? Configure custom domain in GitHub Pages settings
4. ? Wait for DNS propagation (15-30 minutes)
5. ? Wait for HTTPS certificate (5-10 minutes)
6. ? Test site at https://rahul-a.in

---

**Your Custom Domain**: https://rahul-a.in
**Status**: Ready for Deployment ?
**Last Updated**: December 2024

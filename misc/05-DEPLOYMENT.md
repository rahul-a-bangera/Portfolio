# Deployment Guide

**Project**: Rahul A - Portfolio Website  
**Version**: 1.0.0  
**Last Updated**: December 11, 2024

---

## Quick Deploy

```bash
# Commit changes
git add .
git commit -m "Update portfolio"
git push origin main

# GitHub Actions automatically builds and deploys
# Wait 2-3 minutes, then visit: https://rahul-a.in
```

---

## GitHub Actions Workflow

### Automatic Deployment

Every push to `main` branch triggers automatic deployment.

**Monitor**: https://github.com/rahul-a-bangera/Portfolio/actions

---

## Custom Domain

- **Domain**: rahul-a.in
- **CNAME Files**: `PortfolioFrontend/src/CNAME` and `docs/CNAME`
- **SSL**: Automatic via GitHub Pages

---

## Deployment Checklist

### Pre-Deployment
- [ ] Build successful locally
- [ ] No TypeScript/CSS errors
- [ ] Tested responsive design

### Post-Deployment
- [ ] Site loads at rahul-a.in
- [ ] All features working
- [ ] Mobile tested

---

**Deployment Time**: 2-3 minutes

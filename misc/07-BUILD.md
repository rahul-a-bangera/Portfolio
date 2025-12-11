# Build Configuration

**Project**: Rahul A - Portfolio Website  
**Version**: 1.0.0  
**Last Updated**: December 11, 2024

---

## Build Command

```bash
cd PortfolioFrontend
npm run build
```

**Output**: `docs/` folder (GitHub Pages ready)

---

## Build Configuration

### angular.json

```json
{
  "outputPath": "../docs",
  "baseHref": "/",
  "optimization": true,
  "outputHashing": "all",
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
```

### CSS Budget

- **Component CSS Warning**: 8 KB
- **Component CSS Error**: 12 KB
- **Total Bundle Error**: 5 MB

**Reason for 12 KB limit**: Comprehensive responsive design requires additional CSS for 5 breakpoints.

---

## Build Output

```
docs/
??? assets/
?   ??? profile.jpg
?   ??? Rahul-A-Resume.pdf
??? CNAME
??? index.html
??? main.[hash].js           (~108 KB gzipped)
??? styles.[hash].css        (~9 KB gzipped)
??? polyfills.[hash].js      (~11 KB gzipped)
??? runtime.[hash].js        (~0.5 KB gzipped)

Total: ~129 KB (gzipped)
```

---

## Build Time

- **Local Build**: 12-15 seconds
- **GitHub Actions Build**: 15-20 seconds

---

## Troubleshooting

### CSS Budget Exceeded

If component CSS exceeds 12 KB:
1. Review if styles are necessary
2. Consider splitting into multiple components
3. Adjust budget in `angular.json` if justified

### Build Fails

- Check `angular.json` syntax
- Verify all imports are correct
- Run `npm install` to update dependencies
- Check for TypeScript errors

---

**Last Updated**: December 11, 2024

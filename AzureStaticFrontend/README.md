# Azure Static Frontend - API Documentation Page

This folder contains a **minimal HTML page** that serves as API documentation for the Azure Static Web App deployment.

## Purpose

**This is NOT the main portfolio frontend.** The full Angular application is hosted on GitHub Pages at https://rahul-a.in.

This lightweight page provides:
- ? API endpoint documentation
- ? Interactive API testing
- ? Link to the full portfolio website
- ? Minimal deployment footprint

## Why a Separate HTML Page?

Azure Static Web Apps is used **only for hosting the serverless API**, not the full frontend. This approach:

1. **Reduces Build Time** - No need to build the entire Angular app twice
2. **Reduces Deployment Size** - Only a single HTML file instead of full Angular bundle
3. **Faster Deployments** - No compilation needed
4. **Clear Separation** - API backend is separate from frontend presentation
5. **API Documentation** - Provides a Swagger-like interface for developers

## Deployment

This page is automatically deployed to Azure Static Web Apps via GitHub Actions:
- **Workflow**: `.github/workflows/azure-static-web-apps-green-grass-04910ca00.yml`
- **Deployed URL**: https://green-grass-04910ca00.6.azurestaticapps.net
- **API Base URL**: https://green-grass-04910ca00.6.azurestaticapps.net/api

## Files

- `index.html` - Single-page API documentation with interactive testing

## Comparison

| Aspect | GitHub Pages | Azure Static Web Apps |
|--------|--------------|----------------------|
| **Frontend** | Full Angular App | Minimal HTML Page |
| **Build Process** | `ng build --configuration github-pages` | None (static HTML) |
| **Purpose** | Public portfolio website | API documentation & backend |
| **URL** | https://rahul-a.in | https://[app].azurestaticapps.net |
| **Deploy Time** | ~2-3 minutes | ~30 seconds |

## Local Testing

To test this page locally:

```bash
# Navigate to this folder
cd AzureStaticFrontend

# Open in browser (use any simple HTTP server)
python -m http.server 8080
# OR
npx http-server -p 8080
```

Then open: http://localhost:8080

**Note**: API calls will fail locally unless you update the endpoints to point to your local backend.

## Updating

Simply edit `index.html` and commit:

```bash
git add AzureStaticFrontend/index.html
git commit -m "docs: Update Azure API documentation page"
git push origin main
```

The change will be automatically deployed to Azure within ~1 minute.

---

**Last Updated**: January 2026  
**Maintained by**: Rahul A

# Portfolio API - Azure Functions

Contact information API for the portfolio website.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Azure Functions Core Tools 4.x

### Install Azure Functions Core Tools

```powershell
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

Restart your terminal after installation.

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build TypeScript**:
   ```bash
   npm run build
   ```

3. **Start local server**:
   ```bash
   func start
   ```

API runs at: `http://localhost:7071`

## Endpoints

### GET /api/contact
Returns contact information configured in environment variables.

**Response**:
```json
{
  "email": "rahul.bangera.999@gmail.com",
  "phone": "+91 9663 885 365",
  "socialLinks": {
    "LinkedIn": "https://www.linkedin.com/in/rahul-bangera/",
    "GitHub": "https://github.com/rahul-a-bangera",
    "Twitter": "https://twitter.com/your-handle"
  }
}
```

## Configuration

Environment variables are stored in `local.settings.json` (for local dev) and Azure Portal (for production).

### Required Variables
- `CONTACT_EMAIL` - Your email address
- `CONTACT_PHONE` - Your phone number
- `CONTACT_LINKEDIN` - LinkedIn profile URL
- `CONTACT_GITHUB` - GitHub profile URL
- `CONTACT_TWITTER` - Twitter profile URL

## Testing

**PowerShell**:
```powershell
Invoke-RestMethod -Uri http://localhost:7071/api/contact
```

**curl**:
```bash
curl http://localhost:7071/api/contact
```

**Browser**:
Open `http://localhost:7071/api/contact`

## Deployment

Deployment happens automatically via GitHub Actions when you push to `main` branch.

See `misc/08-AZURE-SETUP.md` for complete Azure setup instructions.

## Project Structure

```
PortfolioAPI/
??? contact/
?   ??? index.ts          # Contact API handler
??? host.json             # Azure Functions config
??? package.json          # Dependencies
??? tsconfig.json         # TypeScript config
??? local.settings.json   # Local environment variables (not in git)
??? .gitignore
```

## Troubleshooting

### "func: command not found"
Install Azure Functions Core Tools (see Prerequisites above).

### Contact info not loading in frontend
1. Make sure API is running (`func start`)
2. Check `PortfolioFrontend/src/environments/environment.ts` has `apiUrl: 'http://localhost:7071'`
3. Verify `local.settings.json` has correct values

### Build errors
```bash
npm install          # Install dependencies
npm run build        # Build TypeScript
```

### Port 7071 already in use
Change port in `local.settings.json`:
```json
"Host": {
  "LocalHttpPort": 7072
}
```

Also update frontend `environment.ts` to match.

---

For complete documentation, see: `../misc/08-AZURE-SETUP.md`

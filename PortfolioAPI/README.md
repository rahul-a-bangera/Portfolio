# Portfolio API - Azure Functions

Serverless API for the portfolio website providing contact, resume, and blog endpoints.

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
    "Twitter": "https://x.com/im_rahulbangera"
  }
}
```

### GET /api/resume
Returns complete resume data including experience, education, skills, and projects.

**Response**:
```json
{
  "personalInfo": {
    "name": "Rahul A Bangera",
    "title": "Full Stack Developer | Cloud Solutions Architect",
    "email": "rahul.bangera.999@gmail.com",
    "phone": "+91 9663 885 365",
    "location": "Bangalore, India",
    "linkedin": "https://www.linkedin.com/in/rahul-bangera/",
    "github": "https://github.com/rahul-a-bangera",
    "website": "https://rahul-a.in"
  },
  "summary": "...",
  "skills": { ... },
  "experience": [ ... ],
  "education": [ ... ],
  "certifications": [ ... ],
  "projects": [ ... ]
}
```

### GET /api/blog
Returns all blog posts.

**Response**:
```json
[
  {
    "id": 1,
    "slug": "getting-started-angular-19",
    "title": "Getting Started with Angular 19",
    "description": "...",
    "author": "Rahul A Bangera",
    "publishDate": "2024-01-15",
    "tags": ["Angular", "TypeScript"],
    "readTime": "8 min read"
  }
]
```

### GET /api/blog/{slug}
Returns a single blog post by slug.

**Example**: `GET /api/blog/getting-started-angular-19`

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
Invoke-RestMethod -Uri http://localhost:7071/api/resume
Invoke-RestMethod -Uri http://localhost:7071/api/blog
Invoke-RestMethod -Uri http://localhost:7071/api/blog/getting-started-angular-19
```

**curl**:
```bash
curl http://localhost:7071/api/contact
curl http://localhost:7071/api/resume
curl http://localhost:7071/api/blog
```

**Browser**:
- `http://localhost:7071/api/contact`
- `http://localhost:7071/api/resume`
- `http://localhost:7071/api/blog`

## Deployment

Deployment happens automatically via GitHub Actions when you push to `main` branch.

See `misc/08-AZURE-SETUP.md` for complete Azure setup instructions.

## Project Structure

```
PortfolioAPI/
??? contact/
?   ??? index.ts          # Contact API handler
??? resume/
?   ??? index.ts          # Resume API handler
??? blog/
?   ??? index.ts          # Blog API handler
??? host.json             # Azure Functions config
??? package.json          # Dependencies
??? tsconfig.json         # TypeScript config
??? local.settings.json   # Local environment variables (not in git)
??? .gitignore
```

## Troubleshooting

### "func: command not found"
Install Azure Functions Core Tools (see Prerequisites above).

### 404 errors on /api/resume or /api/blog
1. Make sure you've built the TypeScript: `npm run build`
2. Restart the function: `func start`
3. Check that the `resume/` and `blog/` folders exist

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

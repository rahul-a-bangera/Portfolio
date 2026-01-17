# Personal Setup Template

This file contains placeholders you need to replace with your personal information to customize this portfolio.

## Step 1: Update Personal Data Files

### Create Data Files in `workers/data/`

These files are gitignored and should contain your REAL information.

#### `workers/data/profile.json`
```json
{
  "name": "YOUR_FULL_NAME",
  "specialistContent": "YOUR_TITLE | YOUR_SPECIALIZATION"
}
```

#### `workers/data/contact.json`
```json
{
  "email": "YOUR_EMAIL@EXAMPLE.COM",
  "phone": "YOUR_PHONE_NUMBER",
  "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN_USERNAME",
  "github": "https://github.com/YOUR_GITHUB_USERNAME",
  "twitter": "https://twitter.com/YOUR_TWITTER_HANDLE",
  "location": "YOUR_CITY, YOUR_COUNTRY",
  "website": "https://YOUR_WEBSITE.COM"
}
```

#### `workers/data/resume.json`
```json
{
  "personalInfo": {
    "name": "YOUR_FULL_NAME",
    "title": "YOUR_TITLE",
    "email": "YOUR_EMAIL@EXAMPLE.COM",
    "phone": "YOUR_PHONE_NUMBER",
    "location": "YOUR_CITY, YOUR_COUNTRY"
  },
  "summary": "YOUR_PROFESSIONAL_SUMMARY",
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],
  "experience": [
    {
      "company": "COMPANY_NAME",
      "position": "YOUR_POSITION",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "description": "Your responsibilities and achievements"
    }
  ],
  "education": [
    {
      "institution": "UNIVERSITY_NAME",
      "degree": "DEGREE_NAME",
      "field": "FIELD_OF_STUDY",
      "graduationDate": "YYYY"
    }
  ]
}
```

---

##  Step 2: Update Configuration Files

### `wrangler.toml`

Replace the Cloudflare Workers name and KV namespace:

```toml
name = "YOUR-PORTFOLIO-API"  # Change from "portfolio-api"

[[kv_namespaces]]
binding = "PORTFOLIO_DATA"
id = "YOUR_KV_NAMESPACE_ID"  # Get this from Cloudflare dashboard
preview_id = "YOUR_PREVIEW_KV_NAMESPACE_ID"
```

### `PortfolioFrontend/src/environments/environment.prod.ts`

Update the API URL:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-API.workers.dev',  // Your Workers URL
  useLocalData: false
};
```

### `PortfolioFrontend/src/CNAME`

Update with your custom domain:

```
YOUR-DOMAIN.COM
```

### `docs/CNAME`

Same as above:

```
YOUR-DOMAIN.COM
```

---

##  Step 3: Update GitHub Repository Settings

### Repository Name
1. Go to Settings ? General
2. Change repository name to: `YOUR-USERNAME/Portfolio` or your preferred name

### GitHub Pages
1. Go to Settings ? Pages
2. Source: Deploy from a branch
3. Branch: `main` ? `/docs` folder
4. Custom domain: `YOUR-DOMAIN.COM`

### GitHub Actions Secrets (if using private repo)
1. Go to Settings ? Secrets and variables ? Actions
2. Add repository secrets if needed for deployment

---

##  Step 4: Update README.md

Replace all placeholder URLs with your actual information:

- `https://yourwebsite.com` ? Your actual website URL
- `https://your-api.workers.dev` ? Your Workers API URL
- `https://github.com/yourusername` ? Your GitHub profile
- `https://linkedin.com/in/yourprofile` ? Your LinkedIn profile
- `your.email@example.com` ? Your email address
- `Your Full Name` ? Your actual name

---

##  Step 5: Deploy

### Deploy Cloudflare Workers

```bash
cd workers

# Login to Cloudflare
npx wrangler login

# Create KV namespace
npx wrangler kv:namespace create "PORTFOLIO_DATA"
# Copy the namespace ID to wrangler.toml

# Upload your data
node scripts/upload-to-kv.js

# Deploy
npm run deploy
```

### Deploy Frontend

```bash
# Build the frontend
cd PortfolioFrontend
npm run build

# Commit and push
git add docs/
git commit -m "Deploy: Update portfolio"
git push origin main
```

---

## ? Step 6: Verify Setup

### Test API Endpoints

```bash
# Replace YOUR-API.workers.dev with your actual URL
curl https://YOUR-API.workers.dev/profile
curl https://YOUR-API.workers.dev/contact
curl https://YOUR-API.workers.dev/resume
```

### Test Live Site

Visit `https://YOUR-DOMAIN.COM` and verify:
- [ ] Your name appears on the home page
- [ ] Contact information is correct
- [ ] Resume data loads properly
- [ ] All links work correctly
- [ ] No placeholder text visible

---

##  Security Checklist

Before making repository public:

- [ ] Removed all personal data from source code
- [ ] Updated all template files to use placeholders
- [ ] Real data is only in `workers/data/` (gitignored)
- [ ] Uploaded real data to Workers KV
- [ ] Tested that API returns your data
- [ ] Updated README.md with generic examples
- [ ] No hardcoded emails, phones, or names in code
- [ ] Verified `.gitignore` includes `workers/data/`

---

##  Additional Resources

- **Data Management**: See `workers/DATA-MANAGEMENT.md`
- **API Documentation**: See `workers/README.md`
- **Technical Docs**: See `misc/` folder
- **Scripts Guide**: See `scripts/README.md`

---

##  Need Help?

If you encounter issues:

1. Check `misc/04-BUILD-AND-TROUBLESHOOTING.md`
2. Verify all URLs are updated
3. Ensure KV data is uploaded
4. Check browser console for errors
5. Review GitHub Actions logs

---

**Last Updated**: December 2024  
**Template Version**: 1.0.0

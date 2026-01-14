# Azure Static Web Apps Setup Guide

**Last Updated**: January 2026  
**Azure Region**: East Asia  
**Angular Version**: 19.0.0

---

## ?? IMPORTANT: API-Only Deployment

**This Azure Static Web App is configured to host ONLY the API endpoints, not the full frontend.**

- **Full Portfolio Website**: https://rahul-a.in (hosted on GitHub Pages)
- **API Documentation Page**: https://gentle-moss-0d321ce00.2.azurestaticapps.net (minimal HTML page)
- **API Endpoints**: https://gentle-moss-0d321ce00.2.azurestaticapps.net/api/*

The Azure deployment uses a lightweight API documentation page (`AzureStaticFrontend/index.html`) instead of building the entire Angular application. This reduces build time, deployment size, and keeps Azure focused on its purpose: hosting serverless API functions.

---

## ?? TROUBLESHOOTING: Build Pipeline Failing

### Error: "App Directory Location is invalid"

**Error Message:**
```
App Directory Location: './PortfolioFrontend ' is invalid.
Could not detect this directory.
```

**Root Cause:** Trailing space or incorrect path format in Azure Portal configuration.

**Fix:**
1. **Go to Azure Portal** ? Your Static Web App ? **Configuration** ? **Application settings**
2. Check the **Build configuration** values
3. Make sure they are EXACTLY:

| Field | Correct Value | ? Wrong Values |
|-------|---------------|----------------|
| **App location** | `PortfolioFrontend` | `./PortfolioFrontend`<br>`PortfolioFrontend `<br>`./PortfolioFrontend ` |
| **API location** | `PortfolioAPI` | `./PortfolioAPI`<br>`PortfolioAPI ` |
| **Output location** | Leave **EMPTY** or blank | `docs`<br>`dist`<br>` ` (space) |

**Key Points:**
- ? NO leading `./`
- ? NO trailing spaces
- ? NO quotes around the path
- ? Just the folder name: `PortfolioFrontend`

### How to Fix in Azure Portal

**Option 1: Via Configuration (Recommended)**

1. Azure Portal ? Your Static Web App
2. **Settings** ? **Configuration**
3. Under **Build Presets**, you'll see the build configuration
4. If you can't edit it there, you need to delete and recreate the resource

**Option 2: Delete and Recreate (If Configuration Can't Be Edited)**

If the configuration is locked, you'll need to:
1. Delete the current Static Web App resource
2. Recreate it with correct values (see setup steps below)
3. Update the GitHub Secret with the new deployment token

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Quick Start](#local-development-quick-start)
4. [Azure Static Web App Setup](#azure-static-web-app-setup)
5. [GitHub Integration](#github-integration)
6. [Environment Variables](#environment-variables)
7. [API Configuration](#api-configuration)
8. [Local Development (Detailed)](#local-development-detailed)
9. [Deployment Architecture](#deployment-architecture)
10. [Troubleshooting](#troubleshooting)
11. [Verification](#verification)

---

## Overview

This project uses **Azure Static Web Apps** to host a serverless API alongside the static Angular frontend. The architecture provides:

- ? **Serverless Azure Functions** - Contact API endpoint
- ? **Global CDN** - Fast content delivery
- ? **Auto-scaling** - Handles traffic spikes
- ? **HTTPS** - Built-in SSL certificates
- ? **CI/CD** - GitHub Actions integration
- ? **Free tier** - No cost for small projects

### Deployment Targets

1. **GitHub Pages** (`https://rahul-a.in`)
   - Static frontend only
   - Calls Azure API for contact info
   - Primary production deployment

2. **Azure Static Web Apps** (`https://[app].azurestaticapps.net`)
   - Full-stack deployment (frontend + API)
   - Backup/testing environment
   - Provides serverless API endpoint

---

## Prerequisites

Before starting, ensure you have:

- [x] Azure account (free tier works)
- [x] GitHub account with repository access
- [x] Node.js 18+ installed
- [x] .NET SDK 8.0+ installed (for local backend)
- [x] Azure Functions Core Tools 4.x (optional, for Azure Functions)
- [x] Git configured locally

---

## Local Development Quick Start

### ?? Fastest Way to Get Started

For local development, use the **.NET Backend** (simpler, no extra tools needed):

**Terminal 1 - Start Backend:**
```powershell
cd PortfolioBackend
dotnet run
```

Wait for: `Now listening on: http://localhost:5091`  
**? Keep this terminal OPEN!**

**Terminal 2 - Start Frontend:**
```powershell
cd PortfolioFrontend
npm start
```

Open: http://localhost:4200

**Test API:**
```powershell
Invoke-RestMethod -Uri http://localhost:5091/api/contact
```

### ?? Configuration Files

**Backend Configuration** - `PortfolioBackend/appsettings.local.json`:
```json
{
  "ContactInfo": {
    "Email": "rahul.bangera.999@gmail.com",
    "Phone": "+91 9663 885 365",
    "LinkedIn": "https://www.linkedin.com/in/rahul-bangera/",
    "GitHub": "https://github.com/rahul-a-bangera",
    "Twitter": "https://x.com/im_rahulbangera"
  }
}
```

**Frontend Configuration** - `PortfolioFrontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5091'  // .NET Backend
};
```

### ?? Test Scripts

Created helper scripts in root directory:

- **`test-api.ps1`** - Test if API returns data
- **`start-backend.ps1`** - Start .NET backend only
- **`start-dev.ps1`** - Instructions to start both

**Run test:**
```powershell
.\test-api.ps1
```

### ? Troubleshooting Quick Fix

**If contact info is empty:**

1. **Stop backend** (Ctrl+C in backend terminal)
2. **Verify file exists:** `PortfolioBackend/appsettings.local.json`
3. **Restart backend:** `dotnet run`
4. **Test API:** `.\test-api.ps1`
5. **Refresh frontend:** Ctrl+Shift+R

**Backend not loading config?**

The fix has been applied in `PortfolioBackend/Program.cs`:
```csharp
builder.Configuration.AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true);
```

Just restart the backend for the fix to take effect.

---

## Install Azure Functions Core Tools (Optional)

Only needed if you want to run Azure Functions locally instead of .NET backend.

**Windows (npm)**:
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

**Windows (Chocolatey)**:
```bash
choco install azure-functions-core-tools-4
```

**macOS (Homebrew)**:
```bash
brew tap azure/functions
brew install azure-functions-core-tools@4
```

**Linux**:
```bash
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install azure-functions-core-tools-4
```

---

## Azure Static Web App Setup

### Step 1: Create Azure Static Web App

1. **Go to Azure Portal** ? https://portal.azure.com
2. **Click** "Create a resource"
3. **Search** for "Static Web App"
4. **Click** "Create"

### Step 2: Fill in Configuration

**IMPORTANT: Use these exact values:**

| Field | Value | Notes |
|-------|-------|-------|
| **Subscription** | `a521b829-0995-4c90-8f6d-311166dbc05a` | Your Azure subscription ID |
| **Resource Group** | `portfolio_group` | Create new if doesn't exist |
| **Name** | `portfolio` | Unique name (will be part of URL) |
| **Plan Type** | `Free` | No cost for hobby projects |
| **Region** | `East Asia` | Closest to target audience |
| **Source** | `GitHub` | Connect to repository |
| **Organization** | `rahul-a-bangera` | Your GitHub username |
| **Repository** | `Portfolio` | Repository name |
| **Branch** | `main` | Production branch |

### Step 3: Build Configuration

**?? CRITICAL: Use exact paths (case-sensitive, NO extra spaces or dots)**

| Field | ? Correct Value | ? Wrong Values |
|-------|-----------------|----------------|
| **App location** | `PortfolioFrontend` | `./PortfolioFrontend`<br>`PortfolioFrontend `<br>`portfoliofrontend` |
| **API location** | `PortfolioAPI` | `./PortfolioAPI`<br>`api`<br>`PortfolioAPI ` |
| **Output location** | Leave **EMPTY** or blank | `docs`<br>`dist`<br>` ` |

**How to type it:**
1. Click in the "App location" field
2. Type: `PortfolioFrontend` (exactly, no extra characters)
3. Press Tab to move to next field
4. **IMPORTANT:** Don't copy-paste, type it manually to avoid hidden characters

### Step 4: Review and Create

1. Click **"Review + create"**
2. **VERIFY** the build configuration shows correctly (no `./` prefix, no trailing spaces)
3. If you see `./PortfolioFrontend` or extra spaces, click **"Previous"** and re-type the values
4. Click **"Create"**
5. Wait 2-3 minutes for deployment
6. Azure will automatically create a GitHub Actions workflow

---

## GitHub Integration

### Step 1: Get Deployment Token

1. **Azure Portal** ? Your Static Web App ? **Overview**
2. Click **"Manage deployment token"**
3. **Copy** the token (long string starting with `...`)

### Step 2: Add GitHub Secret

1. **GitHub** ? Your Repository ? **Settings**
2. **Secrets and variables** ? **Actions**
3. Click **"New repository secret"**
4. **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. **Value**: Paste the deployment token
6. Click **"Add secret"**

**? Note**: Previously, Azure auto-generated long names like `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_GRASS_04910CA00`. We've simplified it to just `AZURE_STATIC_WEB_APPS_API_TOKEN` for easier management.

### Step 3: Verify Workflow

1. **GitHub** ? **Actions** tab
2. Look for workflow: **"Build and Deploy"**
3. Check if it runs successfully
4. If failed, check logs for errors

**Common failure:** "App Directory Location is invalid"
- **Fix:** Check Azure Portal configuration (no `./` prefix, no trailing spaces)

---

## Environment Variables

### Azure Portal Configuration

1. **Azure Portal** ? Your Static Web App
2. **Settings** ? **Configuration**
3. **Application settings** tab
4. Click **"+ Add"** for each variable

### Required Environment Variables

Add these **5 environment variables** (exact names):

```plaintext
CONTACT_EMAIL = rahul.bangera.999@gmail.com
CONTACT_PHONE = +91 9663 885 365
CONTACT_LINKEDIN = https://www.linkedin.com/in/rahul-bangera/
CONTACT_GITHUB = https://github.com/rahul-a-bangera
CONTACT_TWITTER = https://x.com/im_rahulbangera
```

### Steps for Each Variable

1. **Name**: `CONTACT_EMAIL`
2. **Value**: `rahul.bangera.999@gmail.com`
3. Click **"OK"**
4. Repeat for all 5 variables
5. **Click "Save"** at the top (important!)
6. Wait 30 seconds for changes to apply

---

## API Configuration

### File Structure

```
PortfolioAPI/
??? contact/
?   ??? index.ts          # Contact API handler
?   ??? index.js          # Compiled JavaScript
??? resume/
?   ??? index.ts          # Resume API handler
?   ??? index.js          # Compiled JavaScript
??? blog/
?   ??? index.ts          # Blog API handler
?   ??? index.js          # Compiled JavaScript
??? host.json             # Azure Functions host config
??? package.json          # Dependencies
??? tsconfig.json         # TypeScript config
??? .gitignore            # Git ignore rules
??? local.settings.json   # Local env vars (not in git)

PortfolioBackend/
??? Controllers/
?   ??? ContactController.cs  # .NET API controller
?   ??? ResumeController.cs   # .NET Resume controller
?   ??? BlogController.cs     # .NET Blog controller
??? Program.cs            # .NET app configuration
??? appsettings.json      # Base settings
??? appsettings.local.json  # Local env vars (not in git)
```

### API Endpoint Details

**Base URL**: `https://[your-app].azurestaticapps.net/api`

**Available Endpoints**:

1. **GET /api/contact** - Contact information
2. **GET /api/resume** - Complete resume data
3. **GET /api/blog** - All blog posts
4. **GET /api/blog/{slug}** - Single blog post by slug

**Method**: `GET`

**Contact Response Format**:
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

**Resume Response Format**:
```json
{
  "personalInfo": { ... },
  "summary": "...",
  "skills": { ... },
  "experience": [ ... ],
  "education": [ ... ],
  "certifications": [ ... ],
  "projects": [ ... ]
}
```

**Blog Response Format**:
```json
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
```

**CORS**: Enabled for all origins (`*`)

### API Features

- ? **Anonymous access** - No authentication required
- ? **CORS enabled** - Works from any domain
- ? **Environment-based** - Config via Azure Portal or appsettings
- ? **TypeScript** - Type-safe code
- ? **Error handling** - Graceful error responses
- ? **Logging** - Azure Application Insights

---

## Local Development (Detailed)

### Option 1: .NET Backend (Recommended for Local Dev)

**Advantages:**
- ? Simpler setup
- ? No extra tools needed
- ? Faster restart
- ? Built-in hot reload

**Setup:**

1. **Create config file:**
```powershell
cd PortfolioBackend
cp appsettings.local.json.example appsettings.local.json
```

2. **Edit `appsettings.local.json`** with your contact info

3. **Start backend:**
```powershell
dotnet run
```

4. **API runs at:** `http://localhost:5091`

**Frontend Configuration:**
```typescript
// PortfolioFrontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5091'
};
```

### Option 2: Azure Functions (For Testing Azure Deployment)

**Prerequisites:**
- Azure Functions Core Tools 4.x installed

**Setup:**

1. **Navigate to API folder:**
```bash
cd PortfolioAPI
```

2. **Install dependencies:**
```bash
npm install
```

3. **Copy settings:**
```bash
cp local.settings.json.example local.settings.json
```

4. **Build TypeScript:**
```bash
npm run build
```

5. **Start function:**
```bash
func start
```

6. **API runs at:** `http://localhost:7071`

**Frontend Configuration:**
```typescript
// PortfolioFrontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:7071'
};
```

### Test Local API

**PowerShell:**
```powershell
# Test all endpoints
Invoke-RestMethod -Uri http://localhost:5091/api/contact  # .NET
Invoke-RestMethod -Uri http://localhost:7071/api/contact  # Azure Functions

Invoke-RestMethod -Uri http://localhost:5091/api/resume   # .NET
Invoke-RestMethod -Uri http://localhost:7071/api/resume   # Azure Functions

Invoke-RestMethod -Uri http://localhost:5091/api/blog     # .NET
Invoke-RestMethod -Uri http://localhost:7071/api/blog     # Azure Functions
```

**curl:**
```bash
curl http://localhost:5091/api/contact  # .NET
curl http://localhost:7071/api/contact  # Azure Functions

curl http://localhost:5091/api/resume   # .NET
curl http://localhost:7071/api/resume   # Azure Functions

curl http://localhost:5091/api/blog     # .NET
curl http://localhost:7071/api/blog     # Azure Functions
```

**Browser:**
- .NET Backend:
  - `http://localhost:5091/api/contact`
  - `http://localhost:5091/api/resume`
  - `http://localhost:5091/api/blog`

- Azure Functions:
  - `http://localhost:7071/api/contact`
  - `http://localhost:7071/api/resume`
  - `http://localhost:7071/api/blog`

### Run Frontend

**Terminal (separate from backend):**
```bash
cd PortfolioFrontend
npm start
```

**Opens at:** `http://localhost:4200`

---

## Deployment Architecture

### Dual Deployment Strategy

```
GitHub Repository (main branch)
         |
         | git push
         |
         v
GitHub Actions Workflow
         |
         +------------------+------------------+
         |                                     |
         v                                     v
   [Job: build]                    [Job: build_and_deploy_job]
         |                                     |
         v                                     v
  Build Angular App                   Deploy Minimal HTML Page
  Output to docs/                     + Build & Deploy API Functions
         |                                     |
         v                                     v
  GitHub Pages Deploy                  Azure Static Web Apps
         |                                     |
         v                                     v
  https://rahul-a.in              https://[app].azurestaticapps.net
  (Full Angular frontend)         (API Docs Page + Serverless API)
         |                                     |
         +------------------+------------------+
                            |
                            v
                     Production Site
            Frontend (GitHub Pages) calls Azure API for data
```

### Why Two Deployments?

1. **GitHub Pages** (`rahul-a.in`):
   - Custom domain
   - Free hosting
   - Fast CDN
   - **Full Angular application**
   - Static files only
   - **Limitation**: No backend/API

2. **Azure Static Web Apps**:
   - **Minimal API documentation page** (not full frontend)
   - Provides serverless API endpoints
   - Auto-scaling backend
   - Environment variables
   - Application insights
   - **GitHub Pages frontend calls these APIs**

### What's Deployed Where?

| Component | GitHub Pages | Azure Static Web Apps |
|-----------|--------------|----------------------|
| **Frontend** | ? Full Angular App | ? Minimal HTML Page Only |
| **API Endpoints** | ? Not Available | ? Serverless Functions |
| **Purpose** | Main portfolio website | API backend + documentation |
| **URL** | https://rahul-a.in | https://[app].azurestaticapps.net |

### Data Flow

```
User visits https://rahul-a.in
         |
         v
Angular app loads (from GitHub Pages)
         |
         v
App calls API: https://[app].azurestaticapps.net/api/contact
         |
         v
Azure Function reads environment variables
         |
         v
Returns contact info JSON
         |
         v
Angular displays contact information
```

### Azure Frontend vs GitHub Pages Frontend

**Azure Static Web App Frontend** (`AzureStaticFrontend/index.html`):
- Single HTML page
- API documentation (like Swagger UI)
- No Angular build required
- Fast deployment (no compilation)
- Purpose: Developer documentation and API testing

**GitHub Pages Frontend** (`PortfolioFrontend/`):
- Full Angular 19 application
- Complete portfolio with all features
- Compiled and optimized
- Purpose: Public-facing portfolio website

---

## Troubleshooting

### ? GitHub Actions: "App Directory Location is invalid"

**Error:**
```
App Directory Location: './PortfolioFrontend ' is invalid.
Could not detect this directory.
```

**Causes:**
1. Trailing space in Azure Portal configuration: `PortfolioFrontend `
2. Leading `./` in configuration: `./PortfolioFrontend`
3. Wrong case: `portfoliofrontend` (should be `PortfolioFrontend`)

**Fix:**
1. Go to Azure Portal ? Your Static Web App
2. Check **Configuration** ? **Application settings**
3. Verify build configuration values (may need to recreate resource if locked)
4. Correct values:
   - App location: `PortfolioFrontend` (no `./`, no trailing space)
   - API location: `PortfolioAPI`
   - Output location: (empty)

**If configuration is locked:**
1. Delete the Static Web App resource
2. Recreate with correct values (no copy-paste, type manually)
3. Get new deployment token
4. Update GitHub Secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`

### ? Local API Returns Empty Data

**Problem:** API responds but all fields are empty

**Fix (.NET Backend):**
1. Verify `PortfolioBackend/appsettings.local.json` exists
2. Check file has correct contact information
3. **Restart backend** (Ctrl+C, then `dotnet run`)
4. Test all endpoints:
   ```powershell
   Invoke-RestMethod -Uri http://localhost:5091/api/contact
   Invoke-RestMethod -Uri http://localhost:5091/api/resume
   Invoke-RestMethod -Uri http://localhost:5091/api/blog
   ```

**Fix (Azure Functions):**
1. Verify `PortfolioAPI/local.settings.json` exists
2. Check file has correct environment variables
3. **Build TypeScript**: `npm run build`
4. **Restart function**: `func start`
5. Test all endpoints:
   ```powershell
   Invoke-RestMethod -Uri http://localhost:7071/api/contact
   Invoke-RestMethod -Uri http://localhost:7071/api/resume
   Invoke-RestMethod -Uri http://localhost:7071/api/blog
   ```

### ? Build Fails: "No output found"

**Problem**: Output location incorrectly configured

**Fix**:
1. Set Output location to **empty/blank**
2. Angular CLI automatically outputs to correct location
3. Do NOT use `docs` or `dist`

### ? API Returns Empty Values (Azure)

**Problem**: Environment variables not set or not saved

**Fix**:
1. Azure Portal ? Static Web App ? Configuration
2. Verify all 5 variables exist
3. Click **"Save"** (don't forget this!)
4. Wait 30 seconds, then test again
5. Check API logs in Application Insights

### ? CORS Errors in Browser

**Problem**: Frontend can't call API due to CORS

**Fix**:
1. Verify API includes CORS headers (already configured)
2. Check `staticwebapp.config.json` exists in `PortfolioFrontend/`
3. For .NET backend, verify CORS policy in `Program.cs`

### ? Port Already in Use

**Problem**: Port 5091 or 7071 already in use

**Fix:**
```powershell
# Find process using the port
Get-Process -Id (Get-NetTCPConnection -LocalPort 5091).OwningProcess

# Stop the process
Stop-Process -Id <ProcessId>

# Or restart your computer
```

### ? 404 errors on /api/resume or /api/blog

**Problem**: Resume or blog endpoints return 404 Not Found

**Causes:**
1. Azure Functions not built after adding new endpoints
2. Functions not deployed to Azure
3. TypeScript not compiled to JavaScript

**Fix (Local Development):**
1. **Navigate to API folder**: `cd PortfolioAPI`
2. **Build TypeScript**: `npm run build`
3. **Verify compiled files exist**:
   - `PortfolioAPI/contact/index.js`
   - `PortfolioAPI/resume/index.js`
   - `PortfolioAPI/blog/index.js`
4. **Restart function**: `func start`
5. **Test endpoints**:
   ```powershell
   Invoke-RestMethod -Uri http://localhost:7071/api/contact
   Invoke-RestMethod -Uri http://localhost:7071/api/resume
   Invoke-RestMethod -Uri http://localhost:7071/api/blog
   ```

**Fix (Azure Production):**
1. **Commit new API functions**:
   ```bash
   git add PortfolioAPI/resume/ PortfolioAPI/blog/
   git commit -m "feat: Add resume and blog API endpoints"
   git push origin main
   ```
2. **Wait for GitHub Actions** to complete deployment (2-5 minutes)
3. **Test Azure endpoints**:
   ```bash
   curl https://gentle-moss-0d321ce00.2.azurestaticapps.net/api/contact
   curl https://gentle-moss-0d321ce00.2.azurestaticapps.net/api/resume
   curl https://gentle-moss-0d321ce00.2.azurestaticapps.net/api/blog
   ```

---

## Verification

### ? Local Development Checklist

- [ ] .NET SDK installed (`dotnet --version`)
- [ ] Node.js installed (`node --version`)
- [ ] `appsettings.local.json` created with contact info
- [ ] Backend starts successfully on port 5091
- [ ] API returns contact data (test with `.\test-api.ps1`)
- [ ] Frontend starts on port 4200
- [ ] Contact popup shows email and phone

### ? Azure Deployment Checklist

- [ ] Static Web App created in Azure Portal
- [ ] **Build configuration has NO trailing spaces or `./` prefix**
- [ ] Resource Group: `portfolio_group`
- [ ] Region: `East Asia`
- [ ] GitHub repository connected
- [ ] Deployment token added to GitHub Secrets
- [ ] 5 environment variables configured and **saved**
- [ ] GitHub Actions workflow runs successfully (no "invalid directory" error)
- [ ] Azure Static Web App URL accessible

### ? API Endpoint Tests

**Test 1: Local API (.NET Backend)**
```powershell
Invoke-RestMethod -Uri http://localhost:5091/api/contact
Invoke-RestMethod -Uri http://localhost:5091/api/resume
Invoke-RestMethod -Uri http://localhost:5091/api/blog
```

**Test 2: Local API (Azure Functions)**
```powershell
Invoke-RestMethod -Uri http://localhost:7071/api/contact
Invoke-RestMethod -Uri http://localhost:7071/api/resume
Invoke-RestMethod -Uri http://localhost:7071/api/blog
```

**Test 3: Azure API (Production)**
```bash
curl https://[your-app].azurestaticapps.net/api/contact
curl https://[your-app].azurestaticapps.net/api/resume
curl https://[your-app].azurestaticapps.net/api/blog
```

**Expected Contact Response**:
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

**Expected Resume Response**:
```json
{
  "personalInfo": {
    "name": "Rahul A Bangera",
    "title": "Full Stack Developer | Cloud Solutions Architect",
    "email": "rahul.bangera.999@gmail.com"
  },
  "summary": "...",
  "skills": { ... },
  "experience": [ ... ]
}
```

**Expected Blog Response**:
```json
{
  "id": 1,
  "slug": "getting-started-angular-19",
  "title": "Getting Started with Angular 19",
  "description": "...",
  "author": "Rahul A Bangera"
}
```

---

## Update API URL in Frontend

### For Production Deployment

After Azure deployment, update the production environment:

Edit: `PortfolioFrontend/src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-actual-app-name.azurestaticapps.net'  // Your Azure URL
};
```

**Get your Azure URL:**
1. Azure Portal ? Your Static Web App ? **Overview**
2. Copy the **URL** at the top

**Commit and deploy:**
```bash
git add PortfolioFrontend/src/environments/environment.prod.ts
git commit -m "feat: Update API URL for Azure Static Web Apps"
git push origin main
```

---

## Quick Reference Commands

```bash
# Local Development - .NET Backend
cd PortfolioBackend
dotnet run                     # Start backend (port 5091)

# Local Development - Azure Functions
cd PortfolioAPI
npm install                    # Install dependencies
npm run build                  # Build TypeScript
func start                     # Start API (port 7071)

# Frontend
cd PortfolioFrontend
npm start                      # Start dev server (port 4200)

# Testing
.\test-api.ps1                                              # Test local API
Invoke-RestMethod -Uri http://localhost:5091/api/contact   # Test .NET backend - Contact
Invoke-RestMethod -Uri http://localhost:5091/api/resume    # Test .NET backend - Resume
Invoke-RestMethod -Uri http://localhost:5091/api/blog      # Test .NET backend - Blog
Invoke-RestMethod -Uri http://localhost:7071/api/contact   # Test Azure Functions - Contact
Invoke-RestMethod -Uri http://localhost:7071/api/resume    # Test Azure Functions - Resume
Invoke-RestMethod -Uri http://localhost:7071/api/blog      # Test Azure Functions - Blog

# Deployment
git add .
git commit -m "feat: Update configuration"
git push origin main           # Triggers auto-deployment

# Troubleshooting
dotnet --version               # Check .NET SDK
node --version                 # Check Node.js
func --version                 # Check Azure Functions Core Tools
npm run build                  # Rebuild TypeScript if 404 errors occur
```

---

## Summary

? **Local Development:** Use .NET Backend (simpler, faster)

? **Production:** Uses Azure Static Web Apps (serverless, auto-scaling)

? **Dual Deployment:** GitHub Pages for frontend + Azure for API

? **Free Tier:** Covers all needs for personal portfolio

? **Configuration:** Environment-based (appsettings.local.json for local, Azure Portal for production)

? **Build Configuration:** NO trailing spaces, NO `./` prefix in Azure Portal

**Ready to develop locally and deploy to Azure!** ??

---

**Last Updated**: January 13, 2026  
**Document Version**: 2.1  
**Maintained by**: Rahul A

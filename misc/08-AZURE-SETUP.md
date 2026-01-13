# Azure Static Web Apps Setup Guide

**Last Updated**: January 2025  
**Azure Region**: East Asia  
**Angular Version**: 19.0.0

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
?   ??? index.ts          # Azure Function handler
??? host.json             # Azure Functions host config
??? package.json          # Dependencies
??? tsconfig.json         # TypeScript config
??? .gitignore            # Git ignore rules
??? local.settings.json   # Local env vars (not in git)

PortfolioBackend/
??? Controllers/
?   ??? ContactController.cs  # .NET API controller
??? Program.cs            # .NET app configuration
??? appsettings.json      # Base settings
??? appsettings.local.json  # Local env vars (not in git)
```

### API Endpoint Details

**Endpoint**: `https://[your-app].azurestaticapps.net/api/contact`

**Method**: `GET`

**Response Format**:
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
Invoke-RestMethod -Uri http://localhost:5091/api/contact  # .NET
Invoke-RestMethod -Uri http://localhost:7071/api/contact  # Azure Functions
```

**curl:**
```bash
curl http://localhost:5091/api/contact  # .NET
curl http://localhost:7071/api/contact  # Azure Functions
```

**Browser:**
- .NET: `http://localhost:5091/api/contact`
- Azure Functions: `http://localhost:7071/api/contact`

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
   [Job: build]                      [Job: deploy-azure-swa]
         |                                     |
         v                                     v
  Build Angular App                    Build + Deploy Both
  Output to docs/                      Frontend + API
         |                                     |
         v                                     v
  GitHub Pages Deploy                  Azure Static Web Apps
         |                                     |
         v                                     v
  https://rahul-a.in              https://[app].azurestaticapps.net
  (Static frontend)               (Frontend + Serverless API)
         |                                     |
         +------------------+------------------+
                            |
                            v
                     Production Site
            Frontend calls Azure API for data
```

### Why Two Deployments?

1. **GitHub Pages** (`rahul-a.in`):
   - Custom domain
   - Free hosting
   - Fast CDN
   - Static files only
   - **Limitation**: No backend/API

2. **Azure Static Web Apps**:
   - Provides serverless API
   - Auto-scaling backend
   - Environment variables
   - Application insights
   - **Frontend calls Azure API**

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
4. Test: `Invoke-RestMethod -Uri http://localhost:5091/api/contact`

**Fix (Azure Functions):**
1. Verify `PortfolioAPI/local.settings.json` exists
2. Check file has correct environment variables
3. Restart function: `func start`
4. Test: `Invoke-RestMethod -Uri http://localhost:7071/api/contact`

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

**Test 1: Local API**
```powershell
Invoke-RestMethod -Uri http://localhost:5091/api/contact
```

**Test 2: Azure API**
```bash
curl https://[your-app].azurestaticapps.net/api/contact
```

**Expected Response:**
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
Invoke-RestMethod -Uri http://localhost:5091/api/contact   # Test .NET backend
Invoke-RestMethod -Uri http://localhost:7071/api/contact   # Test Azure Functions

# Deployment
git add .
git commit -m "feat: Update configuration"
git push origin main           # Triggers auto-deployment

# Troubleshooting
dotnet --version               # Check .NET SDK
node --version                 # Check Node.js
func --version                 # Check Azure Functions Core Tools
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

**Last Updated**: January 2025  
**Document Version**: 2.1  
**Maintained by**: Rahul A

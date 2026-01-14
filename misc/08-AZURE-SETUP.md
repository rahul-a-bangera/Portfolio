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

## ?? TROUBLESHOOTING: Build Pipeline Failing

### Error: "Function language info isn't provided"

**Error Message:**
```
Cannot deploy to the function app because Function language info isn't provided.
```

**Root Cause:** Azure Static Web Apps deployment cannot detect the Function runtime/language. This requires TWO things:
1. `function.json` files in each function directory
2. `platform.apiRuntime` configuration in `staticwebapp.config.json` (in the app location directory)

**Fix:**

**Part 1: Add function.json files**

Azure Functions v4 (Node.js) uses `app.http()` in code for function registration, but Azure Static Web Apps deployment still requires traditional `function.json` files to understand the function bindings.

Create `function.json` in each function folder:

**PortfolioAPI/contact/function.json**:
```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "options"],
      "route": "contact"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ],
  "scriptFile": "index.js"
}
```

Repeat for `resume/function.json` and `blog/function.json` with appropriate routes.

**Part 2: Configure API runtime in staticwebapp.config.json**

?? **CRITICAL**: The `staticwebapp.config.json` must be in your **app location directory** (`AzureStaticFrontend`), NOT in the API directory!

Edit `AzureStaticFrontend/staticwebapp.config.json` and add the `platform` section at the top:

```json
{
  "platform": {
    "apiRuntime": "node:20"
  },
  "routes": [
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

**Why both are needed:**
- `function.json` files ? Tell Azure what functions exist and their bindings
- `platform.apiRuntime` ? Tell Azure what runtime to use (Node.js 20)
- Both must be present for successful deployment

**Verification:**
```bash
# Check function.json files exist
ls PortfolioAPI/contact/function.json
ls PortfolioAPI/resume/function.json
ls PortfolioAPI/blog/function.json

# Check staticwebapp.config.json has platform configuration
cat AzureStaticFrontend/staticwebapp.config.json | grep -A 2 "platform"

# Should output:
# "platform": {
#   "apiRuntime": "node:20"
# }

# Commit and push
git add .
git commit -m "fix: Add function.json files and configure API runtime for Azure deployment"
git push origin main
```

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
AzureStaticFrontend/
??? index.html                    # Minimal API documentation page
??? staticwebapp.config.json      # ?? MUST include platform.apiRuntime configuration

PortfolioAPI/
??? contact/
?   ??? index.ts                  # Contact API handler
?   ??? index.js                  # Compiled JavaScript
?   ??? function.json             # Function binding configuration (required)
??? resume/
?   ??? index.ts                  # Resume API handler
?   ??? index.js                  # Compiled JavaScript
?   ??? function.json             # Function binding configuration (required)
??? blog/
?   ??? index.ts                  # Blog API handler
?   ??? index.js                  # Compiled JavaScript
?   ??? function.json             # Function binding configuration (required)
??? host.json                     # Azure Functions host config
??? package.json                  # Dependencies
??? tsconfig.json                 # TypeScript config
??? .node-version                 # Node version (20)
??? .platform                     # Platform type (node)
??? staticwebapp.config.json      # API-specific config (optional)
??? .gitignore                    # Git ignore rules
??? local.settings.json           # Local env vars (not in git)

PortfolioBackend/
??? Controllers/
?   ??? ContactController.cs      # .NET API controller
?   ??? ResumeController.cs       # .NET Resume controller
?   ??? BlogController.cs         # .NET Blog controller
??? Program.cs                    # .NET app configuration
??? appsettings.json              # Base settings
??? appsettings.local.json        # Local env vars (not in git)
```

**Critical Configuration Files:**

1. **AzureStaticFrontend/staticwebapp.config.json**:
   - ?? MUST contain `platform.apiRuntime: "node:20"`
   - Azure reads this to determine function language
   - Located in app location directory

2. **function.json files** (in each function folder):
   - Required for Azure Static Web Apps deployment
   - Defines HTTP trigger bindings and routes
   - Works alongside Azure Functions v4 programming model (app.http())
   - Contains `scriptFile` property pointing to compiled JavaScript

3. **PortfolioAPI/.node-version**:
   - Specifies Node.js version (20)
   - Used by Azure during deployment

4. **PortfolioAPI/.platform**:
   - Specifies platform type (node)
   - Used by Azure during deployment

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

**Fix:**
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

### Error: "Failed to deploy the Azure Functions"

**Error Message:**
```
Status: Failed. Time: 17.7517448(s)
Deployment Failed :(
Deployment Failure Reason: Failed to deploy the Azure Functions.
```

**Root Cause:** Azure Functions v4 programming model (`app.http()`) conflicts with Azure Static Web Apps deployment when `function.json` files are present. Azure Static Web Apps expects the traditional v3 export pattern.

**Fix: Convert to Azure Functions v3 Programming Model**

When using `function.json` files with Azure Static Web Apps, you must use the traditional export pattern (v3 model) instead of the v4 programming model.

**Change from v4 to v3:**

**? Before (v4 - doesn't work with Azure Static Web Apps):**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

async function contactHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // ... handler logic
}

app.http('contact', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'contact',
    handler: contactHandler
});
```

**? After (v3 - works with Azure Static Web Apps):**
```typescript
import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export default async function contactHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // ... handler logic
}
```

**Key Changes:**
1. Remove `app` import (not needed for v3)
2. Export the handler function as `default export`
3. Remove `app.http()` registration call
4. Keep the `function.json` file which defines the bindings

**Apply to all functions:**
- `PortfolioAPI/contact/index.ts`
- `PortfolioAPI/resume/index.ts`
- `PortfolioAPI/blog/index.ts`

**Rebuild and deploy:**
```bash
cd PortfolioAPI
npm run build

# Verify compiled files have correct exports
cat contact/index.js | grep "exports.default"

# Should see: exports.default = contactHandler;

git add .
git commit -m "fix: Convert Azure Functions to v3 model for Static Web Apps compatibility"
git push origin main
```

**Why this works:**
- Azure Functions v4 (`app.http()`) is designed for Azure Functions hosting
- Azure Static Web Apps uses a different deployment model that requires v3 pattern
- The v3 model with `function.json` is fully compatible with Azure Static Web Apps
- Your functions will work the same way, just with a different registration mechanism

### Error: "Function language info isn't provided"

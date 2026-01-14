#!/usr/bin/env pwsh
# Start Complete Local Development (Backend + Frontend + Azure Functions)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Development Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "? Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "? Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check .NET
try {
    $dotnetVersion = dotnet --version
    Write-Host "? .NET SDK: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "? .NET SDK not found. Please install .NET SDK 8.0+" -ForegroundColor Red
    exit 1
}

# Check Azure Functions Core Tools
try {
    $funcVersion = func --version
    Write-Host "? Azure Functions Core Tools: $funcVersion" -ForegroundColor Green
} catch {
    Write-Host "? Azure Functions Core Tools not found" -ForegroundColor Yellow
    Write-Host "  Install with: npm install -g azure-functions-core-tools@4 --unsafe-perm true" -ForegroundColor Gray
    Write-Host "  (Optional - only needed for testing Azure Functions locally)" -ForegroundColor Gray
}

Write-Host ""

# Setup backend config
if (!(Test-Path "PortfolioBackend\appsettings.local.json")) {
    if (Test-Path "PortfolioBackend\appsettings.local.json.example") {
        Copy-Item "PortfolioBackend\appsettings.local.json.example" -Destination "PortfolioBackend\appsettings.local.json"
        Write-Host "? Created PortfolioBackend\appsettings.local.json" -ForegroundColor Green
    }
}

# Check if root dependencies are installed
$rootNodeModules = Test-Path "node_modules"
$frontendNodeModules = Test-Path "PortfolioFrontend/node_modules"
$apiNodeModules = Test-Path "PortfolioAPI/node_modules"

if (-not $rootNodeModules -or -not $frontendNodeModules -or -not $apiNodeModules) {
    Write-Host ""
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    
    # Install root dependencies
    if (-not $rootNodeModules) {
        Write-Host "Installing root dependencies..." -ForegroundColor Gray
        npm install
    }
    
    # Install frontend dependencies
    if (-not $frontendNodeModules) {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Gray
        Push-Location PortfolioFrontend
        npm install
        Pop-Location
    }
    
    # Install API dependencies
    if (-not $apiNodeModules) {
        Write-Host "Installing API dependencies..." -ForegroundColor Gray
        Push-Location PortfolioAPI
        npm install
        Pop-Location
    }
    
    Write-Host ""
    Write-Host "? All dependencies installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Angular Frontend" -ForegroundColor Cyan
Write-Host "     ? http://localhost:4200" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. .NET Backend API" -ForegroundColor Green
Write-Host "     ? http://localhost:5091" -ForegroundColor Gray
Write-Host "     Endpoints:" -ForegroundColor Gray
Write-Host "       • /api/contact" -ForegroundColor DarkGray
Write-Host "       • /api/resume" -ForegroundColor DarkGray
Write-Host "       • /api/blog" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  3. Azure Functions API" -ForegroundColor Yellow
Write-Host "     ? http://localhost:7071" -ForegroundColor Gray
Write-Host "     Endpoints:" -ForegroundColor Gray
Write-Host "       • /api/contact" -ForegroundColor DarkGray
Write-Host "       • /api/resume" -ForegroundColor DarkGray
Write-Host "       • /api/blog" -ForegroundColor DarkGray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Start all services using npm
npm start

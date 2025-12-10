#!/usr/bin/env pwsh

# Portfolio Website Quick Start Script for PowerShell

Write-Host ""
Write-Host "========================================"
Write-Host "Portfolio Website - Quick Start" -ForegroundColor Cyan
Write-Host "========================================"
Write-Host ""

# Define paths
$projectRoot = "c:\Users\rahul\VS CODE\Portfolio"
$backendPath = Join-Path $projectRoot "PortfolioBackend"
$frontendPath = Join-Path $projectRoot "PortfolioFrontend"

# Step 1: Check and install frontend dependencies
Write-Host "Step 1: Checking Frontend Dependencies..." -ForegroundColor Yellow
Set-Location $frontendPath
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm packages..." -ForegroundColor Cyan
    npm install
    Write-Host "npm packages installed successfully" -ForegroundColor Green
} else {
    Write-Host "npm packages already installed" -ForegroundColor Green
}

Set-Location $projectRoot
Write-Host ""
Write-Host "========================================"
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start Backend (.NET):" -ForegroundColor Yellow
Write-Host "   cd PortfolioBackend"
Write-Host "   dotnet run"
Write-Host ""
Write-Host "2. In a NEW PowerShell window, start Frontend (Angular):" -ForegroundColor Yellow
Write-Host "   cd PortfolioFrontend"
Write-Host "   ng serve"
Write-Host ""
Write-Host "3. Open your browser:" -ForegroundColor Yellow
Write-Host "   http://localhost:4200"
Write-Host ""
Write-Host "For more details, see SETUP.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to continue"

#!/usr/bin/env pwsh
# Start Complete Local Development (Backend + Frontend)

Write-Host "?? Portfolio Local Development Starter" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check prerequisites
Write-Host "?? Checking prerequisites..." -ForegroundColor Cyan

# Check .NET
try {
    $dotnetVersion = dotnet --version
    Write-Host "? .NET: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "? .NET not found. Install .NET 8.0 SDK from https://dotnet.microsoft.com/download" -ForegroundColor Red
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "? Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "? Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "?? Setting up configuration..." -ForegroundColor Cyan

# Setup backend config
if (!(Test-Path "PortfolioBackend\appsettings.local.json")) {
    Copy-Item "PortfolioBackend\appsettings.local.json.example" -Destination "PortfolioBackend\appsettings.local.json"
    Write-Host "? Created PortfolioBackend\appsettings.local.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "?? Starting services..." -ForegroundColor Cyan
Write-Host ""

# Instructions
Write-Host "??  MANUAL STEPS REQUIRED:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1??  Open a NEW PowerShell terminal and run:" -ForegroundColor White
Write-Host "   cd 'C:\Users\rahul\VS CODE\Portfolio\PortfolioBackend'" -ForegroundColor Cyan
Write-Host "   dotnet run" -ForegroundColor Cyan
Write-Host ""
Write-Host "2??  Wait for backend to start (shows 'Now listening on: http://localhost:5091')" -ForegroundColor White
Write-Host ""
Write-Host "3??  Then, in ANOTHER terminal run:" -ForegroundColor White
Write-Host "   cd 'C:\Users\rahul\VS CODE\Portfolio\PortfolioFrontend'" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "4??  Open browser: http://localhost:4200" -ForegroundColor White
Write-Host ""
Write-Host "?? Endpoints:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5091/api/contact" -ForegroundColor White
Write-Host "   Frontend: http://localhost:4200" -ForegroundColor White
Write-Host ""
Write-Host "? Configuration ready! Follow the steps above to start." -ForegroundColor Green

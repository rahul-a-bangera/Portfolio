#!/usr/bin/env pwsh
# Start Local Development Environment

Write-Host "?? Starting Local Development Environment" -ForegroundColor Green
Write-Host ""

# Check if .NET is installed
Write-Host "Checking .NET installation..." -ForegroundColor Cyan
try {
    $dotnetVersion = dotnet --version
    Write-Host "? .NET version: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "? .NET is not installed. Please install .NET 8.0 SDK" -ForegroundColor Red
    exit 1
}

# Navigate to backend
Set-Location "PortfolioBackend"

Write-Host ""
Write-Host "?? Setting up configuration..." -ForegroundColor Cyan

# Copy local settings if not exists
if (!(Test-Path "appsettings.local.json")) {
    Copy-Item "appsettings.local.json.example" -Destination "appsettings.local.json"
    Write-Host "? Created appsettings.local.json" -ForegroundColor Green
} else {
    Write-Host "? appsettings.local.json already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "?? Starting .NET Backend API..." -ForegroundColor Cyan
Write-Host "API will be available at: http://localhost:5091/api/contact" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the backend
dotnet run

# Local Development Setup Script
# Copies template files to local data directory

Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "   Portfolio - Local Development Setup" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

$templateDir = "PortfolioFrontend\src\assets\data\local\templates"
$localDir = "PortfolioFrontend\src\assets\data\local"

Write-Host "`n[INFO] Setting up local development data..." -ForegroundColor Yellow

# Check if template directory exists
if (-Not (Test-Path $templateDir)) {
    Write-Host "[ERROR] Template directory not found: $templateDir" -ForegroundColor Red
    exit 1
}

# Check if local directory exists
if (-Not (Test-Path $localDir)) {
    Write-Host "[INFO] Creating local data directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $localDir -Force | Out-Null
}

# Copy template files
$templates = @("profile-template.json", "contact-template.json", "resume-template.json")
$copied = 0
$skipped = 0

foreach ($template in $templates) {
    $sourcePath = Join-Path $templateDir $template
    $targetName = $template -replace "-template", ""
    $targetPath = Join-Path $localDir $targetName
    
    if (Test-Path $targetPath) {
        Write-Host "[SKIP] File already exists: $targetName" -ForegroundColor Gray
        $skipped++
    } else {
        Copy-Item $sourcePath $targetPath
        Write-Host "[SUCCESS] Created: $targetName" -ForegroundColor Green
        $copied++
    }
}

Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

Write-Host "`n[INFO] Summary:" -ForegroundColor Yellow
Write-Host "  Files created: $copied" -ForegroundColor Green
Write-Host "  Files skipped: $skipped" -ForegroundColor Gray

Write-Host "`n[ACTION] Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Edit files in: $localDir" -ForegroundColor White
Write-Host "     - profile.json (name and specialist content)" -ForegroundColor White
Write-Host "     - contact.json (email, phone, links)" -ForegroundColor White
Write-Host "     - resume.json (complete resume data)" -ForegroundColor White
Write-Host "`n  2. Run the app:" -ForegroundColor White
Write-Host "     cd PortfolioFrontend" -ForegroundColor Cyan
Write-Host "     npm start" -ForegroundColor Cyan
Write-Host "`n  3. Open browser:" -ForegroundColor White
Write-Host "     http://localhost:4200" -ForegroundColor Cyan

Write-Host "`n[INFO] Your data is NOT tracked in Git (privacy protected!)" -ForegroundColor Green
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

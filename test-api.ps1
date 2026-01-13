# Test Backend API
Write-Host "?? Testing Backend API..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5091/api/contact" -Method Get
    
    Write-Host "? API Response:" -ForegroundColor Green
    Write-Host ""
    Write-Host "Email:    $($response.email)" -ForegroundColor White
    Write-Host "Phone:    $($response.phone)" -ForegroundColor White
    Write-Host "LinkedIn: $($response.socialLinks.LinkedIn)" -ForegroundColor White
    Write-Host "GitHub:   $($response.socialLinks.GitHub)" -ForegroundColor White
    Write-Host "Twitter:  $($response.socialLinks.Twitter)" -ForegroundColor White
    Write-Host ""
    
    if ($response.email -and $response.phone) {
        Write-Host "? SUCCESS: Contact information is loaded correctly!" -ForegroundColor Green
    } else {
        Write-Host "??  WARNING: Contact information is empty!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Fix: Make sure backend is running and appsettings.local.json exists" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "? ERROR: Could not connect to backend" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure backend is running:" -ForegroundColor Yellow
    Write-Host "  cd PortfolioBackend" -ForegroundColor Cyan
    Write-Host "  dotnet run" -ForegroundColor Cyan
}

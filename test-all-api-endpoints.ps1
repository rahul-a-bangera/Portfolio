# Test All API Endpoints
# This script tests all API endpoints (local and production)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Testing Portfolio API Endpoints" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# API URLs
$localBackendUrl = "http://localhost:5091"
$localFunctionsUrl = "http://localhost:7071"
$productionUrl = "https://gentle-moss-0d321ce00.2.azurestaticapps.net"

# Function to test an endpoint
function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Name
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        $response = Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 10
        Write-Host "? SUCCESS" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Gray
        $response | ConvertTo-Json -Depth 5 | Write-Host
        Write-Host ""
        return $true
    }
    catch {
        Write-Host "? FAILED" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

# Test Production Endpoints
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRODUCTION (Azure Static Web Apps)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$prodResults = @{
    Contact = Test-Endpoint -Url "$productionUrl/api/contact" -Name "Contact API (Production)"
    Resume = Test-Endpoint -Url "$productionUrl/api/resume" -Name "Resume API (Production)"
    Blog = Test-Endpoint -Url "$productionUrl/api/blog" -Name "Blog API (Production)"
}

# Test Local .NET Backend (if running)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "LOCAL (.NET Backend - Port 5091)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$localBackendResults = @{
    Contact = Test-Endpoint -Url "$localBackendUrl/api/contact" -Name "Contact API (Local .NET)"
    Resume = Test-Endpoint -Url "$localBackendUrl/api/resume" -Name "Resume API (Local .NET)"
    Blog = Test-Endpoint -Url "$localBackendUrl/api/blog" -Name "Blog API (Local .NET)"
}

# Test Local Azure Functions (if running)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "LOCAL (Azure Functions - Port 7071)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$localFunctionsResults = @{
    Contact = Test-Endpoint -Url "$localFunctionsUrl/api/contact" -Name "Contact API (Local Functions)"
    Resume = Test-Endpoint -Url "$localFunctionsUrl/api/resume" -Name "Resume API (Local Functions)"
    Blog = Test-Endpoint -Url "$localFunctionsUrl/api/blog" -Name "Blog API (Local Functions)"
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Production (Azure):" -ForegroundColor Yellow
$prodResults.GetEnumerator() | ForEach-Object {
    $status = if ($_.Value) { "? PASS" } else { "? FAIL" }
    Write-Host "  $($_.Key): $status"
}

Write-Host ""
Write-Host "Local .NET Backend:" -ForegroundColor Yellow
$localBackendResults.GetEnumerator() | ForEach-Object {
    $status = if ($_.Value) { "? PASS" } else { "? FAIL" }
    Write-Host "  $($_.Key): $status"
}

Write-Host ""
Write-Host "Local Azure Functions:" -ForegroundColor Yellow
$localFunctionsResults.GetEnumerator() | ForEach-Object {
    $status = if ($_.Value) { "? PASS" } else { "? FAIL" }
    Write-Host "  $($_.Key): $status"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

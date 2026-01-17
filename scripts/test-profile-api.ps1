# Test Profile API Endpoint
# Tests the /profile endpoint for name and specialist content retrieval

Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "   Testing Profile API Endpoint" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

$baseUrl = "https://portfolio-api.rahul-a-works.workers.dev"
$profileEndpoint = "$baseUrl/profile"

Write-Host "`n[INFO] Testing Profile Endpoint: $profileEndpoint" -ForegroundColor Yellow
Write-Host "[ACTION] GET $profileEndpoint" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri $profileEndpoint -Method Get -Headers @{"Accept"="application/json"}
    
    Write-Host "`n[SUCCESS] Profile API Response:" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content Type: $($response.Headers.'Content-Type')" -ForegroundColor Gray
    
    # Check for caching headers
    if ($response.Headers.'Cache-Control') {
        Write-Host "Cache-Control: $($response.Headers.'Cache-Control')" -ForegroundColor Gray
    }
    
    if ($response.Headers.'X-Data-Source') {
        Write-Host "Data Source: $($response.Headers.'X-Data-Source')" -ForegroundColor Gray
    }
    
    Write-Host "`nResponse Body:" -ForegroundColor Cyan
    $jsonContent = $response.Content | ConvertFrom-Json
    $jsonContent | ConvertTo-Json -Depth 10 | Write-Host
    
    # Validate response structure
    Write-Host "`n[INFO] Validating Response Structure..." -ForegroundColor Yellow
    
    if ($jsonContent.name) {
        Write-Host "[SUCCESS] Name field present: $($jsonContent.name)" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Missing 'name' field" -ForegroundColor Red
    }
    
    if ($jsonContent.specialistContent) {
        Write-Host "[SUCCESS] Specialist content present: $($jsonContent.specialistContent)" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Missing 'specialistContent' field" -ForegroundColor Red
    }
    
    # Performance metrics
    Write-Host "`n[INFO] Performance Metrics:" -ForegroundColor Yellow
    if ($response.Headers.'CF-Ray') {
        Write-Host "Cloudflare Ray ID: $($response.Headers.'CF-Ray')" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "`n[ERROR] Profile API Request Failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    }
}

Write-Host "`n===========================================================" -ForegroundColor Cyan
Write-Host "   Test Complete" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

# Test all Portfolio API endpoints
# Run this after starting the API with: func start

Write-Host "Testing Portfolio API Endpoints..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:7071/api"

# Test Contact endpoint
Write-Host "1. Testing /api/contact..." -ForegroundColor Yellow
try {
    $contactResult = Invoke-RestMethod -Uri "$baseUrl/contact" -Method Get
    Write-Host "   ? Contact API works!" -ForegroundColor Green
    Write-Host "   Email: $($contactResult.email)" -ForegroundColor Gray
    Write-Host "   Phone: $($contactResult.phone)" -ForegroundColor Gray
} catch {
    Write-Host "   ? Contact API failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test Resume endpoint
Write-Host "2. Testing /api/resume..." -ForegroundColor Yellow
try {
    $resumeResult = Invoke-RestMethod -Uri "$baseUrl/resume" -Method Get
    Write-Host "   ? Resume API works!" -ForegroundColor Green
    Write-Host "   Name: $($resumeResult.personalInfo.name)" -ForegroundColor Gray
    Write-Host "   Title: $($resumeResult.personalInfo.title)" -ForegroundColor Gray
    Write-Host "   Skills: $($resumeResult.skills.frontend.Count) frontend, $($resumeResult.skills.backend.Count) backend" -ForegroundColor Gray
} catch {
    Write-Host "   ? Resume API failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test Blog endpoint (all posts)
Write-Host "3. Testing /api/blog..." -ForegroundColor Yellow
try {
    $blogResult = Invoke-RestMethod -Uri "$baseUrl/blog" -Method Get
    Write-Host "   ? Blog API works!" -ForegroundColor Green
    Write-Host "   Total posts: $($blogResult.Count)" -ForegroundColor Gray
    if ($blogResult.Count -gt 0) {
        Write-Host "   First post: $($blogResult[0].title)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ? Blog API failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test Blog endpoint (single post by slug)
Write-Host "4. Testing /api/blog/{slug}..." -ForegroundColor Yellow
try {
    $blogPostResult = Invoke-RestMethod -Uri "$baseUrl/blog/getting-started-angular-19" -Method Get
    Write-Host "   ? Blog post API works!" -ForegroundColor Green
    Write-Host "   Title: $($blogPostResult.title)" -ForegroundColor Gray
    Write-Host "   Author: $($blogPostResult.author)" -ForegroundColor Gray
} catch {
    Write-Host "   ? Blog post API failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing complete!" -ForegroundColor Cyan

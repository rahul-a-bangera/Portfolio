# Resume Download Feature Documentation

## Overview
This document describes the implementation of the CV/Resume download functionality that works in both development and production environments.

## Implementation Details

### 1. File Location
- **Source PDF**: `misc/Rahul A - Resume.pdf`
- **Assets Location**: `src/assets/Rahul-A-Resume.pdf`
- **Production Build**: `dist/portfolio-frontend/assets/Rahul-A-Resume.pdf`

### 2. Components with Download Functionality

#### Home Component (`home.component.ts`)
```typescript
downloadCV(): void {
  const link = document.createElement('a');
  link.href = 'assets/Rahul-A-Resume.pdf';
  link.download = 'Rahul-A-Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

#### Resume Component (`resume.component.ts`)
- Same `downloadCV()` method implemented in the Summary tab

### 3. How It Works

1. **Development Mode**: 
   - Angular dev server serves files from `src/assets/`
   - PDF is accessible at `http://localhost:4200/assets/Rahul-A-Resume.pdf`

2. **Production Build**:
   - Angular CLI copies all files from `src/assets/` to `dist/portfolio-frontend/assets/`
   - PDF is bundled with the production build
   - Works on any hosting platform (Azure, Netlify, Vercel, etc.)

### 4. Button Locations

- **Home Page**: "Download CV" button (primary green button)
- **Resume Page ? Summary Tab**: "Download CV" button

### 5. User Experience

When a user clicks the "Download CV" button:
1. Browser creates a temporary download link
2. Opens the PDF in a new tab (if browser supports it)
3. Triggers download of the file as `Rahul-A-Resume.pdf`
4. Link is removed from DOM after download starts

### 6. Browser Compatibility

? Works on all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Opera

### 7. Updating the Resume PDF

To update the resume:

1. Replace the file at: `src/assets/Rahul-A-Resume.pdf`
2. Rebuild the application: `npm run build`
3. Deploy the updated build

**Note**: No code changes needed when updating the PDF file.

### 8. Angular Configuration

The `angular.json` already includes assets folder in the build:

```json
"assets": ["src/favicon.ico", "src/assets"]
```

This ensures all files in `src/assets/` are copied to the production build.

### 9. File Size

- Current PDF size: ~314 KB
- Minimal impact on bundle size as it's served as a separate asset

### 10. Deployment Notes

**For Production Deployment:**
- ? The PDF is automatically included in the build output
- ? No special server configuration required
- ? Works with static hosting (GitHub Pages, Netlify, Vercel, Azure Static Web Apps)
- ? No CORS issues as the file is served from the same domain

**Security:**
- The PDF is publicly accessible at `/assets/Rahul-A-Resume.pdf`
- No authentication required (as expected for a public resume)

### 11. Testing

**Development:**
```bash
ng serve
```
Then navigate to:
- Home page and click "Download CV"
- Resume page ? Summary tab ? Click "Download CV"

**Production Build:**
```bash
npm run build
# Serve the dist folder using any static server
npx http-server dist/portfolio-frontend -p 8080
```

Then test the download functionality at `http://localhost:8080`

## Troubleshooting

### PDF Not Downloading
1. Check browser console for errors
2. Verify file exists: `src/assets/Rahul-A-Resume.pdf`
3. Clear browser cache
4. Rebuild the application

### 404 Error in Production
1. Verify the PDF is in the dist folder: `dist/portfolio-frontend/assets/`
2. Check server configuration for static file serving
3. Ensure base href is correctly set in production

## Future Enhancements

- Add download analytics tracking
- Add loading indicator during download
- Support multiple resume versions (PDF, DOCX)
- Add "View Online" option before download

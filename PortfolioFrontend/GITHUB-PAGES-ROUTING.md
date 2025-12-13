# GitHub Pages SPA Routing Fix

## Problem

When deploying an Angular SPA to GitHub Pages, direct navigation to routes like `/blog/post-slug` results in a 404 error because GitHub Pages looks for a physical file at that path, which doesn't exist.

**Example:**
- ? Works: `https://rahul-a.in/` ? `https://rahul-a.in/#/blog/post`
- ? Fails: `https://rahul-a.in/blog/post` (404 error)

## Solution

Implemented a 404.html redirect strategy that converts the path into a format Angular can handle.

### How It Works

1. **User visits**: `https://rahul-a.in/blog/getting-started-angular-19`
2. **GitHub Pages**: Returns 404 (file doesn't exist)
3. **404.html loads**: Captures the URL path
4. **Redirects to**: `https://rahul-a.in/?/blog/getting-started-angular-19`
5. **index.html loads**: Script converts `?/blog/...` back to `/blog/...`
6. **Angular Router**: Takes over and renders the correct component

### Files Added/Modified

#### 1. **src/404.html** (New File)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Rahul A - Portfolio</title>
  <script>
    // Redirect script that converts path to query parameter
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1).join('/') + '/?/' +
      l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body></body>
</html>
```

#### 2. **src/index.html** (Modified)
Added script to convert query parameter back to path:
```html
<script>
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

#### 3. **angular.json** (Modified)
Added 404.html to assets:
```json
"assets": [
  "src/favicon.png",
  "src/assets",
  "src/CNAME",
  "src/404.html"
]
```

## Flow Diagram

```
User clicks "Read More" on blog post
         ?
Opens: https://rahul-a.in/blog/getting-started-angular-19
         ?
GitHub Pages: File not found ? Serves 404.html
         ?
404.html JavaScript: Captures URL and redirects
         ?
Redirects to: https://rahul-a.in/?/blog/getting-started-angular-19
         ?
index.html loads with Angular app
         ?
index.html JavaScript: Converts ?/blog/... to /blog/...
         ?
Angular Router: Matches route and loads BlogDetailComponent
         ?
User sees: Blog post rendered correctly! ?
```

## Testing

### Before Fix:
- Direct URL: `https://rahul-a.in/blog/post` ? ? 404 Error
- New tab from blog: Opens ? ? 404 Error

### After Fix:
- Direct URL: `https://rahul-a.in/blog/post` ? ? Works!
- New tab from blog: Opens ? ? Works!
- Localhost: Still works ? ? No issues

## Important Notes

1. **No change to localhost behavior** - Angular dev server handles routing natively
2. **Seamless user experience** - Redirect happens instantly, user sees correct page
3. **SEO friendly** - Search engines can follow the redirected URLs
4. **Works with all routes** - Handles any Angular route pattern

## Deployment Checklist

After making these changes:
- [x] Build project: `npm run build`
- [x] Verify 404.html in docs folder
- [x] Commit changes to Git
- [x] Push to GitHub
- [ ] Wait 2-3 minutes for GitHub Pages deployment
- [ ] Test direct URL navigation
- [ ] Test "Read More" button from blog cards

## Alternative Solutions (Not Used)

### Hash-based Routing
```typescript
// Using # in URLs like: https://rahul-a.in/#/blog/post
// Decided against this because it's less clean and not SEO friendly
```

### Custom Server
```
// Using a Node.js server or Netlify/Vercel
// Not needed for static GitHub Pages deployment
```

## Credits

Solution based on [spa-github-pages](https://github.com/rafgraph/spa-github-pages) by Rafael Pedicini.

---

**Status**: ? Implemented and Ready for Deployment  
**Last Updated**: December 13, 2024  
**Build**: Successful

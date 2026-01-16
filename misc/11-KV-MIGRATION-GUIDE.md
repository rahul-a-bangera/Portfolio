# Privacy-First Portfolio - KV Migration Complete Guide

## Overview

This guide will help you migrate all personal data from the GitHub repository to Cloudflare KV, ensuring your portfolio repo can be publicly cloned without exposing personal information.

---

## ?? What Gets Migrated

| Data | Current Location | New Location | Status |
|------|-----------------|--------------|--------|
| Resume Data | Hardcoded in `resume.ts` | KV: `resume:data` | [ACTION] ? Ready |
| Blog Posts | Hardcoded in `blog.ts` | KV: `blog:all`, `blog:{slug}` | [ACTION] ? Ready |
| Contact Info | Hardcoded in `contact.ts` | KV: `contact:info` | [ACTION] ? Ready |
| Resume PDF | `assets/Rahul-A-Resume.pdf` | KV: `resume:pdf` | [ACTION] TODO |
| Images | `assets/images/` | Keep on GitHub Pages | [INFO] No Change |

---

## Step 1: Upload Data to KV

### Run the Upload Script

```bash
cd workers
node scripts/upload-to-kv.js
```

**This will upload:**
- `resume:data` - Complete resume JSON
- `contact:info` - Contact information
- `blog:all` - All blog posts array
- `blog:{slug}` - Individual blog post by slug

### Upload Resume PDF to KV

```bash
# Convert PDF to base64 and upload
cd workers
npx wrangler kv:key put --binding=PORTFOLIO_DATA "resume:pdf" --path="../PortfolioFrontend/src/assets/Rahul-A-Resume.pdf" --metadata='{"contentType":"application/pdf","filename":"Rahul-A-Resume.pdf"}'
```

---

## Step 2: Update Workers Handlers

### Resume Handler (Already Updated)

**File:** `workers/src/handlers/resume.ts`

```typescript
// Fetches from KV instead of hardcoded data
const resumeData = await env.PORTFOLIO_DATA.get('resume:data', 'json');
```

### Blog Handler (Need to Update)

**File:** `workers/src/handlers/blog.ts`

Update to fetch from KV:

```typescript
export async function handleBlog(
  request: Request,
  env: any,
  corsHeaders: Record<string, string>
): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 1];

    // Get specific blog post
    if (slug && slug !== 'blog') {
      const post = await env.PORTFOLIO_DATA.get(`blog:${slug}`, 'json');

      if (!post) {
        return new Response(
          JSON.stringify({ error: 'Not Found', message: 'Blog post not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, s-maxage=7200',
          ...corsHeaders,
        },
      });
    }

    // Get all blog posts
    const allPosts = await env.PORTFOLIO_DATA.get('blog:all', 'json');

    if (!allPosts) {
      return new Response(
        JSON.stringify({ error: 'Not Found', message: 'No blog posts available' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify(allPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Blog handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message: 'Failed to fetch blog posts' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
```

### Contact Handler (Need to Update)

**File:** `workers/src/handlers/contact.ts`

```typescript
export async function handleContact(
  request: Request,
  env: any,
  corsHeaders: Record<string, string>
): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    // Fetch contact info from KV
    const contactInfo = await env.PORTFOLIO_DATA.get('contact:info', 'json');

    if (!contactInfo) {
      console.error('[ERROR] Contact info not found in KV');
      return new Response(
        JSON.stringify({ error: 'Not Found', message: 'Contact information not available' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify(contactInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=7200',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('[ERROR] Contact handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message: 'Failed to fetch contact information' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
```

---

## Step 3: Frontend Caching Service

Create a caching service to minimize KV/API calls.

**File:** `PortfolioFrontend/src/app/services/cache.service.ts`

```typescript
import { Injectable } from '@angular/core';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'portfolio_cache_';

  /**
   * Get data from localStorage cache
   * @param key Cache key
   * @param maxAge Maximum age in milliseconds (default: 1 hour)
   * @returns Cached data or null if expired/not found
   */
  get<T>(key: string, maxAge: number = 3600000): T | null {
    try {
      const cacheKey = this.CACHE_PREFIX + key;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache expired
      if (now - entry.timestamp > maxAge) {
        this.remove(key);
        return null;
      }

      console.log(`[CACHE] Hit: ${key}`);
      return entry.data;
    } catch (error) {
      console.error('[CACHE] Get error:', error);
      return null;
    }
  }

  /**
   * Save data to localStorage cache
   * @param key Cache key
   * @param data Data to cache
   * @param expiresIn Expiration time in milliseconds
   */
  set<T>(key: string, data: T, expiresIn: number = 3600000): void {
    try {
      const cacheKey = this.CACHE_PREFIX + key;
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresIn
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(entry));
      console.log(`[CACHE] Set: ${key} (expires in ${expiresIn}ms)`);
    } catch (error) {
      console.error('[CACHE] Set error:', error);
    }
  }

  /**
   * Remove specific cache entry
   */
  remove(key: string): void {
    const cacheKey = this.CACHE_PREFIX + key;
    localStorage.removeItem(cacheKey);
    console.log(`[CACHE] Removed: ${key}`);
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log('[CACHE] Cleared all cache entries');
  }

  /**
   * Get cache statistics
   */
  getStats(): { totalEntries: number; totalSize: number } {
    const keys = Object.keys(localStorage);
    let totalSize = 0;
    let totalEntries = 0;

    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        totalEntries++;
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
    });

    return { totalEntries, totalSize };
  }
}
```

---

## Step 4: Update Frontend Services

### Resume Service with Caching

**File:** `PortfolioFrontend/src/app/services/resume.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly CACHE_KEY = 'resume_data';
  private readonly CACHE_DURATION = 3600000; // 1 hour

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) {}

  getResume(): Observable<any> {
    // Check cache first
    const cached = this.cache.get(this.CACHE_KEY, this.CACHE_DURATION);
    if (cached) {
      console.log('[SERVICE] Returning cached resume data');
      return of(cached);
    }

    // Fetch from API
    console.log('[SERVICE] Fetching resume from API');
    return this.http.get(`${environment.apiUrl}/resume`).pipe(
      tap(data => {
        // Cache the response
        this.cache.set(this.CACHE_KEY, data, this.CACHE_DURATION);
      }),
      catchError(error => {
        console.error('[SERVICE] Failed to fetch resume:', error);
        throw error;
      })
    );
  }

  /**
   * Force refresh resume data (bypass cache)
   */
  refreshResume(): Observable<any> {
    this.cache.remove(this.CACHE_KEY);
    return this.getResume();
  }
}
```

### Blog Service with Caching

**File:** `PortfolioFrontend/src/app/services/blog.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly CACHE_KEY_ALL = 'blog_posts_all';
  private readonly CACHE_KEY_PREFIX = 'blog_post_';
  private readonly CACHE_DURATION = 1800000; // 30 minutes

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) {}

  getAllPosts(): Observable<any[]> {
    // Check cache
    const cached = this.cache.get<any[]>(this.CACHE_KEY_ALL, this.CACHE_DURATION);
    if (cached) {
      console.log('[SERVICE] Returning cached blog posts');
      return of(cached);
    }

    // Fetch from API
    console.log('[SERVICE] Fetching blog posts from API');
    return this.http.get<any[]>(`${environment.apiUrl}/blog`).pipe(
      tap(posts => {
        this.cache.set(this.CACHE_KEY_ALL, posts, this.CACHE_DURATION);
      }),
      catchError(error => {
        console.error('[SERVICE] Failed to fetch blog posts:', error);
        throw error;
      })
    );
  }

  getPostBySlug(slug: string): Observable<any> {
    const cacheKey = this.CACHE_KEY_PREFIX + slug;
    
    // Check cache
    const cached = this.cache.get(cacheKey, this.CACHE_DURATION);
    if (cached) {
      console.log(`[SERVICE] Returning cached blog post: ${slug}`);
      return of(cached);
    }

    // Fetch from API
    console.log(`[SERVICE] Fetching blog post from API: ${slug}`);
    return this.http.get(`${environment.apiUrl}/blog/${slug}`).pipe(
      tap(post => {
        this.cache.set(cacheKey, post, this.CACHE_DURATION);
      }),
      catchError(error => {
        console.error(`[SERVICE] Failed to fetch blog post ${slug}:`, error);
        throw error;
      })
    );
  }
}
```

---

## Step 5: Remove Personal Data from Repo

### 1. Delete Azure Functions (Old API)

```bash
# Remove old Azure Functions folder
rm -rf PortfolioAPI
```

### 2. Replace Personal Content with Placeholders

**Files to update:**
- `PortfolioFrontend/src/app/components/home.component.ts`
- `PortfolioFrontend/src/app/components/about.component.ts`
- Any component with hardcoded personal info

**Replace:**
```typescript
// Before
name = 'Rahul A Bangera';
email = 'rahul.bangera.999@gmail.com';

// After (placeholder)
name = 'Your Name';
email = 'your.email@example.com';
```

### 3. Add .gitignore for Personal Data

**File:** `.gitignore`

```
# Personal data files (do not commit)
workers/data/resume.json
workers/data/blog-posts.json
workers/data/contact.json
PortfolioFrontend/src/assets/Rahul-A-Resume.pdf

# Keep template files
!workers/data/.gitkeep
!workers/data/README.md
```

### 4. Create Template Files

**File:** `workers/data/README.md`

```markdown
# Portfolio Data

This folder should contain your personal data in JSON format.

**Required Files:**
1. `resume.json` - Your resume/CV data
2. `blog-posts.json` - Your blog posts
3. `contact.json` - Your contact information

**Template files are available in `templates/` folder.**

## Upload to KV

After creating your data files, upload them to Cloudflare KV:

\`\`\`bash
node scripts/upload-to-kv.js
\`\`\`
```

---

## Step 6: Create Template Files for Cloners

**File:** `workers/data/templates/resume-template.json`

```json
{
  "personalInfo": {
    "name": "Your Full Name",
    "title": "Your Professional Title",
    "email": "your.email@example.com",
    "phone": "+00 0000000000",
    "location": "Your City, Country",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "website": "https://yoursite.com"
  },
  "summary": "Your professional summary...",
  "skills": {
    "frontend": ["Angular", "TypeScript", "React"],
    "backend": [".NET", "Node.js", "Python"],
    "cloud": ["Azure", "AWS", "Cloudflare"],
    "database": ["SQL", "MongoDB", "PostgreSQL"],
    "tools": ["Git", "Docker", "VS Code"]
  },
  "experience": [],
  "education": [],
  "certifications": [],
  "projects": []
}
```

**File:** `workers/data/templates/contact-template.json`

```json
{
  "email": "your.email@example.com",
  "phone": "+00 0000000000",
  "socialLinks": {
    "LinkedIn": "https://linkedin.com/in/yourprofile",
    "GitHub": "https://github.com/yourusername",
    "Twitter": "https://twitter.com/yourhandle"
  }
}
```

**File:** `workers/data/templates/blog-template.json`

```json
[
  {
    "id": 1,
    "slug": "your-first-post",
    "title": "Your First Blog Post",
    "description": "A brief description...",
    "content": "Full content here...",
    "author": "Your Name",
    "publishDate": "2024-01-01",
    "tags": ["Technology", "Programming"],
    "imageUrl": "/assets/blog/image.jpg",
    "readTime": "5 min read",
    "featured": true
  }
]
```

---

## Step 7: Create Setup Instructions

**File:** `SETUP-INSTRUCTIONS.md` (root of repo)

```markdown
# Portfolio Setup Instructions

This portfolio uses Cloudflare Workers and KV for privacy-first data storage.

## For Cloners

If you've cloned this repo, follow these steps to set up your own portfolio:

### 1. Create Your Data Files

```bash
cp workers/data/templates/resume-template.json workers/data/resume.json
cp workers/data/templates/contact-template.json workers/data/contact.json
cp workers/data/templates/blog-template.json workers/data/blog-posts.json
```

Edit these files with your personal information.

### 2. Set Up Cloudflare Workers

```bash
# Install dependencies
cd workers
npm install

# Login to Cloudflare
npx wrangler login

# Create KV namespace
npx wrangler kv:namespace create "PORTFOLIO_DATA"
npx wrangler kv:namespace create "PORTFOLIO_DATA" --preview
```

Update `workers/wrangler.toml` with your KV namespace IDs.

### 3. Upload Data to KV

```bash
node scripts/upload-to-kv.js
```

### 4. Deploy Workers

```bash
npm run deploy
```

### 5. Update Frontend

Update `PortfolioFrontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-worker-name.workers.dev'
};
```

### 6. Build & Deploy Frontend

```bash
cd PortfolioFrontend
npm install
npm run build
```

Deploy the `docs/` folder to GitHub Pages or your preferred hosting.

## Done!

Your portfolio is now live with privacy-first data storage!
```

---

## Step 8: Test Everything

### 1. Test KV Storage

```bash
# List all keys
npx wrangler kv:key list --binding=PORTFOLIO_DATA

# Get specific key
npx wrangler kv:key get --binding=PORTFOLIO_DATA "resume:data"
```

### 2. Test Workers Locally

```bash
cd workers
npm run dev

# Test endpoints
curl http://localhost:8787/resume
curl http://localhost:8787/blog
curl http://localhost:8787/contact
```

### 3. Deploy and Test Production

```bash
npm run deploy

# Test production endpoints
curl https://portfolio-api.rahul-a-works.workers.dev/resume
curl https://portfolio-api.rahul-a-works.workers.dev/blog
curl https://portfolio-api.rahul-a-works.workers.dev/contact
```

### 4. Test Frontend Caching

Open DevTools ? Application ? Local Storage
- Verify cache entries are created
- Verify subsequent requests use cache (check Console logs)

---

## Caching Strategy Summary

| Data Type | Cache Duration | Why |
|-----------|---------------|-----|
| Resume | 1 hour | Rarely changes |
| Blog Posts (All) | 30 min | May add new posts |
| Blog Post (Single) | 30 min | Content stable |
| Contact Info | 1 hour | Rarely changes |

**Cache Busting:**
- User can force refresh (Ctrl+F5)
- Cache service has `refreshResume()` method
- Cache auto-expires based on duration

**Benefits:**
- ? Minimal KV reads (free tier: 100K/day)
- ? Faster page loads (data from localStorage)
- ? Works offline (after first load)
- ? Lower API costs
- ? Better UX

---

## Estimated KV Usage

**Assumptions:**
- 100 visitors/day
- Each visitor views: home, resume, blog (3 pages)
- Cache duration: 1 hour

**Without Caching:**
- 100 visitors × 3 pages = 300 KV reads/day
- Well within free tier (100K reads/day)

**With Caching:**
- First visit: 3 KV reads
- Subsequent visits (within 1 hour): 0 KV reads
- Estimated: ~50-100 KV reads/day (significant reduction!)

---

## Next Steps

1. [ACTION] Run upload script: `node scripts/upload-to-kv.js`
2. [ACTION] Update blog/contact handlers to use KV
3. [ACTION] Create frontend caching service
4. [ACTION] Update frontend services to use cache
5. [ACTION] Remove personal data from repo
6. [ACTION] Create template files
7. [ACTION] Test everything
8. [ACTION] Commit and deploy

---

**Status:** [ACTION] Ready to Execute
**Estimated Time:** 1-2 hours
**Difficulty:** Medium

**Need Help?** Check individual steps or ask for clarification on any part!

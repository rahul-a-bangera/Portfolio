import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly CACHE_KEY_ALL = 'blog_posts_all';
  private readonly CACHE_KEY_PREFIX = 'blog_post_';
  private readonly CACHE_DURATION = 1800000; // 30 minutes
  private apiUrl = `${environment.apiUrl}/blog`;

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  /**
   * Get all blog posts (with caching)
   */
  getBlogs(): Observable<BlogPost[]> {
    // Check cache
    const cached = this.cache.get<BlogPost[]>(this.CACHE_KEY_ALL, this.CACHE_DURATION);
    if (cached) {
      console.log('[BLOG SERVICE] Returning cached blog posts');
      return of(cached);
    }

    // Fetch from API
    console.log('[BLOG SERVICE] Fetching blog posts from API:', this.apiUrl);
    return this.http.get<BlogPost[]>(this.apiUrl).pipe(
      tap(posts => {
        this.cache.set(this.CACHE_KEY_ALL, posts, this.CACHE_DURATION);
        console.log('[BLOG SERVICE] Blog posts fetched and cached');
      }),
      catchError(error => {
        console.error('[BLOG SERVICE] Failed to fetch blog posts:', error);
        throw error;
      })
    );
  }

  /**
   * Get specific blog post by slug (with caching)
   */
  getBlogBySlug(slug: string): Observable<BlogPost> {
    const cacheKey = this.CACHE_KEY_PREFIX + slug;
    
    // Check cache
    const cached = this.cache.get<BlogPost>(cacheKey, this.CACHE_DURATION);
    if (cached) {
      console.log(`[BLOG SERVICE] Returning cached blog post: ${slug}`);
      return of(cached);
    }

    // Fetch from API
    console.log(`[BLOG SERVICE] Fetching blog post from API: ${slug}`);
    return this.http.get<BlogPost>(`${this.apiUrl}/${slug}`).pipe(
      tap(post => {
        this.cache.set(cacheKey, post, this.CACHE_DURATION);
        console.log(`[BLOG SERVICE] Blog post '${slug}' fetched and cached`);
      }),
      catchError(error => {
        console.error(`[BLOG SERVICE] Failed to fetch blog post ${slug}:`, error);
        throw error;
      })
    );
  }

  /**
   * Force refresh all blog posts (bypass cache)
   */
  refreshBlogs(): Observable<BlogPost[]> {
    console.log('[BLOG SERVICE] Force refresh - clearing cache');
    this.cache.remove(this.CACHE_KEY_ALL);
    return this.getBlogs();
  }

  /**
   * Force refresh specific blog post (bypass cache)
   */
  refreshBlog(slug: string): Observable<BlogPost> {
    console.log(`[BLOG SERVICE] Force refresh blog: ${slug}`);
    this.cache.remove(this.CACHE_KEY_PREFIX + slug);
    return this.getBlogBySlug(slug);
  }
}


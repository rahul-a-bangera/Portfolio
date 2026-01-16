import { Injectable } from '@angular/core';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

/**
 * CacheService - LocalStorage-based caching for API responses
 * Minimizes API calls to Cloudflare Workers KV
 */
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
        console.log(`[CACHE] Expired: ${key}`);
        return null;
      }

      console.log(`[CACHE] Hit: ${key} (age: ${Math.round((now - entry.timestamp) / 1000)}s)`);
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
      console.log(`[CACHE] Set: ${key} (expires in ${Math.round(expiresIn / 1000)}s)`);
    } catch (error) {
      console.error('[CACHE] Set error:', error);
      // If localStorage is full, clear old entries
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('[CACHE] Storage quota exceeded, clearing old entries');
        this.clearExpired();
        
        // Retry after clearing
        try {
          const cacheKey = this.CACHE_PREFIX + key;
          const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now(),
            expiresIn
          };
          localStorage.setItem(cacheKey, JSON.stringify(entry));
        } catch (retryError) {
          console.error('[CACHE] Failed to set cache after cleanup:', retryError);
        }
      }
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
    let count = 0;
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key);
        count++;
      }
    });
    console.log(`[CACHE] Cleared ${count} cache entries`);
  }

  /**
   * Clear only expired cache entries
   */
  clearExpired(): void {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    let count = 0;

    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const entry: CacheEntry<any> = JSON.parse(cached);
            if (now - entry.timestamp > entry.expiresIn) {
              localStorage.removeItem(key);
              count++;
            }
          }
        } catch (error) {
          // Invalid entry, remove it
          localStorage.removeItem(key);
          count++;
        }
      }
    });

    console.log(`[CACHE] Cleared ${count} expired entries`);
  }

  /**
   * Get cache statistics
   */
  getStats(): { totalEntries: number; totalSize: number; entries: Array<{key: string; age: number; size: number}> } {
    const keys = Object.keys(localStorage);
    let totalSize = 0;
    const entries: Array<{key: string; age: number; size: number}> = [];
    const now = Date.now();

    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        const value = localStorage.getItem(key);
        if (value) {
          const size = value.length;
          totalSize += size;
          
          try {
            const entry: CacheEntry<any> = JSON.parse(value);
            const age = Math.round((now - entry.timestamp) / 1000); // age in seconds
            entries.push({
              key: key.replace(this.CACHE_PREFIX, ''),
              age,
              size
            });
          } catch (error) {
            entries.push({
              key: key.replace(this.CACHE_PREFIX, ''),
              age: -1,
              size
            });
          }
        }
      }
    });

    return { 
      totalEntries: entries.length, 
      totalSize: Math.round(totalSize / 1024), // size in KB
      entries 
    };
  }

  /**
   * Check if a key exists in cache and is not expired
   */
  has(key: string, maxAge: number = 3600000): boolean {
    return this.get(key, maxAge) !== null;
  }
}

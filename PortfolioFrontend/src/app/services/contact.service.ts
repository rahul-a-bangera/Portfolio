import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ContactInfo } from '../models/contact.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly CACHE_KEY = 'contact_info';
  private readonly CACHE_DURATION = 3600000; // 1 hour
  private apiUrl = `${environment.apiUrl}/contact`;

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  /**
   * Get contact information (with caching)
   */
  getContactInfo(): Observable<ContactInfo> {
    // Check cache
    const cached = this.cache.get<ContactInfo>(this.CACHE_KEY, this.CACHE_DURATION);
    if (cached) {
      console.log('[CONTACT SERVICE] Returning cached contact info');
      return of(cached);
    }

    // Fetch from API
    console.log('[CONTACT SERVICE] Fetching contact info from API:', this.apiUrl);
    return this.http.get<ContactInfo>(this.apiUrl).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY, data, this.CACHE_DURATION);
        console.log('[CONTACT SERVICE] Contact info fetched and cached');
      }),
      catchError(error => {
        console.error('[CONTACT SERVICE] Failed to fetch contact info:', error);
        throw error;
      })
    );
  }

  /**
   * Force refresh contact info (bypass cache)
   */
  refreshContactInfo(): Observable<ContactInfo> {
    console.log('[CONTACT SERVICE] Force refresh - clearing cache');
    this.cache.remove(this.CACHE_KEY);
    return this.getContactInfo();
  }
}


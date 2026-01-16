import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ResumeData } from '../models/resume.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly CACHE_KEY = 'resume_data';
  private readonly CACHE_DURATION = 3600000; // 1 hour
  private apiUrl = `${environment.apiUrl}/resume`;

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  /**
   * Get resume data (with caching)
   * First checks localStorage cache, then fetches from API if needed
   */
  getResume(): Observable<ResumeData> {
    // Check cache first
    const cached = this.cache.get<ResumeData>(this.CACHE_KEY, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached data');
      return of(cached);
    }

    // Fetch from API
    console.log('[RESUME SERVICE] Fetching from API:', this.apiUrl);
    return this.http.get<ResumeData>(this.apiUrl).pipe(
      tap(data => {
        // Cache the response
        this.cache.set(this.CACHE_KEY, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Data fetched and cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch resume:', error);
        throw error;
      })
    );
  }

  /**
   * Force refresh resume data (bypass cache)
   */
  refreshResume(): Observable<ResumeData> {
    console.log('[RESUME SERVICE] Force refresh - clearing cache');
    this.cache.remove(this.CACHE_KEY);
    return this.getResume();
  }
}


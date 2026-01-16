import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ResumeData } from '../models/resume.model';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly CACHE_KEY = 'resume_data';
  private readonly CACHE_KEY_PERSONAL = 'resume_personal';
  private readonly CACHE_KEY_SUMMARY = 'resume_summary';
  private readonly CACHE_KEY_SKILLS = 'resume_skills';
  private readonly CACHE_KEY_TOOLS = 'resume_tools';
  private readonly CACHE_KEY_EXPERIENCE = 'resume_experience';
  private readonly CACHE_KEY_EDUCATION = 'resume_education';
  private readonly CACHE_DURATION = 3600000; // 1 hour
  private apiUrl = `${environment.apiUrl}/resume`;

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  /**
   * Get personal info and short summary (for home page)
   * Minimal data, loads fast
   */
  getPersonalInfo(): Observable<any> {
    // Check cache first
    const cached = this.cache.get<any>(this.CACHE_KEY_PERSONAL, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached personal info');
      return of(cached);
    }

    // Fetch from API
    console.log('[RESUME SERVICE] Fetching personal info from API');
    return this.http.get<any>(`${this.apiUrl}/personal`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_PERSONAL, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Personal info cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch personal info:', error);
        throw error;
      })
    );
  }

  /**
   * Get full resume data (legacy method for backward compatibility)
   * Use section-specific methods for better performance
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
   * Get resume summary (for Summary tab)
   */
  getSummary(): Observable<{ summary: string }> {
    const cached = this.cache.get<{ summary: string }>(this.CACHE_KEY_SUMMARY, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached summary');
      return of(cached);
    }

    console.log('[RESUME SERVICE] Fetching summary from API');
    return this.http.get<{ summary: string }>(`${this.apiUrl}/summary`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_SUMMARY, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Summary cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch summary:', error);
        throw error;
      })
    );
  }

  /**
   * Get skills (for Skills tab)
   */
  getSkills(): Observable<{ skills: any }> {
    const cached = this.cache.get<{ skills: any }>(this.CACHE_KEY_SKILLS, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached skills');
      return of(cached);
    }

    console.log('[RESUME SERVICE] Fetching skills from API');
    return this.http.get<{ skills: any }>(`${this.apiUrl}/skills`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_SKILLS, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Skills cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch skills:', error);
        throw error;
      })
    );
  }

  /**
   * Get tools (for Tools tab)
   */
  getTools(): Observable<{ tools: any[] }> {
    const cached = this.cache.get<{ tools: any[] }>(this.CACHE_KEY_TOOLS, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached tools');
      return of(cached);
    }

    console.log('[RESUME SERVICE] Fetching tools from API');
    return this.http.get<{ tools: any[] }>(`${this.apiUrl}/tools`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_TOOLS, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Tools cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch tools:', error);
        throw error;
      })
    );
  }

  /**
   * Get experience (for Experience tab)
   */
  getExperience(): Observable<{ experience: any[] }> {
    const cached = this.cache.get<{ experience: any[] }>(this.CACHE_KEY_EXPERIENCE, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached experience');
      return of(cached);
    }

    console.log('[RESUME SERVICE] Fetching experience from API');
    return this.http.get<{ experience: any[] }>(`${this.apiUrl}/experience`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_EXPERIENCE, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Experience cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch experience:', error);
        throw error;
      })
    );
  }

  /**
   * Get education (for Education tab)
   */
  getEducation(): Observable<{ education: any[] }> {
    const cached = this.cache.get<{ education: any[] }>(this.CACHE_KEY_EDUCATION, this.CACHE_DURATION);
    if (cached) {
      console.log('[RESUME SERVICE] Returning cached education');
      return of(cached);
    }

    console.log('[RESUME SERVICE] Fetching education from API');
    return this.http.get<{ education: any[] }>(`${this.apiUrl}/education`).pipe(
      tap(data => {
        this.cache.set(this.CACHE_KEY_EDUCATION, data, this.CACHE_DURATION);
        console.log('[RESUME SERVICE] Education cached');
      }),
      catchError(error => {
        console.error('[RESUME SERVICE] Failed to fetch education:', error);
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

  /**
   * Clear all resume caches
   */
  clearAllCaches(): void {
    this.cache.remove(this.CACHE_KEY);
    this.cache.remove(this.CACHE_KEY_PERSONAL);
    this.cache.remove(this.CACHE_KEY_SUMMARY);
    this.cache.remove(this.CACHE_KEY_SKILLS);
    this.cache.remove(this.CACHE_KEY_TOOLS);
    this.cache.remove(this.CACHE_KEY_EXPERIENCE);
    this.cache.remove(this.CACHE_KEY_EDUCATION);
    console.log('[RESUME SERVICE] All caches cleared');
  }
}


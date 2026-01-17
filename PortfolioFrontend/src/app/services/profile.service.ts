import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ProfileData {
  name: string;
  specialistContent: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.useLocalData 
    ? '/assets/data/local/profile.json' 
    : `${environment.apiUrl}/profile`;
  private cacheKey = 'portfolio_profile_cache';
  private cacheExpiry = 3600000; // 1 hour in milliseconds
  private profileSubject = new BehaviorSubject<ProfileData | null>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFromCache();
  }

  /**
   * Get profile data (name and specialist content)
   * Uses in-memory cache and localStorage for optimal performance
   */
  getProfile(): Observable<ProfileData> {
    // Check if we already have data in memory
    const currentProfile = this.profileSubject.value;
    if (currentProfile) {
      console.log('[PROFILE] Returning cached profile data from memory');
      return of(currentProfile);
    }

    // Check localStorage cache
    const cachedData = this.getCachedData();
    if (cachedData) {
      console.log('[PROFILE] Returning cached profile data from localStorage');
      this.profileSubject.next(cachedData);
      return of(cachedData);
    }

    // Fetch from API
    console.log('[PROFILE] Fetching profile data from API...');
    return this.http.get<ProfileData>(this.apiUrl).pipe(
      tap(data => {
        console.log('[PROFILE] Profile data fetched successfully:', data);
        this.setCachedData(data);
        this.profileSubject.next(data);
      }),
      catchError(error => {
        console.error('[PROFILE] Error fetching profile data:', error);
        // Return fallback data
        const fallback: ProfileData = {
          name: 'Rahul A Bangera',
          specialistContent: 'Software Developer | .NET & Azure Specialist'
        };
        this.profileSubject.next(fallback);
        return of(fallback);
      })
    );
  }

  /**
   * Clear cache and refresh profile data
   */
  refreshProfile(): Observable<ProfileData> {
    this.clearCache();
    this.profileSubject.next(null);
    return this.getProfile();
  }

  /**
   * Load profile from localStorage cache
   */
  private loadFromCache(): void {
    const cachedData = this.getCachedData();
    if (cachedData) {
      this.profileSubject.next(cachedData);
    }
  }

  /**
   * Get cached profile data from localStorage
   */
  private getCachedData(): ProfileData | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < this.cacheExpiry) {
        return data;
      }

      // Cache expired, remove it
      this.clearCache();
      return null;
    } catch (error) {
      console.error('[PROFILE] Error reading cache:', error);
      this.clearCache();
      return null;
    }
  }

  /**
   * Store profile data in localStorage cache
   */
  private setCachedData(data: ProfileData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('[PROFILE] Error setting cache:', error);
    }
  }

  /**
   * Clear profile cache
   */
  private clearCache(): void {
    try {
      localStorage.removeItem(this.cacheKey);
    } catch (error) {
      console.error('[PROFILE] Error clearing cache:', error);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from '../utils/cookie.service';

export interface AmbientSettings {
  systemStats: boolean;
  clickSpark: boolean;
  dotGrid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AmbientControlService {
  private readonly COOKIE_NAME = 'ambient_settings';
  private readonly COOKIE_EXPIRES = 365; // 1 year

  private defaultSettings: AmbientSettings = {
    systemStats: true, // System stats enabled by default
    clickSpark: true, // Click spark enabled by default
    dotGrid: true // Dot grid enabled by default
  };

  private ambientSettingsSubject = new BehaviorSubject<AmbientSettings>(this.defaultSettings);
  public ambientSettings$: Observable<AmbientSettings> = this.ambientSettingsSubject.asObservable();

  constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedSettings = CookieService.get(this.COOKIE_NAME);
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        // Merge with defaults to ensure new properties exist
        this.ambientSettingsSubject.next({ ...this.defaultSettings, ...settings });
      } catch (e) {
        console.error('Failed to parse ambient settings from cookie', e);
      }
    }
  }

  private updateSettings(settings: AmbientSettings): void {
    this.ambientSettingsSubject.next(settings);
    CookieService.set(this.COOKIE_NAME, JSON.stringify(settings), {
      expires: this.COOKIE_EXPIRES,
      path: '/',
      sameSite: 'lax'
    });
  }

  toggleSystemStats(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, systemStats: !current.systemStats };
    this.updateSettings(updated);
  }

  toggleClickSpark(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, clickSpark: !current.clickSpark };
    this.updateSettings(updated);
  }

  toggleDotGrid(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, dotGrid: !current.dotGrid };
    this.updateSettings(updated);
  }

  toggleAll(enabled: boolean): void {
    const updated: AmbientSettings = {
      systemStats: enabled,
      clickSpark: enabled,
      dotGrid: enabled,
    };
    this.updateSettings(updated);
  }

  getSettings(): AmbientSettings {
    return this.ambientSettingsSubject.value;
  }

  isAllEnabled(): boolean {
    const settings = this.ambientSettingsSubject.value;
    return settings.systemStats && settings.clickSpark && settings.dotGrid;
  }

  isAnyEnabled(): boolean {
    const settings = this.ambientSettingsSubject.value;
    return settings.systemStats || settings.clickSpark || settings.dotGrid;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from '../utils/cookie.service';

export interface AmbientSettings {
  matrixRain: boolean;
  matrixRainWidth: number; // Width in pixels (default 190)
  terminalLogs: boolean;
  systemStats: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AmbientControlService {
  private readonly COOKIE_NAME = 'ambient_settings';
  private readonly COOKIE_EXPIRES = 365; // 1 year
  private readonly MIN_WIDTH = 100;
  private readonly MAX_WIDTH = 350;
  private readonly DEFAULT_WIDTH = 190;

  private defaultSettings: AmbientSettings = {
    matrixRain: true,
    matrixRainWidth: this.DEFAULT_WIDTH,
    terminalLogs: true,
    systemStats: true
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
        // Ensure matrixRainWidth is within bounds
        if (settings.matrixRainWidth) {
          settings.matrixRainWidth = this.clampWidth(settings.matrixRainWidth);
        }
        this.ambientSettingsSubject.next({ ...this.defaultSettings, ...settings });
      } catch (e) {
        console.error('Failed to parse ambient settings from cookie', e);
      }
    }
  }

  private clampWidth(width: number): number {
    return Math.max(this.MIN_WIDTH, Math.min(this.MAX_WIDTH, width));
  }

  toggleMatrixRain(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, matrixRain: !current.matrixRain };
    this.updateSettings(updated);
  }

  setMatrixRainWidth(width: number): void {
    const clampedWidth = this.clampWidth(width);
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, matrixRainWidth: clampedWidth };
    this.updateSettings(updated);
  }

  toggleTerminalLogs(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, terminalLogs: !current.terminalLogs };
    this.updateSettings(updated);
  }

  toggleSystemStats(): void {
    const current = this.ambientSettingsSubject.value;
    const updated = { ...current, systemStats: !current.systemStats };
    this.updateSettings(updated);
  }

  toggleAll(enabled: boolean): void {
    const current = this.ambientSettingsSubject.value;
    const updated: AmbientSettings = {
      matrixRain: enabled,
      matrixRainWidth: current.matrixRainWidth, // Preserve width setting
      terminalLogs: enabled,
      systemStats: enabled
    };
    this.updateSettings(updated);
  }

  private updateSettings(settings: AmbientSettings): void {
    this.ambientSettingsSubject.next(settings);
    CookieService.set(this.COOKIE_NAME, JSON.stringify(settings), {
      expires: this.COOKIE_EXPIRES,
      path: '/',
      sameSite: 'lax'
    });
  }

  getSettings(): AmbientSettings {
    return this.ambientSettingsSubject.value;
  }

  getMinWidth(): number {
    return this.MIN_WIDTH;
  }

  getMaxWidth(): number {
    return this.MAX_WIDTH;
  }

  getDefaultWidth(): number {
    return this.DEFAULT_WIDTH;
  }

  isAllEnabled(): boolean {
    const settings = this.ambientSettingsSubject.value;
    return settings.matrixRain && settings.terminalLogs && settings.systemStats;
  }

  isAnyEnabled(): boolean {
    const settings = this.ambientSettingsSubject.value;
    return settings.matrixRain || settings.terminalLogs || settings.systemStats;
  }
}

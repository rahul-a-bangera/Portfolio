import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AmbientControlService, AmbientSettings } from '../services/ambient-control.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
  template: `
    <footer class="footer-container">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-text">© 2024 Rahul A. All rights reserved.</span>
        </div>
        
        <div class="footer-center">
          <div class="ambient-control">
            <button class="toggle-button" (click)="toggleMenu()">
              <mat-icon class="toggle-icon">settings_input_component</mat-icon>
              <span class="toggle-label">Ambient Effects</span>
              <mat-icon class="expand-icon">{{ menuOpen ? 'expand_less' : 'expand_more' }}</mat-icon>
            </button>
            
            <div class="ambient-menu" [class.open]="menuOpen">
              
              <div class="ambient-option">
                <span class="option-label">System Stats</span>
                <mat-slide-toggle
                  [checked]="settings.systemStats"
                  (change)="toggleSystemStats()"
                  color="primary"
                  class="custom-toggle">
                </mat-slide-toggle>
              </div>
              
              <div class="ambient-option">
                <span class="option-label">Click Spark</span>
                <mat-slide-toggle
                  [checked]="settings.clickSpark"
                  (change)="toggleClickSpark()"
                  color="primary"
                  class="custom-toggle">
                </mat-slide-toggle>
              </div>
              
              <div class="ambient-option">
                <span class="option-label">Dot Grid</span>
                <mat-slide-toggle
                  [checked]="settings.dotGrid"
                  (change)="toggleDotGrid()"
                  color="primary"
                  class="custom-toggle">
                </mat-slide-toggle>
              </div>
              
              <div class="ambient-option all-toggle">
                <span class="option-label">Toggle All</span>
                <mat-slide-toggle
                  [checked]="isAllEnabled"
                  (change)="toggleAll()"
                  color="primary"
                  class="custom-toggle">
                </mat-slide-toggle>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-right">
          <a href="https://github.com/rahul-a-bangera" target="_blank" rel="noopener noreferrer" class="footer-link">
            <mat-icon>code</mat-icon>
          </a>
          <a href="https://www.linkedin.com/in/rahul-bangera/" target="_blank" rel="noopener noreferrer" class="footer-link">
            <mat-icon>business</mat-icon>
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      position: relative;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 15, 30, 0.95);
      border-top: 1px solid rgba(0, 255, 150, 0.2);
      padding: 20px;
      z-index: 10;
      backdrop-filter: blur(10px);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .footer-left,
    .footer-right {
      flex: 1;
    }

    .footer-center {
      flex: 1;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .footer-text {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }

    .ambient-control {
      position: relative;
    }

    .toggle-button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: rgba(0, 255, 150, 0.05);
      border: 1px solid rgba(0, 255, 150, 0.2);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .toggle-button:hover {
      background: rgba(0, 255, 150, 0.1);
      border-color: rgba(0, 255, 150, 0.4);
      box-shadow: 0 0 15px rgba(0, 255, 150, 0.2);
    }

    .toggle-icon {
      color: #00ff96;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .expand-icon {
      color: rgba(0, 255, 150, 0.6);
      font-size: 20px;
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    .toggle-label {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 11px;
      color: rgba(0, 255, 150, 0.8);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .ambient-menu {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      margin-bottom: 10px;
      background: rgba(15, 15, 30, 0.98);
      border: 1px solid rgba(0, 255, 150, 0.3);
      border-radius: 8px;
      padding: 12px;
      min-width: 260px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      box-shadow: 0 0 30px rgba(0, 255, 150, 0.3);
      backdrop-filter: blur(10px);
    }

    .ambient-menu.open {
      opacity: 1;
      pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }

    .ambient-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      margin-bottom: 8px;
      background: rgba(0, 255, 150, 0.03);
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .ambient-option:hover {
      background: rgba(0, 255, 150, 0.08);
    }

    .ambient-option:last-child {
      margin-bottom: 0;
    }

    .ambient-option.all-toggle {
      border-top: 1px solid rgba(0, 255, 150, 0.2);
      margin-top: 8px;
      padding-top: 12px;
      background: rgba(0, 255, 150, 0.08);
    }

    .option-label {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 11px;
      color: rgba(0, 255, 150, 0.8);
      letter-spacing: 0.3px;
    }

    .slider-option {
      padding: 12px;
      margin-bottom: 8px;
      background: rgba(0, 255, 150, 0.05);
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 150, 0.15);
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .slider-label {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 10px;
      color: rgba(0, 255, 150, 0.7);
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }

    .slider-value {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 10px;
      color: #00ff96;
      font-weight: 600;
    }

    ::ng-deep .width-slider {
      width: 100%;
    }

    ::ng-deep .width-slider .mdc-slider__track {
      height: 4px;
    }

    ::ng-deep .width-slider .mdc-slider__track--inactive {
      background-color: rgba(255, 255, 255, 0.2);
    }

    ::ng-deep .width-slider .mdc-slider__track--active_fill {
      background-color: #00ff96;
      border-color: #00ff96;
    }

    ::ng-deep .width-slider .mdc-slider__thumb-knob {
      background-color: #00ff96;
      border-color: #00ff96;
      box-shadow: 0 0 10px rgba(0, 255, 150, 0.5);
    }

    ::ng-deep .width-slider .mdc-slider__value-indicator {
      background-color: #00ff96;
      color: #0f0f1e;
    }

    ::ng-deep .custom-toggle .mdc-switch {
      width: 36px;
      height: 20px;
    }

    ::ng-deep .custom-toggle .mdc-switch__track {
      height: 14px;
      border-radius: 7px;
    }

    ::ng-deep .custom-toggle .mdc-switch__handle {
      width: 18px;
      height: 18px;
    }

    ::ng-deep .custom-toggle.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::after {
      background: rgba(0, 255, 150, 0.3);
    }

    ::ng-deep .custom-toggle.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::before {
      background: rgba(255, 255, 255, 0.2);
    }

    ::ng-deep .custom-toggle.mat-mdc-slide-toggle.mat-checked .mdc-switch:enabled .mdc-switch__track::after {
      background: #00ff96;
    }

    ::ng-deep .custom-toggle.mat-mdc-slide-toggle.mat-checked .mdc-switch:enabled .mdc-switch__handle::after {
      background: #0f0f1e;
    }

    .footer-right {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .footer-link {
      width: 36px;
      height: 36px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 255, 150, 0.1);
      color: #00ff96;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 255, 150, 0.3);
    }

    .footer-link:hover {
      background: rgba(0, 255, 150, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(0, 255, 150, 0.4);
      border-color: #00ff96;
    }

    .footer-link mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .footer-container {
        display: none;
      }

      .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }

      .footer-left,
      .footer-center,
      .footer-right {
        flex: none;
        width: 100%;
        justify-content: center;
      }

      .footer-right {
        justify-content: center;
      }

      .footer-text {
        font-size: 11px;
      }

      .toggle-label {
        font-size: 10px;
      }

      .footer-link {
        width: 32px;
        height: 32px;
      }

      .footer-link mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .ambient-menu {
        left: 50%;
        transform: translateX(-50%);
        min-width: 240px;
      }

      .ambient-menu.open {
        transform: translateX(-50%) translateY(0);
      }
    }
  `]
})
export class FooterComponent {
  menuOpen = false;
  settings: AmbientSettings = {
    systemStats: true,
    clickSpark: true,
    dotGrid: true
  };
  isAllEnabled = true;

  constructor(private ambientService: AmbientControlService) {
    this.ambientService.ambientSettings$.subscribe(settings => {
      this.settings = settings;
      this.isAllEnabled = this.ambientService.isAllEnabled();
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSystemStats(): void {
    this.ambientService.toggleSystemStats();
  }

  toggleClickSpark(): void {
    this.ambientService.toggleClickSpark();
  }

  toggleDotGrid(): void {
    this.ambientService.toggleDotGrid();
  }

  toggleAll(): void {
    const newState = !this.isAllEnabled;
    this.ambientService.toggleAll(newState);
  }
}

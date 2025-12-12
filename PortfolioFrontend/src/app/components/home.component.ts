import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TerminalLogsComponent } from './ambient/terminal-logs.component';
import { MatrixRainComponent } from './ambient/matrix-rain.component';
import { SystemStatsComponent } from './ambient/system-stats.component';
import { AmbientControlService, AmbientSettings } from '../services/ambient-control.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    TerminalLogsComponent,
    MatrixRainComponent,
    SystemStatsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  showContactPopup = false;
  emailId = 'rahul.bangera.999@gmail.com';
  mobileNo = '9663885365';
  showCopiedMessage = false;
  copiedMessageText = '';
  ambientSettings: AmbientSettings = {
    matrixRain: true,
    matrixRainWidth: 190,
    terminalLogs: true,
    systemStats: true
  };
  private scrollThreshold = 50;
  private lastScrollPosition = 0;

  constructor(private ambientService: AmbientControlService) {
    this.ambientService.ambientSettings$.subscribe(settings => {
      this.ambientSettings = settings;
    });
  }

  ngOnInit(): void {
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  }

  ngOnDestroy(): void {
    // Cleanup is handled by Angular for HostListener
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.showContactPopup) {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDifference = Math.abs(currentScrollPosition - this.lastScrollPosition);
      
      if (scrollDifference > this.scrollThreshold) {
        this.closeContactPopup();
        this.lastScrollPosition = currentScrollPosition;
      }
    } else {
      this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    }
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/Rahul-A-Resume.pdf';
    link.download = 'Rahul-A-Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  toggleContactPopup(): void {
    this.showContactPopup = !this.showContactPopup;
    if (this.showContactPopup) {
      this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    }
  }

  closeContactPopup(): void {
    this.showContactPopup = false;
    this.showCopiedMessage = false;
  }

  copyToClipboard(text: string, label: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedMessageText = `${label} copied to clipboard!`;
      this.showCopiedMessage = true;
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}

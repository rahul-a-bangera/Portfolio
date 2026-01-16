import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { SystemStatsComponent } from './ambient/system-stats.component';
import { ClickSparkComponent } from './ambient/click-spark.component';
import { DotGridComponent } from './ambient/dot-grid.component';
import { ContactService } from '../services/contact.service';
import { ResumeService } from '../services/resume.service';
import { AmbientControlService, AmbientSettings } from '../services/ambient-control.service';
import { ContactInfo } from '../models/contact.model';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SystemStatsComponent,
    ClickSparkComponent,
    DotGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
showContactPopup = false;
emailId = '';
mobileNo = '';
showCopiedMessage = false;
copiedMessageText = '';
isLoadingContact = false;
contactError = false;
resumeData: ResumeData | null = null;
isLoadingResume = false;
resumeError = false;
ambientSettings: AmbientSettings = {
  systemStats: true,
  clickSpark: true,
  dotGrid: true
};
private scrollThreshold = 50;
private lastScrollPosition = 0;
private settingsSubscription?: Subscription;
private contactSubscription?: Subscription;
private resumeSubscription?: Subscription;

constructor(
  private ambientService: AmbientControlService,
  private contactService: ContactService,
  private resumeService: ResumeService
) {
  this.settingsSubscription = this.ambientService.ambientSettings$.subscribe(settings => {
    this.ambientSettings = settings;
  });
}

ngOnInit(): void {
  this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  this.loadContactInfo();
  this.loadResumeData();
}

ngOnDestroy(): void {
  if (this.settingsSubscription) {
    this.settingsSubscription.unsubscribe();
  }
  if (this.contactSubscription) {
    this.contactSubscription.unsubscribe();
  }
  if (this.resumeSubscription) {
    this.resumeSubscription.unsubscribe();
  }
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
    link.href = 'assets/resume.pdf';  // Generic filename
    link.download = 'resume.pdf';
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

  getInitials(): string {
    if (!this.resumeData?.personalInfo?.name) {
      return '?';
    }
    return this.resumeData.personalInfo.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  private loadContactInfo(): void {
    this.isLoadingContact = true;
    this.contactError = false;
    
    this.contactSubscription = this.contactService.getContactInfo().subscribe({
      next: (contactInfo: ContactInfo) => {
        this.emailId = contactInfo.email;
        this.mobileNo = contactInfo.phone;
        this.isLoadingContact = false;
      },
      error: (error) => {
        console.error('[HOME] Failed to load contact information:', error);
        this.contactError = true;
        this.isLoadingContact = false;
      }
    });
  }

  private loadResumeData(): void {
    this.isLoadingResume = true;
    this.resumeError = false;
    
    this.resumeSubscription = this.resumeService.getResume().subscribe({
      next: (data: ResumeData) => {
        this.resumeData = data;
        this.isLoadingResume = false;
        console.log('[HOME] Resume data loaded successfully');
      },
      error: (error) => {
        console.error('[HOME] Failed to load resume data:', error);
        this.resumeError = true;
        this.isLoadingResume = false;
      }
    });
  }
}

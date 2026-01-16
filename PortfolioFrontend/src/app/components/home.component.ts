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
profileImageUrl: string | null = null;
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
  this.loadProfileImage();
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
    // Fetch PDF from API instead of local assets
    const apiUrl = 'https://portfolio-api.rahul-a-works.workers.dev/assets/resume';
    console.log('[HOME] Downloading CV from API...');
    window.open(apiUrl, '_blank');
  }

  private loadProfileImage(): void {
    // Try to load profile picture from API
    // If it fails, will fallback to initials avatar
    this.profileImageUrl = 'https://portfolio-api.rahul-a-works.workers.dev/assets/profile';
  }

  onProfileImageError(): void {
    // If profile image fails to load, set to null to show initials
    console.log('[HOME] Profile image not available, showing initials');
    this.profileImageUrl = null;
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
    
    // Use getPersonalInfo() for faster home page load
    this.resumeSubscription = this.resumeService.getPersonalInfo().subscribe({
      next: (data: any) => {
        // Transform personal info data to match ResumeData interface
        this.resumeData = {
          personalInfo: data.personalInfo,
          shortSummary: data.shortSummary,
          summary: '', // Not needed for home page
          skills: { technical: [], frontend: [], backend: [], cloud: [], database: [], tools: [] },
          tools: [],
          experience: [],
          education: []
        };
        this.isLoadingResume = false;
        console.log('[HOME] Personal info loaded successfully');
      },
      error: (error) => {
        console.error('[HOME] Failed to load personal info:', error);
        this.resumeError = true;
        this.isLoadingResume = false;
      }
    });
  }
}

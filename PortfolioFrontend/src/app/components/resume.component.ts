import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ResumeService } from '../services/resume.service';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit, OnDestroy {
  resumeData: ResumeData | null = null;
  isLoading = true;
  hasError = false;
  private resumeSubscription?: Subscription;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.loadResumeData();
  }

  ngOnDestroy(): void {
    if (this.resumeSubscription) {
      this.resumeSubscription.unsubscribe();
    }
  }

  private loadResumeData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.resumeSubscription = this.resumeService.getResume().subscribe({
      next: (data) => {
        this.resumeData = data;
        this.isLoading = false;
        console.log('[RESUME] Data loaded successfully');
      },
      error: (error) => {
        console.error('[RESUME] Error fetching resume data:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    });
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

  // Helper method to split summary into paragraphs
  getSummaryParagraphs(): string[] {
    if (!this.resumeData?.summary) {
      return [];
    }
    return this.resumeData.summary.split('\n\n').filter(p => p.trim().length > 0);
  }
}


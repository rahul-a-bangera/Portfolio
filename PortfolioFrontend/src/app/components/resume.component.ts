import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
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
  resumeData: any = {
    summary: null,
    skills: null,
    tools: null,
    experience: null,
    education: null
  };
  
  loadingState: any = {
    summary: false,
    skills: false,
    tools: false,
    experience: false,
    education: false
  };
  
  errorState: any = {
    summary: false,
    skills: false,
    tools: false,
    experience: false,
    education: false
  };
  
  private subscriptions: Subscription[] = [];
  selectedTabIndex = 0;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    // Load summary tab by default
    this.loadSummary();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
    
    // Load data for the selected tab on-demand
    switch (event.index) {
      case 0: // Summary
        if (!this.resumeData.summary) {
          this.loadSummary();
        }
        break;
      case 1: // Skills
        if (!this.resumeData.skills) {
          this.loadSkills();
        }
        break;
      case 2: // Tools
        if (!this.resumeData.tools) {
          this.loadTools();
        }
        break;
      case 3: // Experience
        if (!this.resumeData.experience) {
          this.loadExperience();
        }
        break;
      case 4: // Education
        if (!this.resumeData.education) {
          this.loadEducation();
        }
        break;
    }
  }

  private loadSummary(): void {
    this.loadingState.summary = true;
    this.errorState.summary = false;
    
    const sub = this.resumeService.getSummary().subscribe({
      next: (data) => {
        this.resumeData.summary = data.summary;
        this.loadingState.summary = false;
        console.log('[RESUME] Summary loaded');
      },
      error: (error) => {
        console.error('[RESUME] Failed to load summary:', error);
        this.errorState.summary = true;
        this.loadingState.summary = false;
      }
    });
    this.subscriptions.push(sub);
  }

  private loadSkills(): void {
    this.loadingState.skills = true;
    this.errorState.skills = false;
    
    const sub = this.resumeService.getSkills().subscribe({
      next: (data) => {
        this.resumeData.skills = data.skills;
        this.loadingState.skills = false;
        console.log('[RESUME] Skills loaded');
      },
      error: (error) => {
        console.error('[RESUME] Failed to load skills:', error);
        this.errorState.skills = true;
        this.loadingState.skills = false;
      }
    });
    this.subscriptions.push(sub);
  }

  private loadTools(): void {
    this.loadingState.tools = true;
    this.errorState.tools = false;
    
    const sub = this.resumeService.getTools().subscribe({
      next: (data) => {
        this.resumeData.tools = data.tools;
        this.loadingState.tools = false;
        console.log('[RESUME] Tools loaded');
      },
      error: (error) => {
        console.error('[RESUME] Failed to load tools:', error);
        this.errorState.tools = true;
        this.loadingState.tools = false;
      }
    });
    this.subscriptions.push(sub);
  }

  private loadExperience(): void {
    this.loadingState.experience = true;
    this.errorState.experience = false;
    
    const sub = this.resumeService.getExperience().subscribe({
      next: (data) => {
        this.resumeData.experience = data.experience;
        this.loadingState.experience = false;
        console.log('[RESUME] Experience loaded');
      },
      error: (error) => {
        console.error('[RESUME] Failed to load experience:', error);
        this.errorState.experience = true;
        this.loadingState.experience = false;
      }
    });
    this.subscriptions.push(sub);
  }

  private loadEducation(): void {
    this.loadingState.education = true;
    this.errorState.education = false;
    
    const sub = this.resumeService.getEducation().subscribe({
      next: (data) => {
        this.resumeData.education = data.education;
        this.loadingState.education = false;
        console.log('[RESUME] Education loaded');
      },
      error: (error) => {
        console.error('[RESUME] Failed to load education:', error);
        this.errorState.education = true;
        this.loadingState.education = false;
      }
    });
    this.subscriptions.push(sub);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getSummaryParagraphs(): string[] {
    if (!this.resumeData.summary) {
      return [];
    }
    return this.resumeData.summary.split('\n\n').filter((p: string) => p.trim().length > 0);
  }
}


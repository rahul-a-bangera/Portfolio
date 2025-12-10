import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../services/resume.service';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  resumeData: ResumeData | null = null;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.resumeService.getResume().subscribe(
      data => {
        this.resumeData = data;
      },
      error => {
        console.error('Error fetching resume data:', error);
      }
    );
  }
}

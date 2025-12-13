import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { marked } from 'marked';
import { MarkdownBlogService } from '../services/markdown-blog.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="blog-detail-container">
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading blog post...</p>
      </div>

      <div *ngIf="!loading && post" class="blog-content">
        <header class="blog-header">
          <div class="header-back">
            <button mat-button class="back-button" (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              <span>Back to Blog</span>
            </button>
          </div>
          
          <h1 class="blog-title">{{ post.title }}</h1>
          
          <div class="blog-meta">
            <div class="meta-item">
              <mat-icon>calendar_today</mat-icon>
              <span>{{ post.createdDate | date: 'MMMM dd, yyyy' }}</span>
            </div>
            <div class="meta-item">
              <mat-icon>person</mat-icon>
              <span>{{ post.author }}</span>
            </div>
            <div class="meta-item" *ngIf="post.readTime">
              <mat-icon>schedule</mat-icon>
              <span>{{ post.readTime }} min read</span>
            </div>
          </div>

          <div class="blog-tags" *ngIf="post.tags && post.tags.length > 0">
            <span class="tag" *ngFor="let tag of post.tags">{{ tag }}</span>
          </div>
        </header>

        <mat-card class="content-card">
          <mat-card-content>
            <div class="markdown-content" [innerHTML]="renderedContent"></div>
          </mat-card-content>
        </mat-card>

        <footer class="blog-footer">
          <button mat-raised-button class="back-button-bottom" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            <span>Back to Blog</span>
          </button>
        </footer>
      </div>

      <div *ngIf="!loading && !post" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h2>Blog Post Not Found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <button mat-raised-button class="back-button" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          <span>Back to Blog</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .blog-detail-container {
      min-height: 100vh;
      background: #0f0f1e;
      padding: 40px 20px;
    }

    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      color: rgba(255, 255, 255, 0.8);
      gap: 20px;
    }

    .loading-container mat-spinner {
      margin-bottom: 20px;
    }

    .loading-container p {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 16px;
      color: #00ff96;
    }

    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #00ff96;
    }

    .error-container h2 {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      color: #00ff96;
      margin: 0;
    }

    .blog-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .blog-header {
      margin-bottom: 40px;
    }

    .header-back {
      margin-bottom: 24px;
    }

    .back-button {
      color: #00ff96 !important;
      border: 1px solid rgba(0, 255, 150, 0.3);
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .back-button:hover {
      background: rgba(0, 255, 150, 0.1);
      border-color: #00ff96;
      box-shadow: 0 0 15px rgba(0, 255, 150, 0.3);
    }

    .back-button mat-icon {
      margin-right: 8px;
    }

    .blog-title {
      font-size: 42px;
      font-weight: 700;
      color: #00ff96;
      margin: 0 0 24px 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      line-height: 1.2;
      text-shadow: 0 0 20px rgba(0, 255, 150, 0.4);
    }

    .blog-meta {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      color: rgba(0, 255, 150, 0.8);
    }

    .meta-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #00ff96;
    }

    .blog-tags {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .tag {
      background: rgba(0, 255, 150, 0.1);
      color: #00ff96;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid rgba(0, 255, 150, 0.3);
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }

    .content-card {
      background: rgba(26, 26, 46, 0.95) !important;
      border: 2px solid rgba(0, 255, 150, 0.2) !important;
      border-radius: 8px !important;
      box-shadow: 
        0 0 30px rgba(0, 255, 150, 0.2),
        inset 0 1px 0 rgba(0, 255, 150, 0.1) !important;
      backdrop-filter: blur(10px);
    }

    ::ng-deep .content-card .mat-mdc-card-content {
      padding: 40px;
    }

    .markdown-content {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      line-height: 1.8;
      font-family: 'Segoe UI', 'Roboto', sans-serif;
    }

    /* Markdown Styling */
    ::ng-deep .markdown-content h1,
    ::ng-deep .markdown-content h2,
    ::ng-deep .markdown-content h3,
    ::ng-deep .markdown-content h4,
    ::ng-deep .markdown-content h5,
    ::ng-deep .markdown-content h6 {
      color: #00ff96;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      margin-top: 32px;
      margin-bottom: 16px;
      line-height: 1.3;
    }

    ::ng-deep .markdown-content h1 {
      font-size: 32px;
      border-bottom: 2px solid rgba(0, 255, 150, 0.3);
      padding-bottom: 12px;
    }

    ::ng-deep .markdown-content h2 {
      font-size: 28px;
      border-bottom: 1px solid rgba(0, 255, 150, 0.2);
      padding-bottom: 8px;
    }

    ::ng-deep .markdown-content h3 {
      font-size: 24px;
    }

    ::ng-deep .markdown-content h4 {
      font-size: 20px;
    }

    ::ng-deep .markdown-content p {
      margin-bottom: 16px;
    }

    ::ng-deep .markdown-content a {
      color: #00ff96;
      text-decoration: none;
      border-bottom: 1px solid rgba(0, 255, 150, 0.3);
      transition: all 0.3s ease;
    }

    ::ng-deep .markdown-content a:hover {
      border-bottom-color: #00ff96;
      text-shadow: 0 0 10px rgba(0, 255, 150, 0.5);
    }

    ::ng-deep .markdown-content code {
      background: rgba(0, 0, 0, 0.4);
      color: #00ff96;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      border: 1px solid rgba(0, 255, 150, 0.2);
    }

    ::ng-deep .markdown-content pre {
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 255, 150, 0.3);
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      margin: 20px 0;
    }

    ::ng-deep .markdown-content pre code {
      background: none;
      border: none;
      padding: 0;
      color: rgba(0, 255, 150, 0.9);
      font-size: 14px;
      line-height: 1.6;
    }

    ::ng-deep .markdown-content ul,
    ::ng-deep .markdown-content ol {
      margin: 16px 0;
      padding-left: 32px;
    }

    ::ng-deep .markdown-content li {
      margin-bottom: 8px;
      line-height: 1.6;
    }

    ::ng-deep .markdown-content blockquote {
      border-left: 4px solid #00ff96;
      background: rgba(0, 255, 150, 0.05);
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
      font-style: italic;
      color: rgba(255, 255, 255, 0.8);
    }

    ::ng-deep .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      border: 1px solid rgba(0, 255, 150, 0.3);
    }

    ::ng-deep .markdown-content th,
    ::ng-deep .markdown-content td {
      padding: 12px;
      text-align: left;
      border: 1px solid rgba(0, 255, 150, 0.2);
    }

    ::ng-deep .markdown-content th {
      background: rgba(0, 255, 150, 0.1);
      color: #00ff96;
      font-weight: 600;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }

    ::ng-deep .markdown-content hr {
      border: none;
      border-top: 2px solid rgba(0, 255, 150, 0.3);
      margin: 32px 0;
    }

    ::ng-deep .markdown-content img {
      max-width: 100%;
      border-radius: 8px;
      border: 2px solid rgba(0, 255, 150, 0.3);
      margin: 20px 0;
    }

    .blog-footer {
      margin-top: 40px;
      padding-top: 40px;
      border-top: 2px solid rgba(0, 255, 150, 0.2);
      text-align: center;
    }

    .back-button-bottom {
      background: rgba(0, 255, 150, 0.1);
      color: #00ff96;
      border: 2px solid #00ff96;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 14px;
      padding: 12px 24px;
      transition: all 0.3s ease;
    }

    .back-button-bottom:hover {
      background: rgba(0, 255, 150, 0.2);
      box-shadow: 0 0 20px rgba(0, 255, 150, 0.4);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .blog-detail-container {
        padding: 20px 16px;
      }

      .blog-title {
        font-size: 28px;
      }

      .blog-meta {
        gap: 16px;
      }

      .meta-item {
        font-size: 12px;
      }

      ::ng-deep .content-card .mat-mdc-card-content {
        padding: 24px 20px;
      }

      .markdown-content {
        font-size: 15px;
      }

      ::ng-deep .markdown-content h1 {
        font-size: 24px;
      }

      ::ng-deep .markdown-content h2 {
        font-size: 20px;
      }

      ::ng-deep .markdown-content h3 {
        font-size: 18px;
      }

      ::ng-deep .markdown-content pre {
        padding: 12px;
        font-size: 13px;
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | null = null;
  renderedContent: string = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private markdownBlogService: MarkdownBlogService
  ) {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadBlogPost(slug);
    } else {
      this.loading = false;
    }
  }

  loadBlogPost(slug: string): void {
    this.markdownBlogService.getBlogBySlug(slug).subscribe({
      next: (post) => {
        this.post = post;
        if (post) {
          this.renderMarkdown(post.content);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blog post:', error);
        this.loading = false;
      }
    });
  }

  async renderMarkdown(content: string): Promise<void> {
    try {
      this.renderedContent = await marked.parse(content);
    } catch (error) {
      console.error('Error rendering markdown:', error);
      this.renderedContent = '<p>Error rendering blog content</p>';
    }
  }

  goBack(): void {
    window.close();
    // If window.close() doesn't work (can only close windows opened by script),
    // navigate back to the main site
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  }
}

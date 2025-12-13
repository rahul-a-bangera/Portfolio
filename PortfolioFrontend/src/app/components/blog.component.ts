import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownBlogService } from '../services/markdown-blog.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  allBlogPosts: BlogPost[] = [];
  paginatedBlogPosts: BlogPost[] = [];
  
  currentPage = 1;
  postsPerPage = 6; // Default for desktop
  totalPages = 1;

  constructor(private markdownBlogService: MarkdownBlogService) { }

  ngOnInit(): void {
    this.updatePostsPerPage();
    this.markdownBlogService.getAllBlogs().subscribe(
      data => {
        this.allBlogPosts = data.sort((a, b) => 
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        this.updatePagination();
      },
      error => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const oldPostsPerPage = this.postsPerPage;
    this.updatePostsPerPage();
    
    // Reset to page 1 if posts per page changed
    if (oldPostsPerPage !== this.postsPerPage) {
      this.currentPage = 1;
      this.updatePagination();
    }
  }

  updatePostsPerPage(): void {
    // Mobile: 1 post, Desktop: 6 posts
    this.postsPerPage = window.innerWidth <= 768 ? 1 : 6;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.allBlogPosts.length / this.postsPerPage);
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.paginatedBlogPosts = this.allBlogPosts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      // Scroll to top of blog section
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showPagination(): boolean {
    return this.allBlogPosts.length > this.postsPerPage;
  }

  viewBlog(slug: string): void {
    // Open blog post in new tab
    const url = `/blog/${slug}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

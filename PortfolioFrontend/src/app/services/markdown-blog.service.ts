import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';

interface BlogMetadata {
  title: string;
  slug: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class MarkdownBlogService {
  // List of blog post filenames (without .md extension)
  // ADD NEW BLOG POSTS HERE - just add the filename!
  private blogFiles = [
    'getting-started-angular-19',
    'building-restful-apis-dotnet-core',
    'css-grid-vs-flexbox',
    'web-performance-optimization',
    'microservices-azure-guide'
  ];

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<BlogPost[]> {
    const blogRequests = this.blogFiles.map(slug =>
      this.http.get(`assets/blog/${slug}.md`, { responseType: 'text' }).pipe(
        map(content => this.parseMarkdown(content, `${slug}.md`)),
        catchError(error => {
          console.error(`Error loading ${slug}.md:`, error);
          return of(null);
        })
      )
    );

    return forkJoin(blogRequests).pipe(
      map(blogs => blogs.filter(blog => blog !== null) as BlogPost[])
    );
  }

  getBlogBySlug(slug: string): Observable<BlogPost | null> {
    return this.http.get(`assets/blog/${slug}.md`, { responseType: 'text' }).pipe(
      map(content => this.parseMarkdown(content, `${slug}.md`)),
      catchError(error => {
        console.error(`Error loading ${slug}.md:`, error);
        return of(null);
      })
    );
  }

  private parseMarkdown(content: string, filename: string): BlogPost {
    const { metadata, body } = this.extractFrontmatter(content);
    
    return {
      id: this.getIdFromFilename(filename),
      title: metadata.title || 'Untitled',
      slug: metadata.slug || this.getSlugFromFilename(filename),
      summary: metadata.summary || '',
      content: body,
      createdDate: new Date(metadata.date || Date.now()),
      author: metadata.author || 'Unknown',
      category: metadata.category,
      tags: metadata.tags || [],
      readTime: metadata.readTime || 5
    };
  }

  private extractFrontmatter(content: string): { metadata: any; body: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { metadata: {}, body: content };
    }

    const frontmatter = match[1];
    const body = match[2]; // This is the actual markdown content without frontmatter
    const metadata: any = {};

    frontmatter.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((v: string) => v.trim().replace(/"/g, ''));
      }

      // Parse numbers
      if (!isNaN(Number(value)) && value !== '') {
        value = Number(value);
      }

      metadata[key] = value;
    });

    return { metadata, body };
  }

  private getIdFromFilename(filename: string): number {
    // Generate a simple hash from filename
    return filename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  private getSlugFromFilename(filename: string): string {
    return filename.replace('.md', '');
  }
}

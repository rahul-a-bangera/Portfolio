import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ContactService } from '../services/contact.service';
import { ContactInfo } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfo: ContactInfo | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe(
      data => {
        this.contactInfo = data;
      },
      error => {
        console.error('Error fetching contact info:', error);
      }
    );
  }

  getSocialLinks(): { name: string; url: string }[] {
    if (!this.contactInfo || !this.contactInfo.socialLinks) {
      return [];
    }
    return Object.entries(this.contactInfo.socialLinks).map(([name, url]) => ({
      name,
      url
    }));
  }

  getSocialIcon(platform: string): string {
    const iconMap: { [key: string]: string } = {
      'LinkedIn': 'business',
      'GitHub': 'code',
      'Twitter': 'public'
    };
    return iconMap[platform] || 'link';
  }
}

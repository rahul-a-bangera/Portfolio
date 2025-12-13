import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home.component';
import { ResumeComponent } from './resume.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeComponent,
    ResumeComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <app-home></app-home>
    <app-resume></app-resume>
    <app-blog></app-blog>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MainLayoutComponent {}

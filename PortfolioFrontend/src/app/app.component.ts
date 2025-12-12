import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HomeComponent } from './components/home.component';
import { ResumeComponent } from './components/resume.component';
import { BlogComponent } from './components/blog.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
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
export class AppComponent {
  title = 'portfolio-frontend';
}

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout.component';
import { BlogDetailComponent } from './components/blog-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

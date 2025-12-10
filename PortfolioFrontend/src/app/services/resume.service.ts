import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeData } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:5091/api/resume';

  constructor(private http: HttpClient) { }

  getResume(): Observable<ResumeData> {
    return this.http.get<ResumeData>(this.apiUrl);
  }
}

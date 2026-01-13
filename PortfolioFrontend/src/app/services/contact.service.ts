import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInfo } from '../models/contact.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) { }

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.apiUrl);
  }
}

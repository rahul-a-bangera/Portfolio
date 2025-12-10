import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInfo } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5091/api/contact';

  constructor(private http: HttpClient) { }

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.apiUrl);
  }
}

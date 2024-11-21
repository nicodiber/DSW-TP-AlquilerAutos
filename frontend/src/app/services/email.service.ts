// email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private url = 'http://localhost:4000/api/email'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  validateEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.url}/validate-email`, { email });
  }
}

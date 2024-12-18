import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:4000/api/formulario-contacto';

  constructor(private http: HttpClient) { }

  sendContact(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private apiUrl = 'http://localhost:3000/api/mercado-pago'; // URL del backend

  constructor(private http: HttpClient) {}

  createPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}

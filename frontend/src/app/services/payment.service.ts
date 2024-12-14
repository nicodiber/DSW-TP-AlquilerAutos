// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createCheckoutSession(amount: number): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/payment/create-checkout-session', { amount });
  }
}

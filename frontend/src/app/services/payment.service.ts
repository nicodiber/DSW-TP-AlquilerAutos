import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  // Método que llama al backend para crear la sesión de pago
  createCheckoutSession(data: { amount: number }): Observable<any> {
    return this.http.post('http://localhost:4000/api/payment/create-checkout-session', data, { withCredentials: true,});
  }

  createCheckoutSessionIncidente(data: { amount: number }, idIncidente: string): Observable<any> {
    return this.http.post('http://localhost:4000/api/payment/create-checkout-session-incidente', { amount: data.amount, idIncidente: idIncidente }, {
      withCredentials: true, 
    });
  }
}

import { Component } from '@angular/core';
import { MercadoPagoService } from '../../services/mercado-pago.service'; 

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.css'],
})
export class MercadoPagoComponent {
  transactionAmount: number = 0;
  description: string = '';
  email: string = '';
  paymentLink: string = '';

  constructor(private mercadoPagoService: MercadoPagoService) {}

  createPayment() {
    const paymentData = {
      transaction_amount: this.transactionAmount,
      description: this.description,
      email: this.email,
    };

    this.mercadoPagoService.createPayment(paymentData).subscribe(
      (response) => {
        this.paymentLink = response.init_point; // Enlace de pago
      },
      (error) => {
        console.error('Error al crear el pago:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js'; // Importa esta función

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(private paymentService: PaymentService) {}

  async handlePayment(amount: number) {
    try {
      // Cargar Stripe con tu clave pública
      const stripe = await loadStripe('pk_test_51QVnALIH5hl8sEK2hK8hsyHarYxOrHId1ken3W42ZPrSdrl5rbeyte7Juosi9NOVrZyNcb5XHda3oiiUdD1TZGBH00IBWtMgSL');

      if (!stripe) {
        throw new Error('Stripe.js no se pudo cargar.');
      }

      this.paymentService.createCheckoutSession(amount).subscribe(
        (response: any) => {
          // Redirigir a Stripe Checkout con el sessionId
          stripe.redirectToCheckout({ sessionId: response.sessionId }).then((result: any) => {
            if (result.error) {
              console.error(result.error.message);
            }
          });
        },
        (error) => {
          console.error('Error al crear la sesión de pago:', error);
        }
      );
    } catch (error) {
      console.error('Error al cargar Stripe:', error);
    }
  }
}

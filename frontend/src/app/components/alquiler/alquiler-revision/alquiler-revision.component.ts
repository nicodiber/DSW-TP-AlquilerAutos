import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service'; // 
import { loadStripe } from '@stripe/stripe-js'; // Importa esta función


@Component({
  selector: 'app-alquiler-revision',
  templateUrl: './alquiler-revision.component.html',
  styleUrls: ['./alquiler-revision.component.css']
})
export class AlquilerRevisionComponent implements OnInit {
  datosBusqueda: any;
  fechaRetiro: string = '';
  fechaDevolucion: string = '';
  diasReserva: number = 0;
  precioTotal: number = 0;
  usuario: any;

  constructor(private router: Router, 
    private authService: AuthService, 
    private gestionCookiesService: gestionCookiesService, 
    private paymentService: PaymentService,) {}

  ngOnInit(): void {
    this.isAdminTrabajador();
    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    console.log("Datos búsqueda:", this.datosBusqueda);
    
    // Verificar si modeloElegido existe en datosBusqueda
    if (!this.datosBusqueda || !this.datosBusqueda.modeloElegido) {
      console.warn("Falta datosBusqueda o, en su defecto, campo modeloElegido.");
      window.location.href = '/modelo-listar';
    }

    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
    this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
    this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
    this.precioTotal = this.diasReserva * this.datosBusqueda.modeloElegido.precioXdia * 1.21; // Incluimos el IVA

    this.usuario = this.authService.getUsuarioLogueado();
    
    
  }
  
  isAdminTrabajador() {
  this.authService.verificarToken().subscribe(
    (response) => {
      if (!response.existe) {
        // No hay ningun usuario logueado, se permite el acceso
      } else {
        // Si hay un token, se verifica que sea de rol usuario
        this.authService.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
              this.router.navigate(['/loginUsuario']);
            } else if (user.rol === 'usuario') {
              this.usuario = user
            } else {
              // Caso para roles desconocidos (opcional)
              this.router.navigate(['/loginUsuario']);
            }
          },
          (error) => {
            this.router.navigate(['/loginUsuario']);
          }
        );
      }
    },
    (error) => {
      
      this.router.navigate(['/loginUsuario']);
    }
  );
}


  // Botón Cancelar
  cancelarProceso(){
    this.gestionCookiesService.borrarCookie('datosBusqueda');
    this.gestionCookiesService.borrarCookie('datosBusquedaExpiration');
    this.gestionCookiesService.borrarCookie('modelosDisponibles');
    this.gestionCookiesService.borrarCookie('autosCoincidentesIds');
    window.location.href = '/buscador';
  }

  // Botón de Reservar
  async confirmarReserva(): Promise<void> {

    try {        
      const stripe = await loadStripe('pk_test_51QVnALIH5hl8sEK2hK8hsyHarYxOrHId1ken3W42ZPrSdrl5rbeyte7Juosi9NOVrZyNcb5XHda3oiiUdD1TZGBH00IBWtMgSL'); // Usa tu clave pública de Stripe
      if (!stripe) {
        throw new Error('Stripe.js no se pudo cargar.');
      }
    
       // Construir el objeto con el formato esperado
         const paymentData = { amount: Math.round(this.precioTotal) }; // Convertir el monto a centavos
         console.log(paymentData)
      // Solicitar la sesión al backend
            const stripeResponse = await this.paymentService.createCheckoutSession(paymentData).toPromise();
            console.log(stripeResponse)
    
      stripe.redirectToCheckout({ sessionId: String(stripeResponse.sessionId)}).then((result) => {
        if (result.error) {
          alert('Error en el pago: ' + result.error.message);
        }
      });
    } catch (error) {
      console.error('Error al procesar la sesión de pago', error);
      alert('Hubo un error al procesar el pago');
    }

}

}

/*
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { IncidenteService } from '../../../services/incidente.service';
import { PaymentService } from '../../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-incidentes-usuario',
  templateUrl: './incidentes-usuario.component.html',
  styleUrl: './incidentes-usuario.component.css'
})
export class IncidentesUsuarioComponent implements OnInit {
  usuario: any;
  incidentes: any
  IncidenteIdToCancel: any | null = null;
  
    constructor(private authService: AuthService,
                private incidenteService: IncidenteService,
                private paymentService: PaymentService,
                private router: Router,
                private toastr: ToastrService) { }

  ngOnInit(): void {
    this.incidentes = this.incidentes || {};
    this.obtenerUsuarioSesion();
  }



obtenerUsuarioSesion(){
  this.authService.getAuthenticatedUser().subscribe({
    next: (usuario) => {
      if (usuario) {
        this.usuario = usuario;
        if (usuario.rol === 'usuario') {
          this.getIncidentes();
        }
      } else {
        window.location.href = '/loginUsuario';
      }
    },
    error: () => {
      window.location.href = '/loginUsuario';
    },
  });
  }


  editarMisDatos() {
    window.location.href = '/editar-datos-usuario';
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
    next: () => {
      window.location.href = '/loginUsuario';
    },
    error: (err) => {
      console.error('Error al cerrar sesión:', err);
    }
    });
  } 

  getIncidentes(): void {
  this.incidenteService.obtenerIncidentesUsuario(this.usuario._id).subscribe({
    next: (incidentes) => {
      this.incidentes = incidentes; // Almacena los incidentes obtenidos
      console.log('Incidentes del usuario:', incidentes);
    },
    error: (error) => {
      console.error('Error al obtener incidentes del usuario:', error);
    }
  });
}

  abrirPagarIncidenteModal(id: any) {
    this.IncidenteIdToCancel = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

    async confirmarPago(): Promise<void> {
  
      try {        
        const stripe = await loadStripe('pk_test_51QVnALIH5hl8sEK2hK8hsyHarYxOrHId1ken3W42ZPrSdrl5rbeyte7Juosi9NOVrZyNcb5XHda3oiiUdD1TZGBH00IBWtMgSL'); // Usa tu clave pública de Stripe
        if (!stripe) {
          throw new Error('Stripe.js no se pudo cargar.');
        }

        this.incidenteService.obtenerIncidente(String(this.IncidenteIdToCancel)).subscribe(
        async (data) => {
          const paymentData = { amount: Math.round(data.costoIncidente) }; // Convertir el monto a centavos

          // Solicitar la sesión al backend
          const stripeResponse = await this.paymentService.createCheckoutSessionIncidente(paymentData).toPromise();
          
          if (stripeResponse){
            this.incidenteService.pagarIncidente(this.IncidenteIdToCancel).subscribe(
            (data) => {
                this.toastr.success('El Incidente fue pagado con éxito', 'Incidente Pagado');
                this.getIncidentes();
                const modal = document.getElementById('deleteModal');
                if (modal) {
                  const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
                  bootstrapModal.hide(); 
                }

                this.IncidenteIdToCancel = null;
            },
            (error) => {
                this.toastr.error('Error al pagar el incidente', 'Error');
                console.log(error);
            }
            );
          }

          stripe.redirectToCheckout({ sessionId: String(stripeResponse.sessionId)}).then((result) => {
            if (result.error) {
              alert('Error en el pago: ' + result.error.message);
            }
          });
        },
        (error) => {
          console.error('Error al obtener el incidente:', error); // Manejo de errores
        }
      );    
      } catch (error) {
        console.error('Error al procesar la sesión de pago', error);
        alert('Hubo un error al procesar el pago');
      }
  
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { IncidenteService } from '../../../services/incidente.service';
import { PaymentService } from '../../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-incidentes-usuario',
  templateUrl: './incidentes-usuario.component.html',
  styleUrls: ['./incidentes-usuario.component.css'],
})
export class IncidentesUsuarioComponent implements OnInit {
  usuario: any;
  incidentes: any;
  IncidenteIdToCancel: any | null = null;

  constructor(
    private authService: AuthService,
    private incidenteService: IncidenteService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.incidentes = this.incidentes || {};
    this.obtenerUsuarioSesion();
  }

  obtenerUsuarioSesion() {
    this.authService.getAuthenticatedUser().subscribe({
      next: (usuario) => {
        if (usuario) {
          this.usuario = usuario;
          if (usuario.rol === 'usuario') {
            this.getIncidentes();
          }
        } else {
          window.location.href = '/loginUsuario';
        }
      },
      error: () => {
        window.location.href = '/loginUsuario';
      },
    });
  }

  editarMisDatos() {
    window.location.href = '/editar-datos-usuario';
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        window.location.href = '/loginUsuario';
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      },
    });
  }

  getIncidentes(): void {
    this.incidenteService.obtenerIncidentesUsuario(this.usuario._id).subscribe({
      next: (incidentes) => {
        this.incidentes = incidentes; // Almacena los incidentes obtenidos
        console.log('Incidentes del usuario:', incidentes);
      },
      error: (error) => {
        console.error('Error al obtener incidentes del usuario:', error);
      },
    });
  }

  abrirPagarIncidenteModal(id: any) {
    this.IncidenteIdToCancel = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  async confirmarPago(): Promise<void> {
    try {
      const stripe = await loadStripe(
        'pk_test_51QVnALIH5hl8sEK2hK8hsyHarYxOrHId1ken3W42ZPrSdrl5rbeyte7Juosi9NOVrZyNcb5XHda3oiiUdD1TZGBH00IBWtMgSL'
      );
      if (!stripe) {
        throw new Error('Stripe.js no se pudo cargar.');
      }

      // Obtener datos del incidente
      const incidente = await firstValueFrom(
        this.incidenteService.obtenerIncidente(String(this.IncidenteIdToCancel))
      );
      const paymentData = { amount: Math.round(incidente.costoIncidente) };

      // Crear la sesión de Stripe
      const stripeResponse = await firstValueFrom(
        this.paymentService.createCheckoutSessionIncidente(paymentData)
      );

      // Redirigir a Stripe para completar el pago
      const { error } = await stripe.redirectToCheckout({
        sessionId: stripeResponse.sessionId,
      });

      if (error) {
        console.error('Error al redirigir a Stripe:', error.message);
        alert('Error en el pago: ' + error.message);
        return;
      }

      // Solo ejecuta esto si el pago fue exitoso
      await this.marcarIncidenteComoPagado();
    } catch (error) {
      console.error('Error en el flujo de pago:', error);
      alert('Hubo un error al procesar el pago');
    }
  }

  private async marcarIncidenteComoPagado(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.incidenteService.pagarIncidente(this.IncidenteIdToCancel)
      );
      this.toastr.success(
        'El Incidente fue pagado con éxito',
        'Incidente Pagado'
      );
      this.getIncidentes();

      const modal = document.getElementById('deleteModal');
      if (modal) {
        const bootstrapModal = (window as any).bootstrap.Modal.getInstance(
          modal
        );
        bootstrapModal.hide();
      }

      this.IncidenteIdToCancel = null;
    } catch (error) {
      this.toastr.error(
        'Error al marcar el incidente como pagado',
        'Error'
      );
      console.log('Error al actualizar el estado del incidente:', error);
    }
  }
}

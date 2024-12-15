import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.incidentes = this.incidentes || {};
    this.obtenerUsuarioSesion();

    
    this.route.queryParamMap.subscribe((queryParams) => {
      this.IncidenteIdToCancel = queryParams.get('session_id');
      if(this.IncidenteIdToCancel){
        // Buscar el índice del carácter 's' para separar decodificar el idIncidente
        const decodedId = atob(this.IncidenteIdToCancel.split('s')[0]); // Eliminar cualquier cosa después de 's' y decodificar el ID
        this.IncidenteIdToCancel = decodedId;
        this.marcarIncidenteComoPagado();
      }
    });
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
        this.paymentService.createCheckoutSessionIncidente(paymentData, String(this.IncidenteIdToCancel))
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
      this.router.navigate([], {  // Cuando pague, que se le recargue ya sin el session_id
        queryParams: { session_id: null },
        queryParamsHandling: 'merge'
      });


      const modal = document.getElementById('deleteModal');
      if (modal) {
        const bootstrapModal = (window as any).bootstrap.Modal.getInstance(
          modal
        );
        bootstrapModal.hide();
      }

      this.IncidenteIdToCancel = null;
    } catch (error) {
      console.log('Error al actualizar el estado del incidente:', error);
    }
  }
}

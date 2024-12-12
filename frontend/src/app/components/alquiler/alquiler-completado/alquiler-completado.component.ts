import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alquiler-completado',
  templateUrl: './alquiler-completado.component.html',
  styleUrls: ['./alquiler-completado.component.css']
})
export class AlquilerCompletadoComponent implements OnInit, OnDestroy {
  datosBusqueda: any;
  fechaRetiro: string = '';
  fechaDevolucion: string = '';
  diasReserva: number = 0;
  private subscription: Subscription | null = null;;

  constructor(private router: Router, private gestionCookiesService: gestionCookiesService) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(event => {
      if (event) {
        // Borrar las cookies al iniciar la navegación hacia otra ruta
        this.gestionCookiesService.borrarCookie('datosBusqueda');
        this.gestionCookiesService.borrarCookie('datosBusquedaExpiration');
        this.gestionCookiesService.borrarCookie('modelosDisponibles');
        this.gestionCookiesService.borrarCookie('autosCoincidentesIds');
      }
    });

    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    
    // Verificar si modeloElegido existe en datosBusqueda
    if (!this.datosBusqueda || !this.datosBusqueda.modeloElegido) {
      console.warn("Cookies faltantes. Redirigiendo...");
      window.location.href = '/buscador';
    }

    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
    this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
    this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generatePDF() {
    const ticket = document.querySelector('.reservation');
    if (ticket) {
      const options = {
        margin: 0.5,
        filename: 'constancia_reserva_vehiculo.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      (window as any).html2pdf().set(options).from(ticket).save();
    } else {
      console.error("No se encontró el elemento '.reservation'");
    }
  }

}

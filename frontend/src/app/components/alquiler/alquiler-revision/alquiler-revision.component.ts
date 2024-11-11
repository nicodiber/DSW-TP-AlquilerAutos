
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';
import { AuthService } from '../../../services/auth.service'; // Para mostrar ciertos campos u otros en función de si está logueado el usuario

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
  isAuthenticated: boolean = false;

  constructor(private router: Router, private gestionCookiesService: gestionCookiesService, private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    console.log("Datos de búsqueda al cargar alquiler-revision:", this.datosBusqueda);
    
    // Verificar si modeloElegido existe en datosBusqueda
    if (!this.datosBusqueda || !this.datosBusqueda.modeloElegido) {
      console.warn("El campo modeloElegido no está presente en datosBusqueda. Redirigiendo...");
      this.router.navigate(['/modelo-listar']);
    }

    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
    this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
    this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
    this.precioTotal = this.diasReserva * this.datosBusqueda.modeloElegido.precioXdia * 1.21; // Incluimos el IVA

    // Verificar si el usuario está autenticado
    this.isAuthenticated = this.authService.getUsuarioLogueado();
    console.log("Está logeado?", this.isAuthenticated);
  }

  confirmarReserva(): void {
    try {
      // Leer datosBusqueda desde el servicio y agregar modeloElegido
      let datosBusqueda = this.gestionCookiesService.getDatosBusqueda();

      // Actualizar datosBusqueda en el servicio y en la cookie con tiempo de expiración
      this.gestionCookiesService.setDatosBusqueda(datosBusqueda, undefined, this.precioTotal);  // Le enviamos el precio para que lo sume a las cookies
      console.log("Datos al realizar la reserva:", this.gestionCookiesService.getDatosBusqueda());

      // Redirigir a /alquiler-revision
      this.router.navigate(['/alquiler-completado']);
    } catch (error) {
      console.error('Error al realizar reserva:', error);
      alert("Hubo un error al realizar la reserva. Intente nuevamente.");
    }
  }

}

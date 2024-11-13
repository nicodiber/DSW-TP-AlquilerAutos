import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlquilerService } from '../../../services/alquiler.service';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService, private gestionCookiesService: gestionCookiesService, private alquilerService: AlquilerService) {}

  ngOnInit(): void {
    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    console.log(this.datosBusqueda);
    
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
  
  cancelarProceso(){
    this.gestionCookiesService.borrarCookie('datosBusqueda');
    this.gestionCookiesService.borrarCookie('datosBusquedaExpiration');
    this.gestionCookiesService.borrarCookie('modelosDisponibles');
    window.location.href = '/buscador';
  }

  confirmarReserva(): void {
    try {
      // Crear las fechas con horas integradas
      const fechaInicio = moment(this.datosBusqueda.fechaRetiro + ' ' + this.datosBusqueda.horaRetiro, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();
      const fechaFin = moment(this.datosBusqueda.fechaDevolucion + ' ' + this.datosBusqueda.horaDevolucion, 'YYYY-MM-DD HH:mm').utcOffset('-03:00').toDate();

      // Actualizar datosBusqueda en el servicio y en la cookie con tiempo de expiración
      this.gestionCookiesService.setDatosBusqueda(this.datosBusqueda, undefined, undefined, this.precioTotal);  // Le enviamos el precio para que lo sume a las cookies
      // Volvemos a obtener toda la cookie nuevamente, ya actualizada, y guardamos en misma variable
      this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();

      const alquilerData = {
        usuario: this.usuario._id,
        auto: this.datosBusqueda.autoAsignado,
        sucursalEntrega: this.datosBusqueda.sucursalRetiro._id,
        sucursalDevolucion: this.datosBusqueda.sucursalDevolucion._id,
        trabajadorAsignado: this.datosBusqueda.trabajadorAsignado || undefined, // No es obligatorio
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        fechaInicioReal: undefined,
        fechaFinReal: undefined,
        notas: undefined,
        precioTotalAlquiler: this.datosBusqueda.precioTotal,
        estadoAlquiler: 'reservado'
      };

      // Llamada al servicio para crear el alquiler
      this.alquilerService.crearAlquiler(alquilerData).subscribe(
        response => {
          this.gestionCookiesService.setDatosBusqueda(this.datosBusqueda, undefined, undefined, undefined, response._id);
          // Llamada para actualizar el estado del auto después de crear el alquiler
          this.alquilerService.actualizarEstadoAuto(this.datosBusqueda.autoAsignado, 'reservado').subscribe(
            () => {
              console.log('Estado del auto actualizado a "reservado".');
              window.location.href = '/alquiler-completado';
            },
            error => {
              console.error('Error al actualizar el estado del auto:', error);
            }
          );
        },
        error => {
          console.error('Error al crear el alquiler:', error);
        }
      );
    } catch (error) {
      console.error('Error al realizar reserva:', error);
      alert("Hubo un error al realizar la reserva. Intente nuevamente.");
    }
  }
}

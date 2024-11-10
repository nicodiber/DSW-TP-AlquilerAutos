import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import moment from 'moment';

@Component({
  selector: 'app-alquiler-completado',
  templateUrl: './alquiler-completado.component.html',
  styleUrls: ['./alquiler-completado.component.css']
})
export class AlquilerCompletadoComponent implements OnInit {
  datosBusqueda: any;
  fechaRetiro: string = '';
  fechaDevolucion: string = '';
  diasReserva: number = 0;

  constructor(private router: Router, private gestionCookiesService: gestionCookiesService) {}

  ngOnInit(): void {
    // Obtener datos de datosBusqueda desde el servicio
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    console.log("Datos de búsqueda al cargar alquiler-completado:", this.datosBusqueda);
    
    // Verificar si modeloElegido existe en datosBusqueda
    if (!this.datosBusqueda || !this.datosBusqueda.modeloElegido) {
      console.warn("El campo modeloElegido no está presente en datosBusqueda. Redirigiendo...");
      this.router.navigate(['/modelo-listar']);
    }

    this.fechaRetiro = this.datosBusqueda.fechaRetiro;
    this.fechaDevolucion = this.datosBusqueda.fechaDevolucion;
    this.diasReserva = Number(moment(this.fechaDevolucion, 'YYYY-MM-DD').diff(moment(this.fechaRetiro, 'YYYY-MM-DD'), 'days'));
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

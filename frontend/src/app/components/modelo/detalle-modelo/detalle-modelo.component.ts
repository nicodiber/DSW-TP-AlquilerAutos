import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../../services/modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { gestionCookiesService } from '../../../services/gestionCookies.service';

@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {
  modelo: any;
  datosBusqueda: any;

  constructor(private route: ActivatedRoute, private modeloService: ModeloService, private router: Router, private cookieService: CookieService, private gestionCookiesService: gestionCookiesService) {}
  ngOnInit(): void {
    this.cookieService.delete('datosBusqueda', '/modelo');
    this.cookieService.delete('modelosDisponibles', '/modelo');
    this.cookieService.delete('reload', '/modelo');

    if (Object.keys(this.gestionCookiesService.getDatosBusqueda()).length === 0) {
      this.router.navigate(['/buscador']);
    }

    // Obtener el modelo seleccionado por su ID
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.modeloService.obtenerModelo(id).subscribe(data => {
          this.modelo = data;
        }, error => {
          console.error('Error al obtener los datos del modelo:', error);
        });
      }
    });
  }

  elegirModelo(): void {
    try {
      // Leer datosBusqueda desde el servicio
      let datosBusqueda = this.gestionCookiesService.getDatosBusqueda();

      // Actualizar datosBusqueda en el servicio
      this.gestionCookiesService.setDatosBusqueda(datosBusqueda, this.modelo);

      // Redirigir a /alquiler-revision
      this.router.navigate(['/alquiler-revision']);
    } catch (error) {
      console.error('Error al elegir modelo:', error);
      alert("Hubo un error al seleccionar el modelo. Intente nuevamente.");
    }
  }

}

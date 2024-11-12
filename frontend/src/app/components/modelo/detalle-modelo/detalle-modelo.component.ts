import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModeloService } from '../../../services/modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { gestionCookiesService } from '../../../services/gestionCookies.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {
  modelo: any;
  datosBusqueda: any;
  isAuthenticated: boolean = false;
  idModelo: string = '' ;
  idAutoAleatorio: string = '';

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router, private modeloService: ModeloService, private cookieService: CookieService, private gestionCookiesService: gestionCookiesService) {}
  ngOnInit(): void {
    this.cookieService.delete('datosBusqueda', '/modelo');
    this.cookieService.delete('modelosDisponibles', '/modelo');
    this.cookieService.delete('reload', '/modelo');

    if ((Object.keys(this.gestionCookiesService.getDatosBusqueda()).length === 0)) {
      window.location.href = '/buscador';
      this.toastr.warning('Sus parámetros de búsqueda han expirado, complételos de nuevo');
    }

    // Obtener el modelo seleccionado por su ID y guardar ID para despues
    this.route.paramMap.subscribe(params => {
      this.idModelo = params.get('id') || '';
      if (this.idModelo) {
        this.modeloService.obtenerModelo(this.idModelo).subscribe(data => {
          this.modelo = data;
        }, error => {
          console.error('Error al obtener los datos del modelo:', error);
        });
      }
    });
  }

  elegirModelo(): void {
    this.datosBusqueda = this.gestionCookiesService.getDatosBusqueda();
    this.modeloService.buscarAutoAleatorioDisponible(this.idModelo, this.datosBusqueda.sucursalRetiro._id).subscribe(
      (data) => {
        if (data && data._id) {
          this.idAutoAleatorio = data._id;
          this.irARevision();
        } else {
          console.warn("Data no contiene _id:", data);
        }
      },
      (error) => {
        console.error("Error al buscar auto aleatorio disponible:", error);
      }
    );
  }

  irARevision(): void {
    try {
      // Actualizar datosBusqueda en el servicio
      this.gestionCookiesService.setDatosBusqueda(this.datosBusqueda, this.modelo, this.idAutoAleatorio);

      // Verificar si el usuario está autenticado
      this.isAuthenticated = this.authService.getUsuarioLogueado();

      if (!this.isAuthenticated) {
        window.location.href = '/loginUsuario';
        this.toastr.warning('Por favor, inicie sesión para continuar');
      } else {
        window.location.href = '/alquiler-revision';
      }
      
    } catch (error) {
      console.error('Error al elegir modelo:', error);
      alert("Hubo un error al seleccionar el modelo. Intente nuevamente.");
    }
  }

}

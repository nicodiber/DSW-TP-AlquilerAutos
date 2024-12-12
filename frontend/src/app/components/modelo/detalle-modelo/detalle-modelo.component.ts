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
  usuarioLogueado: any;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router, private modeloService: ModeloService, private cookieService: CookieService, private gestionCookiesService: gestionCookiesService) {}
  ngOnInit(): void {
    this.isAdminTrabajador();
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
              this.toastr.error('No tienes permiso para acceder a esta página.', '');
              this.router.navigate(['/loginUsuario']);
            } else if (user.rol === 'usuario') {
              this.toastr.success('Acceso permitido para el rol usuario.', '');
            } else {
              // Caso para roles desconocidos (opcional)
              this.toastr.warning('Rol no reconocido, acceso restringido.', '');
              this.router.navigate(['/loginUsuario']);
            }
          },
          (error) => {
            this.toastr.error('Error al obtener información del usuario.', '');
            this.router.navigate(['/loginUsuario']);
          }
        );
      }
    },
    (error) => {
      this.toastr.error('Error al verificar la sesión.', '');
      this.router.navigate(['/loginUsuario']);
    }
  );
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
      this.authService.verificarToken().subscribe(response => {
      if (response.existe) {
        console.log("El usuario está autenticado.");
        window.location.href = '/alquiler-revision';
      } else {
        this.toastr.warning('Por favor, inicie sesión para continuar');
        setTimeout(() => {
          window.location.href = '/loginUsuario';
          }, 1000);
        console.log("El usuario no está autenticado.");
      }
      }, error => {
      console.error("Hubo un error al verificar el usuario", error);
      });
      
      
    } catch (error) {
      console.error('Error al elegir modelo:', error);
      alert("Hubo un error al seleccionar el modelo. Intente nuevamente.");
    }
  }

}

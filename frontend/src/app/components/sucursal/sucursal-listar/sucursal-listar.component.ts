import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  // Importamos el servicio para mostrar notificaciones (toasts)
import { sucursal } from '../../../models/sucursal';  // Importamos el modelo de datos para la sucursal
import { SucursalService } from '../../../services/sucursal.service';  // Importamos el servicio que gestiona las sucursales
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sucursal-listar',
  templateUrl: './sucursal-listar.component.html',
  styleUrls: ['./sucursal-listar.component.css']
})
export class SucursalListarComponent implements OnInit {
  listaSucursales: sucursal[] = [];  // Lista que almacenará las sucursales obtenidas desde el servicio
  usuarioLogueado: any;
  selectedSucursal: sucursal | null = null;  // Sucursal seleccionada para eliminar
  showModal: boolean = false;  // Controla la visibilidad del modal
  confirmDelete: boolean = false; // Controla si la eliminación fue confirmada

  // El constructor recibe los servicios necesarios para gestionar las sucursales y las notificaciones
  constructor(private _sucursalService: SucursalService, private _authservice: AuthService,
    private toastr: ToastrService) { }

  // ngOnInit es un ciclo de vida de Angular que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.isNotAdmin();
    this.getSucursales();
     // Llamamos al método que obtiene las sucursales al inicializar el componente
  }

  isNotAdmin() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador') {
              // Si el rol es admin o trabajador, se permite el acceso
            } else {
              // Otros roles, patea a login
              window.location.href = '/loginUsuario';
            }
          },
          (error) => {
            window.location.href = '/loginUsuario';
          }
        );
    }
  // Método que obtiene la lista de sucursales desde el servicio
  getSucursales() {
    // Llamamos al servicio obtenerSucursales, que devuelve un observable
    this._sucursalService.obtenerSucursales().subscribe(
      data => {
        // Si la respuesta es exitosa, almacenamos los datos en la listaSucursales
        this.listaSucursales = data;  // Asignamos la respuesta a la variable listaSucursales
      },
      error => {
        // Si ocurre un error, se imprime en consola
        console.log(error);
      }
    );
  }

  // Método para abrir el modal de confirmación antes de eliminar una sucursal
  openDeleteModal(sucursal: sucursal) {
    if ((sucursal?.trabajadores && sucursal.trabajadores.length > 0) ||
      (sucursal?.autos && sucursal.autos.length > 0)) {
      // Si tiene trabajadores o autos asignados, mostramos un error y no permitimos eliminar
      this.toastr.error('No se puede eliminar la sucursal porque tiene trabajadores o autos asignados', 'Eliminación no permitida');
    } else {
      // Si no tiene trabajadores ni autos asignados, mostramos el modal de confirmación
      this.selectedSucursal = sucursal;
      this.showModal = true;
    }
  }

  // Método para eliminar la sucursal después de la confirmación
  deleteSucursal() {
    if (this.selectedSucursal && this.selectedSucursal._id !== undefined) {
      this._sucursalService.eliminarSucursal(this.selectedSucursal._id).subscribe(
        data => {
          // Si la eliminación es exitosa, mostramos una notificación de éxito
          this.toastr.success('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
          // Luego, actualizamos la lista de sucursales para reflejar los cambios
          this.getSucursales();
          this.showModal = false;  // Cerramos el modal
        },
        error => {
          // Si ocurre un error, se imprime en consola
          console.log(error);
        }
      );
    }
  }

  // Método para cerrar el modal sin eliminar la sucursal
  cancelDelete() {
    this.showModal = false;
  }
}

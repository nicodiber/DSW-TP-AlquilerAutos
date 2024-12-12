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
  sucursalIdToDelete: any | null = null;

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
  
  // Método para eliminar una sucursal, recibe el ID de la sucursal a eliminar
  deleteSucursal(id: any) {
    // Llamamos al servicio eliminarSucursal, que devuelve un observable
    this._sucursalService.eliminarSucursal(id).subscribe(
      data => {
        // Si la eliminación es exitosa, mostramos una notificación de éxito
        this.toastr.success('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
        
        const backdrop = document.querySelector('.modal-backdrop.show');
        if (backdrop) {
          backdrop.remove();
        }

        // Luego, actualizamos la lista de sucursales para reflejar los cambios
        this.getSucursales();
      },
      error => {
        // Si ocurre un error, se imprime en consola
        this.toastr.error('No se puede eliminar la sucursal ya que posee Trabajadores o Autos asignados.', 'Error');
        console.log(error);
      }
    );
  }

  abrirDeleteModal(id: any) {
    this.sucursalIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }
}

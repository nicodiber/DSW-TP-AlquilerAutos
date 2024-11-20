import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';                       // Para obtener parámetros de la ruta
import { SucursalService } from '../../../services/sucursal.service';   // Servicio para manejar operaciones relacionadas con las sucursales
import { ToastrService } from 'ngx-toastr';                             // Para mostrar mensajes de notificación
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-asignar-trabajadores',
  templateUrl: './asignar-trabajadores.component.html',
  styleUrls: ['./asignar-trabajadores.component.css']
})
export class AsignarTrabajadoresComponent implements OnInit {
  // Definición de las variables para almacenar los datos de la sucursal y los trabajadores
  idSucursal: string = '';                                // ID de la sucursal actual
  nombreSucursal: string = '';                            // Nombre de la sucursal
  trabajadoresAsignados: any[] = [];                      // Lista de trabajadores ya asignados a la sucursal
  trabajadoresNoAsignados: any[] = [];                    // Lista de trabajadores que aún no están asignados
  trabajadoresParaAsignar: Set<string> = new Set();       // Trabajadores a asignar, almacenados en un Set para evitar duplicados
  trabajadoresParaDesasignar: Set<string> = new Set();    // Trabajadores a desasignar, almacenados en un Set para evitar duplicados
  usuarioLogueado: any;

  constructor(
    private _sucursalService: SucursalService,  // Inyección del servicio de sucursal
    private toastr: ToastrService,              // Inyección del servicio para mostrar mensajes
    private _authservice: AuthService,
    private route: ActivatedRoute               // Inyección del servicio para obtener los parámetros de la ruta
  ) { }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador') {
      window.location.href = '/loginUsuario'; 
    } else {
    // Obtener el ID de la sucursal desde los parámetros de la ruta y cargar los datos
    this.idSucursal = this.route.snapshot.paramMap.get('id') || '';  // Extraer el parámetro 'id' de la URL
    if (this.idSucursal) {
      // Si el ID de la sucursal es válido, cargar la información de la sucursal y los trabajadores
      this.getSucursal();
      this.cargarTrabajadores();
    }
  }
  }

  // Método para obtener los detalles de la sucursal
  getSucursal(): void {
    this._sucursalService.obtenerSucursal(this.idSucursal).subscribe(
      (sucursal: any) => {
        this.nombreSucursal = sucursal.nombreSucursal;  // Asignar el nombre de la sucursal
      },
      error => {
        console.error("Error al obtener la sucursal:", error);
        this.toastr.error("No se pudo cargar la información de la sucursal.");  // Mostrar un error si no se puede obtener la sucursal
      }
    );
  }

  // Método para cargar la lista de trabajadores asignados y no asignados a la sucursal
  cargarTrabajadores(): void {
    this._sucursalService.obtenerTrabajadoresParaAsignacion(this.idSucursal).subscribe(
      (data: any) => {
        this.trabajadoresAsignados = data.trabajadoresDeEstaSucursal || [];  // Asignar los trabajadores ya asignados
        this.trabajadoresNoAsignados = data.trabajadoresNoAsignados || [];  // Asignar los trabajadores no asignados
      },
      error => {
        console.error("Error al cargar trabajadores:", error);
        this.toastr.error("No se pudo cargar la lista de trabajadores.");  // Mostrar un error si no se pueden cargar los trabajadores
      }
    );
  }

  // Método para alternar la asignación o desasignación de un trabajador
  // Si 'asignar' es true, el trabajador se añade a los trabajadores para asignar
  // Si 'asignar' es false, el trabajador se añade a los trabajadores para desasignar
  toggleAsignacion(trabajador: any, asignar: boolean): void {
    if (asignar) {
      this.trabajadoresParaAsignar.add(trabajador._id);  // Añadir al Set de trabajadores para asignar
      trabajador.mostrarAsignado = true;
      // this.trabajadoresParaDesasignar.delete(trabajadorId);  // Eliminar de los trabajadores para desasignar si estaba allí
    } else {
      this.trabajadoresParaDesasignar.add(trabajador._id);
      trabajador.mostrarDesasignado = true;  // Añadir al Set de trabajadores para desasignar
      //this.trabajadoresParaAsignar.delete(trabajadorId);  // Eliminar de los trabajadores para asignar si estaba allí
    }
  }

  // Método para guardar las asignaciones y desasignaciones realizadas
  guardarAsignaciones(): void {
    const asignados = Array.from(this.trabajadoresParaAsignar);  // Convertir el Set de trabajadores a asignar a un array
    const desasignados = Array.from(this.trabajadoresParaDesasignar);  // Convertir el Set de trabajadores a desasignar a un array

    // Llamada al servicio para enviar las asignaciones y desasignaciones al backend
    this._sucursalService.asignarTrabajadores(this.idSucursal, asignados, desasignados).subscribe(
      () => {
        this.toastr.success("Asignaciones actualizadas con éxito");  // Mostrar mensaje de éxito si las asignaciones se guardan correctamente
        this.cargarTrabajadores();  // Recargar la lista de trabajadores para reflejar los cambios
        this.trabajadoresParaAsignar.clear();  // Limpiar el Set de trabajadores para asignar
        this.trabajadoresParaDesasignar.clear();  // Limpiar el Set de trabajadores para desasignar
      },
      error => {
        console.error("Error al actualizar asignaciones:", error);
        this.toastr.error("Error al actualizar asignaciones");  // Mostrar mensaje de error si no se pudieron actualizar las asignaciones
      }
    );
  }

  recargarPagina(): void {
    window.location.reload();
  }
}

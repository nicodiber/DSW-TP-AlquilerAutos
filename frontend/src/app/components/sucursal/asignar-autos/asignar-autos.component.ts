import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';                       // Para obtener parámetros de la ruta
import { SucursalService } from '../../../services/sucursal.service';   // Servicio para manejar operaciones relacionadas con las sucursales
import { ToastrService } from 'ngx-toastr';                             // Para mostrar mensajes de notificación
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-asignar-autos',
  templateUrl: './asignar-autos.component.html',
  styleUrls: ['./asignar-autos.component.css']
})
export class AsignarAutosComponent implements OnInit {
  // Definición de las variables para almacenar los datos de la sucursal y los autos
  idSucursal: string = '';                                // ID de la sucursal actual
  nombreSucursal: string = '';                            // Nombre de la sucursal
  autosAsignados: any[] = [];                             // Lista de autos ya asignados a la sucursal
  autosNoAsignados: any[] = [];                           // Lista de autos que aún no están asignados
  autosParaAsignar: Set<string> = new Set();              // Autos a asignar, almacenados en un Set para evitar duplicados
  autosParaDesasignar: Set<string> = new Set();           // Autos a desasignar, almacenados en un Set para evitar duplicados
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
      // Si el ID de la sucursal es válido, cargar la información de la sucursal y los autos
      this.getSucursal();
      this.cargarAutos();
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

  // Método para cargar la lista de autos asignados y no asignados a la sucursal
  cargarAutos(): void {
    this._sucursalService.obtenerAutosParaAsignacion(this.idSucursal).subscribe(
      (data: any) => {
        this.autosAsignados = data.autosDeEstaSucursal || [];      // Asignar los autos ya asignados
        this.autosNoAsignados = data.autosNoAsignados || [];       // Asignar los autos no asignados
      },
      error => {
        console.error("Error al cargar autos:", error);
        this.toastr.error("No se pudo cargar la lista de autos.");  // Mostrar un error si no se pueden cargar los autos
      }
    );
  }

  // Método para alternar la asignación o desasignación de un auto
  // Si 'asignar' es true, el auto se añade a los autos para asignar
  // Si 'asignar' es false, el auto se añade a los autos para desasignar
  toggleAsignacion(auto: any, asignar: boolean): void {
    if (asignar) {
      this.autosParaAsignar.add(auto._id);  // Añadir al Set de autos para asignar
      auto.mostrarAsignado = true;
    } else {
      this.autosParaDesasignar.add(auto._id);  // Añadir al Set de autos para desasignar
      auto.mostrarDesasignado = true;
    }
  }

  // Método para guardar las asignaciones y desasignaciones realizadas
  guardarAsignaciones(): void {
    const asignados = Array.from(this.autosParaAsignar);        // Convertir el Set de autos a asignar a un array
    const desasignados = Array.from(this.autosParaDesasignar);  // Convertir el Set de autos a desasignar a un array

    // Llamada al servicio para enviar las asignaciones y desasignaciones al backend
    this._sucursalService.asignarAutos(this.idSucursal, asignados, desasignados).subscribe(
      () => {
        this.toastr.success("Asignaciones de autos actualizadas con éxito");  // Mostrar mensaje de éxito si las asignaciones se guardan correctamente
        this.cargarAutos();  // Recargar la lista de autos para reflejar los cambios
        this.autosParaAsignar.clear();       // Limpiar el Set de autos para asignar
        this.autosParaDesasignar.clear();    // Limpiar el Set de autos para desasignar
      },
      error => {
        console.error("Error al actualizar asignaciones de autos:", error);
        this.toastr.error("Error al actualizar asignaciones de autos");  // Mostrar mensaje de error si no se pudieron actualizar las asignaciones
      }
    );
  }

  recargarPagina(): void {
    window.location.reload();
  }
}

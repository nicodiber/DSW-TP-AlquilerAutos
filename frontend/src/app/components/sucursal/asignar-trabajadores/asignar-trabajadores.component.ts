import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../../services/sucursal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asignar-trabajadores',
  templateUrl: './asignar-trabajadores.component.html',
  styleUrls: ['./asignar-trabajadores.component.css']
})
export class AsignarTrabajadoresComponent implements OnInit {
  idSucursal: string = '';
  nombreSucursal: string = '';
  trabajadoresAsignados: any[] = [];
  trabajadoresNoAsignados: any[] = [];
  trabajadoresParaAsignar: Set<string> = new Set();
  trabajadoresParaDesasignar: Set<string> = new Set();

  constructor(
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el ID de la sucursal de los parámetros de la ruta y cargar datos de trabajadores
    this.idSucursal = this.route.snapshot.paramMap.get('id') || '';
    if (this.idSucursal) {
      this.getSucursal();
      this.cargarTrabajadores();
    }
  }

  // Obtener detalles de la sucursal, incluyendo el nombre de la sucursal
  getSucursal(): void {
    this._sucursalService.obtenerSucursal(this.idSucursal).subscribe(
      (sucursal: any) => {
        this.nombreSucursal = sucursal.nombreSucursal;
      },
      error => {
        console.error("Error al obtener la sucursal:", error);
        this.toastr.error("No se pudo cargar la información de la sucursal.");
      }
    );
  }

  // Cargar listas de trabajadores asignados y no asignados para la sucursal actual
  cargarTrabajadores(): void {
    this._sucursalService.obtenerTrabajadoresParaAsignacion(this.idSucursal).subscribe(
      (data: any) => {
        this.trabajadoresAsignados = data.trabajadoresAsignados || [];
        this.trabajadoresNoAsignados = data.trabajadoresNoAsignados || [];
      },
      error => {
        console.error("Error al cargar trabajadores:", error);
        this.toastr.error("No se pudo cargar la lista de trabajadores.");
      }
    );
  }

  // Alternar asignación de un trabajador a la sucursal
  toggleAsignacion(trabajadorId: string, asignar: boolean): void {
    if (asignar) {
      this.trabajadoresParaAsignar.add(trabajadorId);
      this.trabajadoresParaDesasignar.delete(trabajadorId);
    } else {
      this.trabajadoresParaDesasignar.add(trabajadorId);
      this.trabajadoresParaAsignar.delete(trabajadorId);
    }
  }

  // Guardar asignaciones y desasignaciones, y actualizar la lista de trabajadores
  guardarAsignaciones(): void {
    const asignados = Array.from(this.trabajadoresParaAsignar);
    const desasignados = Array.from(this.trabajadoresParaDesasignar);

    this._sucursalService.asignarTrabajadores(this.idSucursal, asignados, desasignados).subscribe(
      () => {
        this.toastr.success("Asignaciones actualizadas con éxito");
        this.cargarTrabajadores(); // Recargar para reflejar cambios
        this.trabajadoresParaAsignar.clear(); // Limpiar sets de asignación/desasignación
        this.trabajadoresParaDesasignar.clear();
      },
      error => {
        console.error("Error al actualizar asignaciones:", error);
        this.toastr.error("Error al actualizar asignaciones");
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
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
    private _usuarioService: UsuarioService,
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.paramMap.get('idSucursal') || '';
    this.getSucursal();
    this.cargarTrabajadores();
  }

  // Obtener detalles de la sucursal
  getSucursal(): void {
    this._sucursalService.obtenerSucursalPorId(this.idSucursal).subscribe((sucursal: any) => {
      this.nombreSucursal = sucursal.nombreSucursal;
    });
  }

  // Cargar trabajadores asignados y no asignados
  cargarTrabajadores(): void {
    this._sucursalService.obtenerTrabajadoresParaAsignacion(this.idSucursal).subscribe(data => {
      this.trabajadoresAsignados = data.trabajadoresAsignados;
      this.trabajadoresNoAsignados = data.trabajadoresNoAsignados;
    });
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

  // Guardar asignaciones y desasignaciones
  guardarAsignaciones(): void {
    const asignados = Array.from(this.trabajadoresParaAsignar);
    const desasignados = Array.from(this.trabajadoresParaDesasignar);

    this._sucursalService.asignarTrabajadores(this.idSucursal, asignados, desasignados).subscribe(
      () => {
        this.toastr.success('Asignaciones actualizadas con éxito');
        this.cargarTrabajadores(); // Recarga las listas de trabajadores para reflejar los cambios
        this.trabajadoresParaAsignar.clear(); // Limpia el set para próximas asignaciones
        this.trabajadoresParaDesasignar.clear();
      },
      error => {
        this.toastr.error('Error al actualizar asignaciones');
        console.error(error);
      }
    );
  }
}

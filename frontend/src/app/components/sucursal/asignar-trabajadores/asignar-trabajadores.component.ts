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
  listaUsuarios: any[] = [];
  idSucursal: string = '';
  sucursal: any;
  trabajadoresAsignados: any[] = [];
  trabajadoresNoAsignados: any[] = [];
  trabajadoresParaAsignar: Set<string> = new Set();
  trabajadoresParaDesasignar: Set<string> = new Set();
  nombreSucursal: string = '';

  constructor(
    private _usuarioService: UsuarioService,
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.paramMap.get('idSucursal') || '';
    this.getSucursal();
    this.getUsuarios();
    this.cargarTrabajadores();
  }

  // Obtener detalles de la sucursal
  getSucursal(): void {
    this._sucursalService.obtenerSucursalPorId(this.idSucursal).subscribe((sucursal: any) => {
      this.sucursal = sucursal;
      this.nombreSucursal = sucursal.nombreSucursal;
    });
  }

  /*
  // Obtener detalles de los usuarios
  getUsuarios(): void {
    this._usuarioService.obtenerUsuarios().subscribe((usuarios: any[]) => {
      this.listaUsuarios = usuarios;
      this.loadTrabajadoresAsignados();
    });
  }

  // Filtrar y cargar trabajadores asignados y no asignados
  loadTrabajadoresAsignados(): void {
    this._sucursalService.obtenerTrabajadoresSucursal(this.idSucursal).subscribe((data: any) => {
      // Extrae los IDs de los trabajadores asignados
      const assignedWorkerIds = data.assignedWorkers.map((worker: any) => worker._id);

      // Asigna los trabajadores asignados directamente
      this.trabajadoresAsignados = data.assignedWorkers;

      // Filtra los trabajadores no asignados comparando con los IDs de los asignados
      this.trabajadoresNoAsignados = this.listaUsuarios.filter(usuario =>
        /           !assignedWorkerIds.includes(usuario._id) // Verifica que el ID no esté en assignedWorkerIds
      );
    });
  }
*/

  /*
  actualizarAsignacion(usuarioId: string, asignar: boolean): void {
    if (asignar) {
      this.trabajadoresAsignados.add(usuarioId);
    } else {
      this.trabajadoresAsignados.delete(usuarioId);
    }
  }
  */

  cargarTrabajadores(): void {
    this._sucursalService.obtenerTrabajadoresParaAsignacion(this.idSucursal).subscribe(data => {
      this.trabajadoresAsignados = data.trabajadoresAsignados;
      this.trabajadoresNoAsignados = data.trabajadoresNoAsignados;
    });
  }

  toggleAsignacion(trabajadorId: string, asignar: boolean): void {
    if (asignar) {
      this.trabajadoresParaAsignar.add(trabajadorId);
      this.trabajadoresParaDesasignar.delete(trabajadorId);
    } else {
      this.trabajadoresParaDesasignar.add(trabajadorId);
      this.trabajadoresParaAsignar.delete(trabajadorId);
    }
  }

  guardarAsignaciones(): void {
    const asignados = Array.from(this.trabajadoresParaAsignar);
    const desasignados = Array.from(this.trabajadoresParaDesasignar);

    this._sucursalService.asignarTrabajadores(this.idSucursal, asignados, desasignados).subscribe(
      () => {
        this.toastr.success('Asignaciones actualizadas con éxito');
        this.cargarTrabajadores(); // Recarga las listas de trabajadores para reflejar los cambios
      },
      error => {
        this.toastr.error('Error al actualizar asignaciones');
        console.error(error);
      }
    );
  }

  // Obtener todos los usuarios y separarlos en asignados y no asignados
  getUsuarios(): void {
    this._usuarioService.obtenerUsuarios().subscribe((usuarios: any[]) => {
      this.listaUsuarios = usuarios;

      // Filtrar trabajadores según si están asignados o no
      this._sucursalService.obtenerTrabajadoresSucursal(this.idSucursal).subscribe((trabajadores: any[]) => {
        const trabajadoresAsignadosIds = new Set(trabajadores.map(t => t._id));

        // Dividir listaUsuarios en trabajadores asignados y no asignados
        this.trabajadoresAsignados = usuarios.filter(usuario =>
          usuario.rol === 'trabajador' && trabajadoresAsignadosIds.has(usuario._id)
        );
        this.trabajadoresNoAsignados = usuarios.filter(usuario =>
          usuario.rol === 'trabajador' && !trabajadoresAsignadosIds.has(usuario._id)
        );
      });
    });
  }
}

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
  trabajadoresAsignados: Set<string> = new Set();

  constructor(
    private _usuarioService: UsuarioService,
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idSucursal = this.route.snapshot.paramMap.get('idSucursal') || '';
    this.getUsuarios();
  }

  getUsuarios(): void {
    this._usuarioService.obtenerUsuarios().subscribe((usuarios: any[]) => {
      this.listaUsuarios = usuarios;
      this.loadTrabajadoresAsignados();
    });
  }

  loadTrabajadoresAsignados(): void {
    this._sucursalService.obtenerTrabajadoresSucursal(this.idSucursal).subscribe((trabajadores: any[]) => {
      trabajadores.forEach(trabajador => this.trabajadoresAsignados.add(trabajador._id));
    });
  }

  toggleAsignacion(usuarioId: string): void {
    if (this.trabajadoresAsignados.has(usuarioId)) {
      this.trabajadoresAsignados.delete(usuarioId);
    } else {
      this.trabajadoresAsignados.add(usuarioId);
    }
  }

  guardarAsignaciones(): void {
    const asignaciones = Array.from(this.trabajadoresAsignados);
    this._sucursalService.asignarTrabajadores(this.idSucursal, asignaciones).subscribe(() => {
      this.toastr.success('Asignaciones actualizadas con éxito');
    }, error => {
      this.toastr.error('Error al actualizar asignaciones');
      console.log(error);
    });
  }
}

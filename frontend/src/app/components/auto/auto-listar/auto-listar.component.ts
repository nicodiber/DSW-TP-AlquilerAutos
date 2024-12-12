import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AutoService } from '../../../services/auto.service';
import { auto } from '../../../models/auto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auto-listar',
  templateUrl: './auto-listar.component.html',
  styleUrls: ['./auto-listar.component.css']
})
export class AutoListarComponent implements OnInit {
  listaAutos: auto[] = [];
  usuarioLogueado: any;

  constructor(private autoService: AutoService, private _authservice: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.obtenerAutos();
  }

  obtenerAutos() {
    this.autoService.obtenerAutos().subscribe({
      next: (data) => {
        this.listaAutos = data;
      },
      error: (err) => console.error('Error al obtener los autos:', err)
    });
  }

  isNotAdminTrabajador() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
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

  eliminarAuto(autoId: number) {
    this.autoService.eliminarAuto(autoId).subscribe({
      next: () => {
        this.toastr.success('Auto eliminado con éxito');
        this.obtenerAutos(); // Actualiza la lista después de eliminar
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastr.error(err.error.msg, 'Error');
        } else {
          console.error('Error al eliminar auto:', err);
        }
      }
    });
  }

}

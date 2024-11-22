import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
  [x: string]: any;
  listaUsuarios: usuario[] = [];
  usuarioLogueado: any;
  usuarioIdToDelete: any | null = null;

  constructor(private _usuarioService: UsuarioService, private _authservice: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado();
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador') {
      window.location.href = '/loginUsuario';
    } else {
      this.getUsuarios();
    }
  }


  getUsuarios() {
    this._usuarioService.obtenerUsuarios().subscribe(data => {
      this.listaUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  abrirDeleteModal(id: any) {
    this.usuarioIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  confirmarDelete() {
    if (this.usuarioIdToDelete === this.usuarioLogueado._id) {
      this.toastr.error('No puedes eliminar tu propia cuenta.', 'Error');
      this.usuarioIdToDelete = null; // Reiniciamos el ID del usuario

      // Cierra el modal en caso de error
      const modal = document.getElementById('deleteModal');
      if (modal) {
        const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide(); // Ocultar el modal
      }

      return;
    }

    this._usuarioService.eliminarUsuario(this.usuarioIdToDelete).subscribe(
      (data) => {
        this.toastr.success('El usuario fue eliminado con éxito', 'Usuario Eliminado');
        this.getUsuarios();

        // Cierra el modal manualmente después de eliminar al usuario
        const modal = document.getElementById('deleteModal');
        if (modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide(); // Ocultar el modal
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.usuarioIdToDelete = null; // Reiniciamos el ID del usuario
  }

  deleteUsuario(id: any) {
    if (id === this.usuarioLogueado._id) {
      this.toastr.error('No puedes eliminar tu propia cuenta.', 'Error');
      return;
    }
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.success('El usuario fue eliminado con exito', 'Usuario Eliminado');
      this.getUsuarios();
    }, error => {
      console.log(error);
    })
  }
}
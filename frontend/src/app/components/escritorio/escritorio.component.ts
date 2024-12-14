import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AlquilerService } from '../../services/alquiler.service';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {
  usuario: any;
  alquilerIdToCancel: any | null = null;

  constructor(private authService: AuthService,
    private alquilerService: AlquilerService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (usuario) => {
        if (usuario) {
          this.usuario = usuario;
          if (usuario.rol === 'usuario') {
            this.getAlquileres();
          }
        } else {
          this.router.navigate(['/loginUsuario']);
        }
      },
      error: () => {
        this.router.navigate(['/loginUsuario']);
      },
    });
  }

  getAlquileres() {
    this.authService.obtenerAlquileresLogueado(this.usuario._id).subscribe({
      next: (alquileresDeUser) => {
        this.usuario = alquileresDeUser;
        console.log(this.usuario);
      },
      error: (error) => {
        console.error('Error al obtener alquileres:', error);
      }
    });
  }

  incidentesUsuario() { }

  irAGestionarUsuarios() {
    window.location.href = '/usuario-listar';
    //this.router.navigate(['/usuario-listar']);
  }
  irAGestionarSucursales() {
    window.location.href = '/sucursal-listar';
    //this.router.navigate(['/sucursal-listar']);
  }
  irAGestionarModelos() {
    window.location.href = '/modelos-listar';
  }
  irAGestionarMarcas() {
    window.location.href = '/marca-listar';
  }
  irAGestionarCategorias() {
    window.location.href = '/categoria-listar';
  }
  irAGestionarAlquileres() {
    window.location.href = '/alquiler-listar';
  }
  irAGestionarAutos() {
    window.location.href = '/auto-listar';
  }
  irAGestionarMantenimientos() {
    window.location.href = '/mantenimiento-listar';
  }
  irAGestionarIncidentes() {
    window.location.href = '/incidente-listar';
  }

  editarMisDatos() {
    window.location.href = '/editar-datos-usuario';
    //this.router.navigate(['/loginUsuario']);   Redirigir al login después de cerrar sesión
  }
  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        window.location.href = '/loginUsuario';
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }


  abrirCancelacionModal(id: any) {
    this.alquilerIdToCancel = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  confirmarCancelacion() {

    this.alquilerService.cancelarAlquilerActualizaAuto(this.alquilerIdToCancel).subscribe(
      (data) => {

        this.usuarioService.cancelarAlquilerUsuario(this.usuario._id, this.alquilerIdToCancel, 'cancelado').subscribe(
          (data) => {
            this.toastr.success('El alquiler del usuario fue cancelado con éxito', 'Alquiler Cancelado');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          (error) => {
            this.toastr.error('Error al cancelar el alquiler del usuario', 'Error');
            console.log(error);
          }
        );

        const modal = document.getElementById('deleteModal');
        if (modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
        }

        this.alquilerIdToCancel = null;
      },
      (error) => {
        this.toastr.error('Error al cambiar el estado del alquiler', 'Error');
        console.log(error);
      }
    );
  }
}

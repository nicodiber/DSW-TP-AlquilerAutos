import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-datos-usuario',
  templateUrl: './editar-datos-usuario.component.html',
  styleUrls: ['./editar-datos-usuario.component.css']
})
export class EditarDatosUsuarioComponent implements OnInit {
  usuario: any;
  usuarioForm: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private usuarioSerice: UsuarioService
  ) { 
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      licenciaConductor: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      direccion: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
         this.cargarDatosUsuario();
      },
      error: () => {
        // Redirigir al login si ocurre un error
        this.router.navigate(['/loginUsuario']);
      }
    });
    
  }

  cargarDatosUsuario() {
    this.usuarioForm.removeControl('password');
    this.usuarioForm.setValue({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email,
      
      licenciaConductor: this.usuario.licenciaConductor,
      telefono: this.usuario.telefono,
      dni: this.usuario.dni,
      direccion: this.usuario.direccion,
      rol: this.usuario.rol
    });
  }

  editarUsuario() {
    if (this.usuarioForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos correctamente', 'Error');
      return;
    }
    // Actualiza el usuario en el backend
    this.usuarioSerice.actualizarUsuario(this.usuarioForm.value).subscribe({
      next: (data) => {
        // Si la actualizacion por back salio joya, actualizamos el usuario en sessionStorage
        this.authService.setUsuarioLogueado(data);
        this.toastr.info('Usuario actualizado con éxito');
        setTimeout(() => {
          window.location.href = '/escritorio';
          }, 1000); // 2000 ms = 2 segundos 
      },
      error: (error) => {
        let errorMsg = 'Ocurrió un error al intentar actualizar el usuario';
        if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }
        this.toastr.error(errorMsg, 'Error de Actualización');
      }
    });
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
  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarPassword() {
    window.location.href = '/cambiar-password';    
  }
}

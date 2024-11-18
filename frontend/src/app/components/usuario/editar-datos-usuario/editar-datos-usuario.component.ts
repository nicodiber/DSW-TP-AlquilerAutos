import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private authService: AuthService
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
    const usuarioLogueado = this.authService.getUsuarioLogueado();
    if (!usuarioLogueado) {
      window.location.href ='/loginUsuario'; // Redirigir al login si no hay usuario
    } else {
      this.usuario = usuarioLogueado;
      this.cargarDatosUsuario();
    }
  }

  cargarDatosUsuario() {
    this.usuarioForm.setValue({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email,
      password: this.usuario.password,
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
    this.authService.actualizarUsuario(this.usuarioForm.value).subscribe({
      next: (data) => {
        // Si la actualizacion por back salio joya, actualizamos el usuario en sessionStorage
        this.authService.setUsuarioLogueado(data);
        this.toastr.info('Usuario actualizado con éxito');
        setTimeout(() => {
          window.location.href = '/tareas-admin';
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
    this.authService.logout(); 
    window.location.href = '/loginUsuario';
    //this.router.navigate(['/loginUsuario']);   Redirigir al login después de cerrar sesión
  }
  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

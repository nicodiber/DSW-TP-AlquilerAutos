import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginUsuario',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // this.authService.logout(); // Para asegurar que no haya nadie conectado
  }

  onLogin() {
    if (this.loginForm.invalid) {
      // Recorre los controles del formulario y muestra mensajes de error con toastr
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        
        if (control?.invalid) {
          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${key} es obligatorio.`, 'Error en el formulario');
          }
          if (control.errors?.['email']) {
            this.toastr.error('El email posee un formato inválido.', 'Error en el formulario');
          }
        }
      });
      this.loginForm.markAllAsTouched();
      return;
    }

    // Llama a la función de login si el formulario es válido
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        if (response && response.usuario) {
          // Guardar el usuario logueado en sessionStorage
          this.authService.setUsuarioLogueado(response.usuario);

          // Redirigir según el rol del usuario
          if (response.usuario.rol === 'administrador') {
            this.router.navigate(['/tareas-admin']);
          } else if (response.usuario.rol === 'trabajador') {
            this.router.navigate(['/tareas-trabajador']);
          } else {
            this.router.navigate(['/user']);
          }
        }
      },
      error => {
        console.error('Error de login:', error);
        this.toastr.error('Error al iniciar sesión. Verifique sus credenciales.', 'Error de Login');
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/registrar']);
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

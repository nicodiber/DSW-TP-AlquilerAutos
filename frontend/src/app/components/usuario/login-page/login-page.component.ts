// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-loginUsuario',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}


onLogin() {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        if (response && response.usuario) {
          // Guardar todo el objeto usuario en sessionStorage
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
      }
    );
  }
}


  navigateToRegister() {
    this.router.navigate(['/registrar']);
  }
}

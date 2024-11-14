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
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]],
    });
  }

  ngOnInit(): void {
   //datos que trae al finalizar el registrarse
  const emailRegistrado = localStorage.getItem('emailRegistrado');
  const passwordRegistrado = localStorage.getItem('passwordRegistrado');

  if (emailRegistrado && passwordRegistrado) {
    
    this.loginForm.patchValue({
      email: emailRegistrado,
      password: passwordRegistrado,
    });

    // limpia los valores del localstorage
    localStorage.removeItem('emailRegistrado');
    localStorage.removeItem('passwordRegistrado');
  }
    // this.authService.logout(); // Para asegurar que no haya nadie conectado pero por ahora no
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    // Llama a la función de login si el formulario es válido
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        if (response && response.usuario) {
          // Guardar el usuario logueado en sessionStorage
          this.authService.setUsuarioLogueado(response.usuario);

          
          if (response.usuario.rol === 'administrador') {
             window.location.href = '/tareas-admin';
            //this.router.navigate(['/tareas-admin']);
          } else if (response.usuario.rol === 'trabajador') {
            window.location.href = '/tareas-admin';
            //this.router.navigate(['/tareas-trabajador']);
          } else {
            window.location.href = '/user';
            //this.router.navigate(['/user']);
          }
        }
      },
      error => {
        console.error('Error de login:', error);
        this.toastr.warning('Correo electronico o contraseña incorrectos', 'Error de Login');
      }
    );
  }

 navigateToRegister() {
  window.location.href = '/registrar';
}




  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { gestionCookiesService } from '../../../services/gestionCookies.service';

@Component({
  selector: 'app-loginUsuario',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  mostrarContrasena: boolean = false;
  usuario: any;
  usuarioLogueado: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private gestionCoockies: gestionCookiesService,
    private router: Router,
    private toastr: ToastrService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]],
    });
  }

  ngOnInit(): void {
  this.isLogueado()
  this.datosDelRegister();
    
  }

  isLogueado() {
    this.authService.verificarToken().subscribe(response => {
      if (response.existe) {
        console.log("El usuario está autenticado.");
        window.location.href = '/escritorio';
      } else {
        console.log("El usuario no está autenticado.");
      }
    }, error => {
    console.error("Hubo un error al verificar el usuario", error);
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          const datosBusqueda = this.gestionCoockies.getDatosBusqueda();
            if (Object.keys(datosBusqueda).length > 0) {            
            this.router.navigate(['/alquiler-revision']); // lo manda a /alquiler-revision si hay datos en la cookie
            return;
          }
          this.authService.redirigirEnBaseAlRol(response.usuario.rol);
        },
        error: (err) => {
          console.error('Error de login:', err);
          this.toastr.warning('Correo electronico o contraseña incorrectos', 'Error de Login');
        },
      });
    }
    
  }

 navigateToRegister() {
  window.location.href = '/registrar';
}


  datosDelRegister() {
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
  }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}

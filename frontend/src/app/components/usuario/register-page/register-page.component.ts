import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';  // Cambia la ruta según tu estructura

@Component({
  selector: 'app-registrarse',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      licenciaConductor: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      direccion: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      // Recorre los controles del formulario y muestra mensajes de error con toastr
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        
        if (control?.invalid) {
        const friendlyFieldNames: { [key: string]: string } = {
          nombre: 'Nombre',
          apellido: 'Apellido',
          email: 'Correo Electrónico',
          licenciaConductor: 'Licencia de Conductor',
          password: 'Contraseña',
          telefono: 'Teléfono',
          dni: 'DNI',
          direccion: 'Dirección'
        };
        
        const fieldName = friendlyFieldNames[key] || key;

        if (control.errors?.['required']) {
          this.toastr.error(`El campo ${fieldName} es obligatorio.`, 'Error en el formulario');
        }
        if (control.errors?.['pattern']) {
          this.toastr.error(`El campo ${fieldName} tiene un formato incorrecto.`, 'Error en el formulario');
        }
        if (control.errors?.['minlength']) {
          this.toastr.error(`El campo ${fieldName} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`, 'Error en el formulario');
        }
        if (control.errors?.['email']) {
          this.toastr.error(`El correo electrónico posee un formato inválido.`, 'Error en el formulario');
        }
      }
      });
      this.registerForm.markAllAsTouched();
      return;
    }

    // Llama al servicio de registro si el formulario es válido
    const newUser = {
      ...this.registerForm.value,
      rol: 'usuario',  // Asigna el rol de "usuario" directamente
    };

    this.authService.register(newUser).subscribe(
      response => {
        this.toastr.success('El Usuario fue registrado con éxito!', 'Usuario Registrado!');


      localStorage.setItem('emailRegistrado', newUser.email);
      localStorage.setItem('passwordRegistrado', newUser.password);


        window.location.href = '/loginUsuario';
        //this.router.navigate(['/loginUsuario']);
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar registrar el usuario';
        
        // Verificar si es error de conflicto 409
        if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }

        this.toastr.error(errorMsg, 'Error de Registro');
      }
    );
  }
  toggleContrasena() {
        this.mostrarContrasena = !this.mostrarContrasena;
    }
}

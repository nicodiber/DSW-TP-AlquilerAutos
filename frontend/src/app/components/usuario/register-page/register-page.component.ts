import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';  // Cambia la ruta según tu estructura

@Component({
  selector: 'app-registrarse',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

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
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]], // Asumiendo DNI o pasaporte numérico de 7 a 10 dígitos
      direccion: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const newUser = {
        ...this.registerForm.value,
        rol: 'usuario',  // Asignamos el rol de "usuario" directamente
      };

      this.authService.register(newUser).subscribe(
        response => {
          this.toastr.success('El Usuario fue registrado con exito!', 'Usuario Registrado!');
          this.router.navigate(['/loginUsuario']);
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }
}

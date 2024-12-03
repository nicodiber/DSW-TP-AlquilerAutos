import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.token = val['token'];
      console.log(this.token);
    });
  }

  reset() {
    // Validación de los campos del formulario
    if (this.resetPasswordForm.invalid) {
      
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        const control = this.resetPasswordForm.get(key);
        if (control?.invalid) {
          const friendlyFieldNames: { [key: string]: string } = {
            password: 'Contraseña',
            confirmarPassword: 'Confirmar Contraseña'
          };
          const fieldName = friendlyFieldNames[key] || key;

          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${fieldName} es obligatorio.`, 'Error en el formulario');
          }
          if (control.errors?.['minlength']) {
            this.toastr.error(`El campo ${fieldName} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`, 'Error en el formulario');
          }
        }
      });
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    
    const password = this.resetPasswordForm.get('password')?.value;
    const confirmarContrasena = this.resetPasswordForm.get('confirmarPassword')?.value;

    if (password !== confirmarContrasena) {
      this.toastr.error('Las contraseñas ingresadas no coinciden', 'Error en el formulario');
      return;
    }

    
    const resetObj = {
      token: this.token,
      password: password
    };

    
    this.authService.resetPassword(resetObj).subscribe(
      response => {
        this.toastr.success('La contraseña se ha reiniciado, Volviendo a el inicio..', 'Contraseña reiniciada');
        this.resetPasswordForm.reset();
        setTimeout(() => {
          window.location.href = '/loginUsuario';
          }, 2000);  
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar reiniciar la contraseña';

        
        if (error.status === 401 || error.status === 500 ) {
          errorMsg = 'El token ha expirado o es inválido. Por favor, solicite un nuevo enlace de restablecimiento.';
          setTimeout(() => {
          window.location.href = '/forgot-password';
          }, 2000); 
        } else if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        } else if (error.error?.msg) {
          errorMsg = error.error.msg;
        }

        this.toastr.error(errorMsg, 'Error al reiniciar la contraseña');
        console.log(error);
      }
    );
  }
}

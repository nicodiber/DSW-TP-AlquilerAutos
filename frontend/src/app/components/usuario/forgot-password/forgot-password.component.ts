import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    
    if (this.forgotForm.invalid) {
      
      Object.keys(this.forgotForm.controls).forEach(key => {
        const control = this.forgotForm.get(key);

        if (control?.invalid) {
          const friendlyFieldNames: { [key: string]: string } = {
            email: 'Correo Electrónico',
          };

          const fieldName = friendlyFieldNames[key] || key;

          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${fieldName} es obligatorio.`, 'Error en el formulario');
          }
          if (control.errors?.['email']) {
            this.toastr.error(`El correo electrónico posee un formato inválido.`, 'Error en el formulario');
          }
        }
      });
      this.forgotForm.markAllAsTouched();
      return;
    }

    
    this.authService.enviarEmail(this.forgotForm.value.email).subscribe(
      response => {
        this.toastr.success('Se acaba de enviar el correo de reinicio de contraseña, revise su casilla de correos', 'Correo enviado!');
        this.forgotForm.reset();
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar enviar el mail';

        
        if (error.status === 404) {
          errorMsg = 'El correo electrónico ingresado no está registrado';
        } else if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }

        this.toastr.error(errorMsg, 'Error de reinicio');
      }
    );
  }
}

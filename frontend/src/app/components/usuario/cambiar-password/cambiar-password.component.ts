import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  cambiarContrasenaForm: FormGroup;
  usuario: any;

constructor(
  private fb: FormBuilder,
  private toastr: ToastrService,
  private usuarioService: UsuarioService,
  private authService: AuthService
) {
  this.cambiarContrasenaForm = this.fb.group({
    contrasenaActual: ['', [Validators.required, Validators.minLength(6)]],
    nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasena: ['', [Validators.required, Validators.minLength(6)]]
  });
}

cambiarContrasena() {
  if (this.cambiarContrasenaForm.invalid) {
    this.toastr.error('Completa todos los campos correctamente', 'Error');
    return;
  }

  const { contrasenaActual, nuevaContrasena, confirmarContrasena } = this.cambiarContrasenaForm.value;

  if (nuevaContrasena !== confirmarContrasena) {
    this.toastr.error('Las contraseñas ingresadas no coinciden', 'Error');
    return;
  }

  
  this.authService.getAuthenticatedUser().subscribe({
    next: (usuario) => {
      this.usuario = usuario; 

      
      this.usuarioService.cambiarPassword(this.usuario.email, { contrasenaActual, nuevaContrasena }).subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada con éxito. Regresando a la cuenta...');
          this.cambiarContrasenaForm.reset();
          setTimeout(() => {
            window.location.href = '/editar-datos-usuario';
          }, 1000);
        },
        error: (err) => {
          const mensajeError = err.error?.message || 'Error al cambiar la contraseña';
          this.toastr.error(mensajeError, 'Error');
        }
      });
    },
    error: () => {
      
      window.location.href = '/escritorio';
    }
  });
}

}


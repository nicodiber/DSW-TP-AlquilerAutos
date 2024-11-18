import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear-admin-trabajador',
  templateUrl: './crear-admin-trabajador.component.html',
  styleUrl: './crear-admin-trabajador.component.css'
})
export class CrearAdminTrabajadorComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear Admin / Trabajador';
  id: string | null;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute
  ) { 
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      licenciaConductor: ['', [Validators.pattern('^[A-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]],
      direccion: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  submitForm() {
    if (this.usuarioForm.invalid) {
    // Recorre los controles del formulario y muestra mensajes de error con toastr
    Object.keys(this.usuarioForm.controls).forEach(key => {
      const control = this.usuarioForm.get(key);
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
    this.usuarioForm.markAllAsTouched();
    return;
    
  }
    this.agregarUsuario();
  }

  agregarUsuario() {
    const rol = this.usuarioForm.get('rol')?.value;
    const dni = this.usuarioForm.get('dni')?.value;

  // Asigna el valor de licenciaConductor automáticamente
    const licenciaConductor = rol === 'administrador' ? `A${dni}` : rol === 'trabajador' ? `T${dni}` : '';
    const USUARIO: usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      email: this.usuarioForm.get('email')?.value,
      password: this.usuarioForm.get('password')?.value,
      licenciaConductor: licenciaConductor,
      telefono: this.usuarioForm.get('telefono')?.value,
      dni: this.usuarioForm.get('dni')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      rol: this.usuarioForm.get('rol')?.value,
    };

    if (this.id !== null) {
      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(
        data => {
          this.toastr.info('El Usuario fue actualizado con éxito!', 'Usuario Actualizado!');
          setTimeout(() => {
          window.location.href = '/usuario-listar';
          }, 1000);
        },
        error => {
          let errorMsg = 'Ocurrió un error al intentar actualizar el usuario';
        
        // Verificar si es error de conflicto 409
        if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }

        this.toastr.error(errorMsg, 'Error de Actualización');
        
        }
      );
    } else {
      this._usuarioService.guardarUsuario(USUARIO).subscribe(
        data => {
          this.toastr.success('El Usuario fue registrado con éxito!', 'Usuario Registrado!');
          setTimeout(() => {
          window.location.href = '/usuario-listar';
          }, 1000);
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
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password,
          licenciaConductor: data.licenciaConductor,
          telefono: data.telefono,
          dni: data.dni,
          direccion: data.direccion,
          rol: data.rol
        });
      });
    }
  }
  toggleContrasena() {
        this.mostrarContrasena = !this.mostrarContrasena;
    }
}
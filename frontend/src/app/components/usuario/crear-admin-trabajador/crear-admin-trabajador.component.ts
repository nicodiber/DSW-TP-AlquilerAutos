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
export class CrearAdminTrabajadorComponent implements OnInit{
  usuarioForm: FormGroup;
  titulo = 'Crear Admin / Trabajador';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) { 
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      licenciaConductor: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,10}$')]], // Asumiendo DNI o pasaporte numérico de 7 a 10 dígitos
      direccion: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id'); // Esta es la manera que tenemos para acceder al id
  }


  ngOnInit(): void {
    this.esEditar();
  }

  agregarUsuario() {

    const USUARIO: usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      email: this.usuarioForm.get('email')?.value,
      password: this.usuarioForm.get('password')?.value,
      licenciaConductor: this.usuarioForm.get('licenciaConductor')?.value,
      telefono: this.usuarioForm.get('telefono')?.value,
      dni: this.usuarioForm.get('dni')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      rol: this.usuarioForm.get('rol')?.value,
    };

    if (this.id !== null) {
    // Si existe un ID, significa que es una edición
    this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
      this.toastr.info('El Usuario fue actualizado con éxito!', 'Usuario Actualizado!');
      this.router.navigate(['/listarUsuarios']);
    }, error => {
      console.log(error);
      this.toastr.error('El Usuario NO fue actualizado', 'Error de Actualización');
    });
  } else {
    // Crear un nuevo usuario si no hay ID
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
      this.toastr.success('El Usuario fue registrado con éxito!', 'Usuario Registrado!');
      this.router.navigate(['/listarUsuarios']);
    }, error => {
      console.log(error);
      this.toastr.error('El Usuario NO fue registrado', 'Error de Registro');
      this.usuarioForm.reset();
    });
  }
  }
  
  esEditar() {
    if(this.id !== null) {
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
        })
      })
    }
  }

}

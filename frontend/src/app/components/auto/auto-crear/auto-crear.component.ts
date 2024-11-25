import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutoService } from '../../../services/auto.service';
import { ModeloService } from '../../../services/modelo.service';
import { SucursalService } from '../../../services/sucursal.service';
import { auto } from '../../../models/auto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auto-crear',
  templateUrl: './auto-crear.component.html',
  styleUrls: ['./auto-crear.component.css']
})
export class AutoCrearComponent implements OnInit {
  autoForm: FormGroup;
  titulo = 'Crear Auto';
  id: string | null;
  modelos: any[] = [];
  sucursales: any[] = [];
  usuarioLogueado: any;

  constructor(private fb: FormBuilder, private router: Router, private _authservice: AuthService, private toastr: ToastrService, private autoService: AutoService, private modeloService: ModeloService, private sucursalService: SucursalService, private aRouter: ActivatedRoute) {
    this.autoForm = this.fb.group({
      modeloAuto: ['', Validators.required],
      sucursalAuto: ['', Validators.required],
      estadoAuto: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$')]]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador' && this.usuarioLogueado.rol != 'trabajador') {
      window.location.href = '/loginUsuario'; 
    } else {
    this.cargarModelos();
    this.cargarSucursales();
    if (this.id === null) {
      this.autoForm.patchValue({ estadoAuto: 'disponible' });
      this.autoForm.get('estadoAuto')?.disable();
    } else {
      this.esEditar();
    }
  }
  }

  cargarModelos() {
    this.modeloService.obtenerModelos().subscribe({
      next: (data) => {
        this.modelos = data;
      },
      error: (err) => console.error('Error al cargar modelos:', err)
    });
  }

  cargarSucursales() {
    this.sucursalService.obtenerSucursales().subscribe({
      next: (data) => {
        this.sucursales = data;
      },
      error: (err) => console.error('Error al cargar sucursales:', err)
    });
  }

  submitForm() {
    if (this.autoForm.invalid) {
      this.showFormErrors();
      this.autoForm.markAllAsTouched();
      return;
    }

    this.agregarAuto();
  }

  agregarAuto() {
    const AUTO: auto = {
      modeloAuto: this.autoForm.get('modeloAuto')?.value,
      sucursalAuto: this.autoForm.get('sucursalAuto')?.value,
      estadoAuto: this.autoForm.get('estadoAuto')?.value,
      matricula: this.autoForm.get('matricula')?.value
    };

    if (this.id !== null) {
      // Editar auto
      this.autoService.editarAuto(this.id, AUTO).subscribe(
        data => {
          this.toastr.info('El auto fue actualizado con éxito!', 'Auto Actualizado!');
          this.router.navigate(['/auto-listar']);
        },
        error => this.handleError(error, 'actualizar')
      );
    } else {
      // Crear nuevo auto
      this.autoService.guardarAuto(AUTO).subscribe(
        data => {
          this.toastr.success('El auto fue registrado con éxito!', 'Auto Registrado!');
          this.router.navigate(['/auto-listar']);
        },
        error => this.handleError(error, 'registrar')
      );
    }
  }

  showFormErrors() {
    Object.keys(this.autoForm.controls).forEach(key => {
      const control = this.autoForm.get(key);
      if (control?.invalid) {
        if (control.errors?.['required']) {
          this.toastr.error(`El campo ${key} es obligatorio.`, 'Error en el formulario');
        }
        if (control.errors?.['pattern']) {
          this.toastr.error(`El campo ${key} tiene un formato incorrecto.`, 'Error en el formulario');
        }
      }
    });
  }

  handleError(error: any, action: string) {
    let errorMsg = `Ocurrió un error al intentar ${action} el auto`;
    if (error.status === 409 && error.error && error.error.msg) {
      errorMsg = error.error.msg;
    }
    this.toastr.error(errorMsg, `Error de ${action} === 'registrar' ? 'Registro' : 'Actualización'}`);
    this.autoForm.reset();
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Auto';
      this.autoService.obtenerAuto(this.id).subscribe(data => {
        console.log("Estado recibido:", data.estadoAuto);
        this.autoForm.patchValue({
          modeloAuto: data.modeloAuto._id,     // Asigna el ID para que coincida con las opciones del select
          sucursalAuto: data.sucursalAuto._id, // Asigna el ID para que coincida con las opciones del select
          // historialMantenimiento: data.historialMantenimiento,
          estadoAuto: data.estadoAuto,
          matricula: data.matricula
        });
      });
    }
  }

}

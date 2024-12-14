import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { ModeloService } from '../../../services/modelo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { AuthService } from '../../../services/auth.service';
import { IncidenteService } from '../../../services/incidente.service';
import { AlquilerService } from '../../../services/alquiler.service';
import { incidente } from '../../../models/incidente';

@Component({
  selector: 'app-incidente-crear',
  templateUrl: './incidente-crear.component.html',
  styleUrl: './incidente-crear.component.css'
})
export class IncidenteCrearComponent implements OnInit {
  
  incidenteForm: FormGroup;
  titulo = 'Crear Incidente';
  id: string | null;
  categorias: any[] = [];
  alquileres: any[] = [];
  alquileresCompletados: any[] = [];
  usuarioLogueado: any;
  fechaInput: string = ''; // Usado solo para 'fecha' y 'fechaFinReal'
  fechaISO: string = '';   // Fecha en formato ISO (YYYY-MM-DD)
  fechaValida: boolean = true;

   constructor(private fb: FormBuilder,
                private router: Router,
                private toastr: ToastrService,
                private incidenteService: IncidenteService,
                private _authservice: AuthService,
                private alquilerService: AlquilerService,
                private aRouter: ActivatedRoute) {
      this.incidenteForm = this.fb.group({
        idAlquiler: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        costoIncidente: ['', [Validators.required, Validators.min(0)]],
        fechaIncidente: ['', [Validators.required]],
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }


ngOnInit(): void {
  this.isNotAdminTrabajador();
  this.esEditar();
  this.alquilerService.obtenerAlquileres().subscribe((data: any[]) => {
    this.alquileres = data;
    this.alquileresCompletados = this.alquileres.filter(alquiler => alquiler.estadoAlquiler === 'completado');
  });
  }


  isNotAdminTrabajador() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
              // Si el rol es admin o trabajador, se permite el acceso
            } else {
              // Otros roles, patea a login
              window.location.href = '/loginUsuario';
            }
          },
          (error) => {
            window.location.href = '/loginUsuario';
          }
        );
    }

  submitForm() {
    if (this.incidenteForm.invalid) {
    // Recorre los controles del formulario y muestra mensajes de error con toastr
    Object.keys(this.incidenteForm.controls).forEach(key => {
      const control = this.incidenteForm.get(key);

      if (control?.invalid) {
        const friendlyFieldNames: { [key: string]: string } = {
          idAlquiler: 'Alquiler',
          descripcion: 'Descripcion',
          costoIncidente: 'Costo Incidente',
        };

        const fieldName = friendlyFieldNames[key] || key;

        if (control.errors?.['required']) {
          this.toastr.error(`El campo ${fieldName} es obligatorio.`, 'Error en el formulario');
        }
        if (control.errors?.['pattern']) {
          this.toastr.error(`El campo ${fieldName} tiene un formato incorrecto.`, 'Error en el formulario');
        }
        if (control.errors?.['min']) {
          this.toastr.error(`El campo ${fieldName} debe ser mayor o igual a ${control.errors['min'].min}.`, 'Error en el formulario');
        }
        if (control.errors?.['max']) {
          this.toastr.error(`El campo ${fieldName} debe ser menor o igual a ${control.errors['max'].max}.`, 'Error en el formulario');
        }
      }
    });
    this.incidenteForm.markAllAsTouched();
    return;
    }
  }

  agregarIncidente() {
  const INCIDENTE: incidente = {
    ...this.incidenteForm.getRawValue(), // Obtiene los valores incluyendo los deshabilitados
    estadoIncidente: 'impago'
  };

  if (this.id !== null) {
    this.incidenteService.editarIncidente(this.id, INCIDENTE).subscribe(
      data => {
        this.toastr.info('El Incidente fue actualizado con éxito!', 'Incidente Actualizado!');
        setTimeout(() => {
          window.location.href = '/incidente-listar';
        }, 1000);
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar actualizar el incidente';
        if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }
        this.toastr.error(errorMsg, 'Error de Actualización');
      }
    );
  } else {
    this.incidenteService.guardarIncidente(INCIDENTE).subscribe(
      data => {
        this.toastr.success('El Incidente fue registrado con éxito!', 'Incidente Registrado!');
        setTimeout(() => {
          window.location.href = '/incidente-listar';
        }, 1000);
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar registrar el incidente';
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
    this.titulo = 'Editar Incidente';
    this.incidenteService.obtenerIncidente(this.id).subscribe(data => {
      const fechaIncidente = data.fechaIncidente ? data.fechaIncidente.split('T')[0] : '';
      this.incidenteForm.patchValue({
        idAlquiler: data.idAlquiler,
        descripcion: data.descripcion,
        costoIncidente: data.costoIncidente,
        fechaIncidente: fechaIncidente, 
      });
    });
  }
}

  
  

}

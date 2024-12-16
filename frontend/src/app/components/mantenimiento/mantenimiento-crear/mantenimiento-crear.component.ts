import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from '../../../services/auth.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AutoService } from '../../../services/auto.service';
import { AlquilerService } from '../../../services/alquiler.service';

@Component({
  selector: 'app-mantenimiento-crear',
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {
  
  mantenimientoForm: FormGroup;
  titulo = 'Crear Mantenimiento';
  id: string | null;
  mantenimientos: any[] = [];
  autos: any[] = [];
  autosDisponibles: any[] = [];
  usuarioLogueado: any;
  

   constructor(private fb: FormBuilder,
                private toastr: ToastrService,
                private mantenimientoService: MantenimientoService,
                private _authservice: AuthService,
                private autoService: AutoService,
                private aRouter: ActivatedRoute,
                private _alquilerService: AlquilerService) {
      this.mantenimientoForm = this.fb.group({
        auto: ['', [Validators.required]],
      });
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }


  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.autoService.obtenerAutos().subscribe((data: any[]) => {
      this.autos = data;
      this.autosDisponibles = this.autos.filter(auto => auto.estadoAuto === 'disponible');
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
    if (this.mantenimientoForm.invalid) {
    // Recorre los controles del formulario y muestra mensajes de error con toastr
    Object.keys(this.mantenimientoForm.controls).forEach(key => {
      const control = this.mantenimientoForm.get(key);

      if (control?.invalid) {
        const friendlyFieldNames: { [key: string]: string } = {
          auto: 'Auto',
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
    this.mantenimientoForm.markAllAsTouched();
    return;
    }
  }

  agregarMantenimiento() {

    const MANTENIMIENTO = {
      ...this.mantenimientoForm.getRawValue() // Obtiene los valores incluyendo los deshabilitados
    };

    this.mantenimientoService.crearMantenimientoAlquiler(MANTENIMIENTO.auto).subscribe(
      data => {
        this.toastr.success('El Mantenimiento fue registrado con éxito!', 'Mantenimiento Registrado!');
        setTimeout(() => {
          window.location.href = '/mantenimiento-listar';
        }, 1000);
      },
      error => {
        let errorMsg = 'Ocurrió un error al intentar registrar el mantenimiento';
        if (error.status === 409 && error.error && error.error.msg) {
          errorMsg = error.error.msg;
        }
        this.toastr.error(errorMsg, 'Error de Registro');
      }
    );

    // Actualizar el estado del Auto
    this._alquilerService.actualizarEstadoAuto('0', String(MANTENIMIENTO.auto), 'mantenimiento').subscribe(
      () => {
        console.log('Estado del auto actualizado');
      },
      (error: any) => {
        console.error('Error al actualizar el estado del auto:', error);
      }
    );
  }
}

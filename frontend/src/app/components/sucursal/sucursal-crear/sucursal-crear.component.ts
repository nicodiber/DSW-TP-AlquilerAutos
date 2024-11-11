import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../../services/sucursal.service';
import { sucursal } from '../../../models/sucursal';

@Component({
  selector: 'app-sucursal-crear',
  templateUrl: './sucursal-crear.component.html',
  styleUrls: ['./sucursal-crear.component.css']
})
export class SucursalCrearComponent implements OnInit {
  sucursalForm: FormGroup;
  titulo = 'Crear Sucursal';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _sucursalService: SucursalService,
    private aRouter: ActivatedRoute) {
    this.sucursalForm = this.fb.group({
      nombreSucursal: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      telefonoSucursal: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      direccionSucursal: ['', [Validators.required]],
      paisSucursal: ['', [Validators.required]],
      provinciaSucursal: ['', [Validators.required]],
      ciudadSucursal: ['', [Validators.required]],
      horaAperturaSucursal: ['', [Validators.required]],
      horaCierreSucursal: ['', [Validators.required]],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  submitForm() {
    if (this.sucursalForm.invalid) {
      Object.keys(this.sucursalForm.controls).forEach(key => {
        const control = this.sucursalForm.get(key);

        if (control?.invalid) {
          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${key} es obligatorio.`, 'Error en el formulario');
          }
          if (control.errors?.['pattern']) {
            this.toastr.error(`El campo ${key} tiene un formato incorrecto.`, 'Error en el formulario');
          }
          if (control.errors?.['minlength']) {
            this.toastr.error(`El campo ${key} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`, 'Error en el formulario');
          }
        }
      });
      this.sucursalForm.markAllAsTouched();
      return;
    }

    this.agregarSucursal();
  }


  agregarSucursal() {
    if (this.sucursalForm.invalid) {
      this.showFormErrors();
      this.sucursalForm.markAllAsTouched();
      return;
    }

    const SUCURSAL: sucursal = {
      nombreSucursal: this.sucursalForm.get('nombreSucursal')?.value,
      telefonoSucursal: this.sucursalForm.get('telefonoSucursal')?.value,
      direccionSucursal: this.sucursalForm.get('direccionSucursal')?.value,
      paisSucursal: this.sucursalForm.get('paisSucursal')?.value,
      provinciaSucursal: this.sucursalForm.get('provinciaSucursal')?.value,
      ciudadSucursal: this.sucursalForm.get('ciudadSucursal')?.value,
      horaAperturaSucursal: this.sucursalForm.get('horaAperturaSucursal')?.value,
      horaCierreSucursal: this.sucursalForm.get('horaCierreSucursal')?.value,
    };

    if (this.id !== null) {
      // Editar sucursal
      this._sucursalService.editarSucursal(this.id, SUCURSAL).subscribe(
        data => {
          this.toastr.info('La sucursal fue actualizada con éxito!', 'Sucursal Actualizada!');
          this.router.navigate(['/sucursal-listar']);
        },
        error => this.handleError(error, 'actualizar')
      );
    } else {
      // Crear nueva sucursal
      this._sucursalService.guardarSucursal(SUCURSAL).subscribe(
        data => {
          this.toastr.success('La sucursal fue registrada con éxito!', 'Sucursal Registrada!');
          this.router.navigate(['/sucursal-listar']);
        },
        error => this.handleError(error, 'registrar')
      );
    }
  }

  showFormErrors() {
    Object.keys(this.sucursalForm.controls).forEach(key => {
      const control = this.sucursalForm.get(key);
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
    let errorMsg = `Ocurrió un error al intentar ${action} la sucursal`;
    if (error.status === 409 && error.error && error.error.msg) {
      errorMsg = error.error.msg;
    }
    this.toastr.error(errorMsg, `Error de ${action === 'registrar' ? 'Registro' : 'Actualización'}`);
    this.sucursalForm.reset();
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Sucursal';
      this._sucursalService.obtenerSucursal(this.id).subscribe(data => {
        this.sucursalForm.setValue({
          nombreSucursal: data.nombreSucursal,
          telefonoSucursal: data.telefonoSucursal,
          direccionSucursal: data.direccionSucursal,
          paisSucursal: data.paisSucursal,
          provinciaSucursal: data.provinciaSucursal,
          ciudadSucursal: data.ciudadSucursal,
          horaAperturaSucursal: data.horaAperturaSucursal,
          horaCierreSucursal: data.horaCierreSucursal,
        });
      });
    }
  }
}

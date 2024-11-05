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
      trabajadores: [''],  // Puede ser opcional, IDs separados por comas
      autos: ['']           // Puede ser opcional, IDs separados por comas
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarSucursal() {
    const SUCURSAL: sucursal = {
      nombreSucursal: this.sucursalForm.get('nombreSucursal')?.value,
      telefonoSucursal: this.sucursalForm.get('telefonoSucursal')?.value,
      direccionSucursal: this.sucursalForm.get('direccionSucursal')?.value,
      paisSucursal: this.sucursalForm.get('paisSucursal')?.value,
      provinciaSucursal: this.sucursalForm.get('provinciaSucursal')?.value,
      ciudadSucursal: this.sucursalForm.get('ciudadSucursal')?.value,
      horaAperturaSucursal: this.sucursalForm.get('horaAperturaSucursal')?.value,
      horaCierreSucursal: this.sucursalForm.get('horaCierreSucursal')?.value,
      trabajadores: this.sucursalForm.get('trabajadores')?.value ? this.sucursalForm.get('trabajadores')?.value.split(',') : [],
      autos: this.sucursalForm.get('autos')?.value ? this.sucursalForm.get('autos')?.value.split(',') : []
    };

    if (this.id !== null) {
      // Editar sucursal
      this._sucursalService.editarSucursal(this.id, SUCURSAL).subscribe(data => {
        this.toastr.info('La sucursal fue actualizada con éxito!', 'Sucursal Actualizada!');
        this.router.navigate(['/listarSucursales']);
      }, error => {
        console.log(error);
        this.toastr.error('La sucursal NO fue actualizada', 'Error de Actualización');
      });
    } else {
      // Crear nueva sucursal
      this._sucursalService.guardarSucursal(SUCURSAL).subscribe(data => {
        this.toastr.success('La sucursal fue registrada con éxito!', 'Sucursal Registrada!');
        this.router.navigate(['/listarSucursales']);
      }, error => {
        console.log(error);
        this.toastr.error('La sucursal NO fue registrada', 'Error de Registro');
        this.sucursalForm.reset();
      });
    }
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
          trabajadores: data.trabajadores ? data.trabajadores.join(',') : '',
          autos: data.autos ? data.autos.join(',') : ''
        });
      });
    }
  }
}

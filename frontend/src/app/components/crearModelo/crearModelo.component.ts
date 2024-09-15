import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modelo } from '../../models/modelo';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { ModeloService } from '../../services/modelo.service';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-crearModelo',
  templateUrl: './crearModelo.component.html',
  styleUrls: ['./crearModelo.component.css']
})
export class CrearModeloComponent implements OnInit {
  modeloForm: FormGroup;
  titulo = 'Crear Modelo';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _modeloService: ModeloService,
              private _tipoService: TipoService,
              private aRouter: ActivatedRoute) {
    this.modeloForm = this.fb.group({
      nombreModelo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]], // Alfanumérico con espacios
      tipoModelo: ['', [Validators.required]], // Debe seleccionar un tipo de modelo
      anioModelo: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]], // Año válido
      colorModelo: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras
      dimensionesModelo: ['', [Validators.required]],
      cantidadAsientosModelo: ['', [Validators.required, Validators.min(1)]], // Al menos 1 asiento
      cantidadPuertasModelo: ['', [Validators.required, Validators.min(2)]], // Al menos 2 puertas
      motorModelo: ['', [Validators.required]],
      cajaTransmisionModelo: ['', [Validators.required]],
      tipoCombustibleModelo: ['', [Validators.required]],
      capacidadTanqueCombustibleModelo: ['', [Validators.required, Validators.min(1)]], // Al menos 1 litro
      capacidadBaulModelo: ['', [Validators.required, Validators.min(1)]], // Al menos 1 litro de capacidad de baúl
      precioModelo: ['', [Validators.required, Validators.min(0)]], // Precio mayor o igual a 0
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  tipos: any[] = [];

  ngOnInit(): void {
    this.esEditar();

    // Obtener los tipos de modelo desde el servicio
    this._tipoService.obtenerTipos().subscribe((data: any[]) => {
      this.tipos = data;
    });
  }

  agregarModelo() {
    if (this.modeloForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    console.log('Formulario válido, enviando datos');
    const MODELO: modelo = {
      nombreModelo: this.modeloForm.get('nombreModelo')?.value,
      tipoModelo: this.modeloForm.get('tipoModelo')?.value,
      anioModelo: this.modeloForm.get('anioModelo')?.value,
      colorModelo: this.modeloForm.get('colorModelo')?.value,
      dimensionesModelo: this.modeloForm.get('dimensionesModelo')?.value,
      cantidadAsientosModelo: this.modeloForm.get('cantidadAsientosModelo')?.value,
      cantidadPuertasModelo: this.modeloForm.get('cantidadPuertasModelo')?.value,
      motorModelo: this.modeloForm.get('motorModelo')?.value,
      cajaTransmisionModelo: this.modeloForm.get('cajaTransmisionModelo')?.value,
      tipoCombustibleModelo: this.modeloForm.get('tipoCombustibleModelo')?.value,
      capacidadTanqueCombustibleModelo: this.modeloForm.get('capacidadTanqueCombustibleModelo')?.value,
      capacidadBaulModelo: this.modeloForm.get('capacidadBaulModelo')?.value,
      precioModelo: this.modeloForm.get('precioModelo')?.value,
    };

    if (this.id !== null) {
      console.log('Editando modelo:', MODELO);
      this._modeloService.editarModelo(this.id, MODELO).subscribe(data => {
        console.log('Modelo editado', data);
        this.toastr.info('El modelo fue actualizado con éxito!', 'Modelo Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al actualizar modelo', error);
        this.modeloForm.reset();
      });
    } else {
      console.log('Guardando modelo:', MODELO);
      this._modeloService.guardarModelo(MODELO).subscribe(data => {
        console.log('Modelo guardado', data);
        this.toastr.success('El modelo fue registrado con éxito!', 'Modelo Registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al guardar modelo', error);
        this.modeloForm.reset();
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Modelo';
      this._modeloService.obtenerModelo(this.id).subscribe(data => {
        this.modeloForm.setValue({
          nombreModelo: data.nombreModelo,
          tipoModelo: data.tipoModelo,
          anioModelo: data.anioModelo,
          colorModelo: data.colorModelo,
          dimensionesModelo: data.dimensionesModelo,
          cantidadAsientosModelo: data.cantidadAsientosModelo,
          cantidadPuertasModelo: data.cantidadPuertasModelo,
          motorModelo: data.motorModelo,
          cajaTransmisionModelo: data.cajaTransmisionModelo,
          tipoCombustibleModelo: data.tipoCombustibleModelo,
          capacidadTanqueCombustibleModelo: data.capacidadTanqueCombustibleModelo,
          capacidadBaulModelo: data.capacidadBaulModelo,
          precioModelo: data.precioModelo,
        });
      });
    }
  }
}

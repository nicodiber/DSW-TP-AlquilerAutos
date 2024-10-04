import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modelo } from '../../models/modelo';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { ModeloService } from '../../services/modelo.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';

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
              private _categoriaService: CategoriaService,
              private _marcaService: MarcaService,
              private aRouter: ActivatedRoute) {
    this.modeloForm = this.fb.group({
      nombreModelo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]], // Alfanumérico con espacios
      categoriaModelo: ['', [Validators.required]], // Debe seleccionar uno
      marcaModelo: ['', [Validators.required]], // Debe seleccionar uno
      precioXdia: ['', [Validators.required, Validators.min(0)]], // Precio mayor o igual a 0
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]], // Año válido
      color: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras
      dimensiones: ['', [Validators.required]],
      cantidadAsientos: ['', [Validators.required, Validators.min(1)]], // Al menos 1 asiento
      cantidadPuertas: ['', [Validators.required, Validators.min(2)]], // Al menos 2 puertas
      motor: ['', [Validators.required]],
      cajaTransmision: ['', [Validators.required]],
      tipoCombustible: ['', [Validators.required]],
      capacidadTanqueCombustible: ['', [Validators.required, Validators.min(1)]], // Al menos 1 litro
      capacidadBaul: ['', [Validators.required, Validators.min(1)]], // Al menos 1 litro de capacidad de baúl
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  categorias: any[] = [];
  marcas: any[] = [];

  ngOnInit(): void {
    this.esEditar();

    // Obtener los tipos de modelo desde el servicio
    this._categoriaService.obtenerCategorias().subscribe((data: any[]) => {
      this.categorias = data;
    });

    // Obtener los tipos de modelo desde el servicio
    this._marcaService.obtenerMarcas().subscribe((data: any[]) => {
      this.marcas = data;
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
      categoriaModelo: this.modeloForm.get('categoriaModelo')?.value,
      marcaModelo: this.modeloForm.get('marcaModelo')?.value,
      precioXdia: this.modeloForm.get('precioXdia')?.value,
      anio: this.modeloForm.get('anio')?.value,
      color: this.modeloForm.get('color')?.value,
      dimensiones: this.modeloForm.get('dimensiones')?.value,
      cantidadAsientos: this.modeloForm.get('cantidadAsientos')?.value,
      cantidadPuertas: this.modeloForm.get('cantidadPuertas')?.value,
      motor: this.modeloForm.get('motor')?.value,
      cajaTransmision: this.modeloForm.get('cajaTransmision')?.value,
      tipoCombustible: this.modeloForm.get('tipoCombustible')?.value,
      capacidadTanqueCombustible: this.modeloForm.get('capacidadTanqueCombustible')?.value,
      capacidadBaul: this.modeloForm.get('capacidadBaul')?.value,
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
          categoriaModelo: data.categoriaModelo,
          marcaModelo: data.marcaModelo,
          precioXdia: data.precioXdia,
          anio: data.anio,
          color: data.color,
          dimensiones: data.dimensiones,
          cantidadAsientos: data.cantidadAsientos,
          cantidadPuertas: data.cantidadPuertas,
          motor: data.motor,
          cajaTransmision: data.cajaTransmision,
          tipoCombustible: data.tipoCombustible,
          capacidadTanqueCombustible: data.capacidadTanqueCombustible,
          capacidadBaul: data.capacidadBaul,
        });
      });
    }
  }
}

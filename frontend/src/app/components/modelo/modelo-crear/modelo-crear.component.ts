import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { ModeloService } from '../../../services/modelo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-modelo-crear',
  templateUrl: './modelo-crear.component.html',
  styleUrls: ['./modelo-crear.component.css']
})
export class CrearModeloComponent implements OnInit {
  modeloForm: FormGroup;
  titulo = 'Crear Modelo';
  id: string | null;
  selectedFiles: File[] = []; // Nueva propiedad para almacenar las imágenes
  categorias: any[] = [];
  marcas: any[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _modeloService: ModeloService,
              private _categoriaService: CategoriaService,
              private _marcaService: MarcaService,
              private aRouter: ActivatedRoute) {
    this.modeloForm = this.fb.group({
      nombreModelo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      categoriaModelo: ['', [Validators.required]],
      marcaModelo: ['', [Validators.required]],
      precioXdia: ['', [Validators.required, Validators.min(0)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      color: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dimensiones: ['', [Validators.required]],
      cantidadAsientos: ['', [Validators.required, Validators.min(1)]],
      cantidadPuertas: ['', [Validators.required, Validators.min(2)]],
      motor: ['', [Validators.required]],
      cajaTransmision: ['', [Validators.required]],
      tipoCombustible: ['', [Validators.required]],
      capacidadTanqueCombustible: ['', [Validators.required, Validators.min(1)]],
      capacidadBaul: ['', [Validators.required, Validators.min(1)]],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this._categoriaService.obtenerCategorias().subscribe((data: any[]) => {
      this.categorias = data;
    });
    this._marcaService.obtenerMarcas().subscribe((data: any[]) => {
      this.marcas = data;
    });
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    if (event.target.files.length <= 5) {
      this.selectedFiles = Array.from(event.target.files);
    } else {
      alert("Solo puedes seleccionar hasta 5 imágenes.");
    }
  }

  // Método para agregar un nuevo modelo con imágenes
  agregarModelo() {
    if (this.modeloForm.invalid || this.selectedFiles.length === 0) {
      console.log('Formulario inválido o no se seleccionaron imágenes');
      return;
    }

    const formData = new FormData();
    formData.append('nombreModelo', this.modeloForm.get('nombreModelo')?.value);
    formData.append('categoriaModelo', this.modeloForm.get('categoriaModelo')?.value);
    formData.append('marcaModelo', this.modeloForm.get('marcaModelo')?.value);
    formData.append('precioXdia', this.modeloForm.get('precioXdia')?.value);
    formData.append('anio', this.modeloForm.get('anio')?.value);
    formData.append('color', this.modeloForm.get('color')?.value);
    formData.append('dimensiones', this.modeloForm.get('dimensiones')?.value);
    formData.append('cantidadAsientos', this.modeloForm.get('cantidadAsientos')?.value);
    formData.append('cantidadPuertas', this.modeloForm.get('cantidadPuertas')?.value);
    formData.append('motor', this.modeloForm.get('motor')?.value);
    formData.append('cajaTransmision', this.modeloForm.get('cajaTransmision')?.value);
    formData.append('tipoCombustible', this.modeloForm.get('tipoCombustible')?.value);
    formData.append('capacidadTanqueCombustible', this.modeloForm.get('capacidadTanqueCombustible')?.value);
    formData.append('capacidadBaul', this.modeloForm.get('capacidadBaul')?.value);

    // Agregar las imágenes al FormData
    this.selectedFiles.forEach((file) => {
      formData.append('images', file); // 'images' debe coincidir con el nombre en multer.array()
    });

    if (this.id !== null) {
      this._modeloService.editarModelo(this.id, formData).subscribe(data => {
        this.toastr.info('El modelo fue actualizado con éxito!', 'Modelo Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al actualizar modelo', error);
        this.modeloForm.reset();
      });
    } else {
      this._modeloService.guardarModelo(formData).subscribe(data => {
        this.toastr.success('El modelo fue registrado con éxito!', 'Modelo Registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log('Error al guardar modelo', error);
        this.modeloForm.reset();
      });
    }

    console.log('Datos enviados:', Array.from((formData as any).entries()));
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
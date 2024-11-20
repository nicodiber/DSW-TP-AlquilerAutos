import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { ModeloService } from '../../../services/modelo.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { AuthService } from '../../../services/auth.service';

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
  existingImages: string[] = []; // Nueva propiedad para imágenes existentes
  categorias: any[] = [];
  marcas: any[] = [];
  usuarioLogueado: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _modeloService: ModeloService,
              private _authservice: AuthService,
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
        dimensiones: ['', [Validators.required, Validators.pattern('^[0-9]+x[0-9]+x[0-9]+$')]],
      cantidadAsientos: ['', [Validators.required, Validators.min(1)]],
      cantidadPuertas: ['', [Validators.required, Validators.min(2)]],
      motor: ['', [Validators.required, Validators.pattern('^[0-9]+.[0-9]+$')]],
      cajaTransmision: ['', [Validators.required]],
      tipoCombustible: ['', [Validators.required]],
      capacidadTanqueCombustible: ['', [Validators.required, Validators.min(1)]],
      capacidadBaul: ['', [Validators.required, Validators.min(1)]],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.usuarioLogueado = this._authservice.getUsuarioLogueado(); 
    if (!this.usuarioLogueado || this.usuarioLogueado.rol != 'administrador' && this.usuarioLogueado.rol != 'trabajador') {
      window.location.href = '/loginUsuario'; 
    } else {
    this.esEditar();
    this._categoriaService.obtenerCategorias().subscribe((data: any[]) => {
      this.categorias = data;
    });
    this._marcaService.obtenerMarcas().subscribe((data: any[]) => {
      this.marcas = data;
    });
    }
  }
  submitForm() {
    if (this.modeloForm.invalid) {
    // Recorre los controles del formulario y muestra mensajes de error con toastr
    Object.keys(this.modeloForm.controls).forEach(key => {
      const control = this.modeloForm.get(key);

      if (control?.invalid) {
        const friendlyFieldNames: { [key: string]: string } = {
          nombreModelo: 'Nombre de Modelo',
          categoriaModelo: 'Categoría',
          marcaModelo: 'Marca',
          precioXdia: 'Precio por día',
          anio: 'Año',
          color: 'Color',
          dimensiones: 'Dimensiones',
          cantidadAsientos: 'Cantidad de Asientos',
          cantidadPuertas: 'Cantidad de Puertas',
          motor: 'Motor',
          cajaTransmision: 'Caja de Transmisión',
          tipoCombustible: 'Tipo de Combustible',
          capacidadTanqueCombustible: 'Capacidad del Tanque de Combustible',
          capacidadBaul: 'Capacidad del Baúl'
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
    this.modeloForm.markAllAsTouched();
    return;
    }
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    if (event.target.files.length <= 4) {
        this.selectedFiles = Array.from(event.target.files); // Agrega nuevas imágenes REVISAR DESPUES
    } else {
        this.toastr.error("Solo puedes seleccionar hasta 4 imágenes");
        this.selectedFiles = []
    }
}




  // Método para agregar un nuevo modelo con imágenes
  agregarModelo() {
    if (this.modeloForm.invalid) {
        console.log('Formulario inválido');
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

    // Agregar imágenes existentes
    if (this.id !== null) {
        this.existingImages.forEach((img) => {
            formData.append('existingImages', img); // Usa un campo específico como 'existingImages'
        });
    }

    // Agregar nuevas imágenes seleccionadas
    this.selectedFiles.forEach((file) => {
        formData.append('images', file); // 'images' debe coincidir con el nombre en multer.array()
    });

    if (this.id !== null) {
        this._modeloService.editarModelo(this.id, formData).subscribe(data => {
            this.toastr.info('El modelo fue actualizado con éxito!', 'Modelo Actualizado!');
            setTimeout(() => {
                window.location.href = '/modelos-listar';
            }, 1000);
        }, error => {
            let errorMsg = 'Ocurrió un error al intentar actualizar el usuario';
            if (error.status === 409 && error.error && error.error.msg) {
                errorMsg = error.error.msg;
            }
            this.toastr.error(errorMsg, 'Error de Actualización');
        });
    } else {
        this._modeloService.guardarModelo(formData).subscribe(data => {
            this.toastr.success('El modelo fue registrado con éxito!', 'Modelo Registrado!');
            setTimeout(() => {
                window.location.href = '/modelos-listar';
            }, 1000);
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
        
        this.modeloForm.patchValue({
          nombreModelo: data.nombreModelo,
          categoriaModelo: data.categoriaModelo._id,
          marcaModelo: data.marcaModelo._id,
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
          images: data.images,
        });
         this.existingImages = data.images;
      });
    }
  }
}
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
  sucursalForm: FormGroup; // Formulario reactivo para la sucursal
  titulo = 'Crear Sucursal'; // Título de la página, se cambia si es para editar
  id: string | null; // ID de la sucursal, utilizado para editar

  constructor(
    private fb: FormBuilder,                    // Servicio para crear el formulario reactivo
    private router: Router,                     // Para redirigir a otras rutas
    private toastr: ToastrService,              // Para mostrar mensajes tipo "toast"
    private _sucursalService: SucursalService,  // Servicio para interactuar con el backend de sucursales
    private route: ActivatedRoute               // Para obtener parámetros de la URL
  ) {
    // Inicialización del formulario con validaciones
    this.sucursalForm = this.fb.group({
      nombreSucursal: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],      // Solo letras y espacios
      telefonoSucursal: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],   // Solo números, 7-15 dígitos
      direccionSucursal: ['', [Validators.required]],                                       // Campo obligatorio
      paisSucursal: ['', [Validators.required]],
      provinciaSucursal: ['', [Validators.required]],
      ciudadSucursal: ['', [Validators.required]],
      horaAperturaSucursal: ['', [Validators.required]],
      horaCierreSucursal: ['', [Validators.required]],
    });

    // Obtención del ID desde la URL (si se está editando una sucursal)
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // Si el ID existe, se debe cargar la sucursal para editar
    this.esEditar();
  }

  // Método para manejar el envío del formulario
  submitForm(): void {
    // Si el formulario es inválido, mostramos los errores
    if (this.sucursalForm.invalid) {
      this.showFormErrors();
      return;
    }
    // Si el formulario es válido, agregamos o editamos la sucursal
    this.agregarSucursal();
  }

  // Método para agregar o editar la sucursal
  agregarSucursal(): void {
    // Creamos el objeto de sucursal con los valores del formulario
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

    // Si hay un ID (es una edición), actualizamos la sucursal
    if (this.id) {
      this._sucursalService.editarSucursal(this.id, SUCURSAL).subscribe(
        () => {
          this.toastr.info('La sucursal fue actualizada con éxito!', 'Sucursal Actualizada');
          this.router.navigate(['/sucursal-listar']); // Redirigimos a la lista de sucursales
        },
        error => this.handleError(error, 'actualizar') // Manejamos el error en caso de fallar
      );
    } else {
      // Si no hay ID, es una creación de sucursal
      this._sucursalService.guardarSucursal(SUCURSAL).subscribe(
        () => {
          this.toastr.success('La sucursal fue registrada con éxito!', 'Sucursal Registrada');
          this.router.navigate(['/sucursal-listar']); // Redirigimos a la lista de sucursales
        },
        error => this.handleError(error, 'registrar') // Manejamos el error en caso de fallar
      );
    }
  }

  // Método para mostrar los errores de los campos del formulario
  showFormErrors(): void {
    Object.keys(this.sucursalForm.controls).forEach(key => {
      const control = this.sucursalForm.get(key);
      // Verificamos si el campo tiene un error y mostramos el tipo de error
      if (control?.invalid) {
        const errorType = control.errors?.['required'] ? 'obligatorio' : 'formato incorrecto';
        this.toastr.error(`El campo ${key} es ${errorType}.`, 'Error en el formulario');
      }
    });
    this.sucursalForm.markAllAsTouched(); // Marcamos todos los campos como tocados para mostrar los errores
  }

  // Método para manejar los errores al intentar registrar o actualizar la sucursal
  handleError(error: any, action: string): void {
    let errorMsg = `Ocurrió un error al intentar ${action} la sucursal`;
    // Si el error tiene un código de estado 409 (conflicto) y un mensaje específico, lo mostramos
    if (error.status === 409 && error.error && error.error.msg) {
      errorMsg = error.error.msg;
    }
    // Mostramos el mensaje de error usando Toastr
    this.toastr.error(errorMsg, `Error de ${action === 'registrar' ? 'Registro' : 'Actualización'}`);
    this.sucursalForm.reset(); // Reiniciamos el formulario en caso de error
  }

  // Método para verificar si estamos en modo de edición (si hay un ID)
  esEditar(): void {
    if (this.id) {
      this.titulo = 'Editar Sucursal'; // Cambiamos el título si estamos editando
      this.cargarSucursal(); // Cargamos la sucursal a editar
    }
  }

  // Método para cargar los datos de la sucursal en el formulario cuando estamos en modo edición
  cargarSucursal(): void {
    if (!this.id) return; // Si no hay ID, no hacemos nada
    // Obtenemos la sucursal desde el servicio
    this._sucursalService.obtenerSucursal(this.id).subscribe(
      (data: any) => {
        // Rellenamos el formulario con los datos de la sucursal obtenida
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
      },
      error => {
        // En caso de error, mostramos un mensaje
        console.error("Error al cargar la sucursal:", error);
        this.toastr.error("No se pudo cargar la información de la sucursal.");
      }
    );
  }
}

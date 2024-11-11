import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { marca } from '../../../models/marca'; // Asegúrate de que el modelo Marca esté definido correctamente.

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit {
  marcaForm: FormGroup;
  titulo = 'Agregar Marca';

  // Cambiar private a public para que sea accesible en el template
  constructor(
    private fb: FormBuilder,
    private _marcaService: MarcaService,
    private toastr: ToastrService,
    public router: Router // Cambiar 'private' por 'public'
  ) {
    // Define el formulario para la marca
    this.marcaForm = this.fb.group({
      nombreMarca: ['', Validators.required] // Validación de nombreMarca como obligatorio
    });
  }

  ngOnInit(): void {}

  agregarMarca() {
    // Verificamos si el formulario es válido
    if (this.marcaForm.invalid) {
      return;
    }

    const nuevaMarca = new marca(
      this.marcaForm.value.nombreMarca
    );

    // Enviamos la nueva marca al servicio
    this._marcaService.crearMarca(nuevaMarca).subscribe(
      (response) => {
        this.toastr.success('Marca creada exitosamente', 'Éxito');
        
        // Redirigimos al listado de marcas después de la creación
        this.router.navigate(['/marcas']);
      },
      (error) => {
        this.toastr.error('Error al crear la marca', 'Error');
        console.error(error);
      }
    );
  }
}

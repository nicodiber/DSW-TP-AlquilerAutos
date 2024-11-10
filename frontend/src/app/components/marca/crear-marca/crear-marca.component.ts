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

  constructor(
    private fb: FormBuilder,
    private _marcaService: MarcaService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Define el formulario para la marca
    this.marcaForm = this.fb.group({
      idMarca: [''], // No es obligatorio
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
      this.marcaForm.value.nombreMarca,
      this.marcaForm.value.idMarca ? +this.marcaForm.value.idMarca : undefined
    );

    // Enviamos la nueva marca al servicio
    this._marcaService.crearMarca(nuevaMarca).subscribe(
      (response) => {
        this.toastr.success('Marca creada exitosamente', 'Éxito');
        
        // Redirigimos al listado de marcas después de la creación
        this.router.navigate(['/marca-listar']);
      },
      (error) => {
        this.toastr.error('Error al crear la marca', 'Error');
        console.error(error);
      }
    );
  }
}

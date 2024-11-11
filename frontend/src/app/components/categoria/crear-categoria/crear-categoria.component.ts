import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { categoria } from '../../../models/categoria';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = 'Agregar Categoría';

  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Define el formulario con idCategoria como opcional
    this.categoriaForm = this.fb.group({
      idCategoria: [''], // No es obligatorio
      nombreCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  agregarCategoria() {
    // Verificamos si el formulario es válido
    if (this.categoriaForm.invalid) {
      return;
    }

    const nuevaCategoria = new categoria(
      this.categoriaForm.value.nombreCategoria,
      this.categoriaForm.value.idCategoria ? +this.categoriaForm.value.idCategoria : undefined
    );

    // Enviamos la nueva categoría al servicio
    this._categoriaService.crearCategoria(nuevaCategoria).subscribe(
      (response) => {
        this.toastr.success('Categoría creada exitosamente', 'Éxito');
        
        // Redirigimos al listado de categorías después de la creación
        this.router.navigate(['/categorias']);
      },
      (error) => {
        this.toastr.error('Error al crear la categoría', 'Error');
        console.error(error);
      }
    );
  }
}

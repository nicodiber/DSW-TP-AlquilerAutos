import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { categoria } from '../../../models/categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  categoriaId!: number;

  constructor(
    private _categoriaService: CategoriaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el id de la categoría desde la URL
    this.categoriaId = +this.route.snapshot.paramMap.get('id')!;

    // Obtener la categoría por su ID
    this.getCategoria(this.categoriaId);
  }

  // Método para obtener los detalles de la categoría
  getCategoria(id: number) {
    this._categoriaService.obtenerCategoriaPorId(id).subscribe(
      (data) => {
        this.categoriaForm.patchValue({
          nombreCategoria: data.nombreCategoria,
        });
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al cargar la categoría', 'Error');
      }
    );
  }

  // Método para actualizar la categoría
  actualizarCategoria() {
    if (this.categoriaForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos', 'Error');
      return;
    }
  
    const categoriaActualizada: categoria = {
      _id: this.categoriaId,
      nombreCategoria: this.categoriaForm.value.nombreCategoria,  // Nombre ingresado por el usuario
    };
  
    this._categoriaService.actualizarCategoria(this.categoriaId, categoriaActualizada).subscribe(
      () => {
        this.toastr.success('Categoría actualizada con éxito', 'Éxito');
        this.router.navigate(['/categorias']);  // Redirigir después de actualizar
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al actualizar la categoría', 'Error');
      }
    );
  }
  

  // Método para volver a la lista de categorías
  volver() {
    this.router.navigate(['/categorias']);
  }
}

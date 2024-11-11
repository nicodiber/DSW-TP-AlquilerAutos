import { Component } from '@angular/core';
import { categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.css'
})
export class ListarCategoriaComponent {
  listaCategorias: categoria[] = [];

  constructor(
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() { 
    this._categoriaService.obtenerCategorias().subscribe(data => {
      console.log(data);
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    });
  }
  eliminarCategoria(id: number | undefined) {
    if (id !== undefined) {
      this._categoriaService.eliminarCategoria(id).subscribe(
        () => {
          this.toastr.success('Categoría eliminada con éxito', 'Éxito');
          this.getCategorias();  // Recargar la lista después de eliminar
        },
        error => {
          console.log(error);
          this.toastr.error('Error al eliminar la categoría', 'Error');
        }
      );
    } else {
      this.toastr.error('ID de categoría no válido', 'Error');
    }
  }
  
}


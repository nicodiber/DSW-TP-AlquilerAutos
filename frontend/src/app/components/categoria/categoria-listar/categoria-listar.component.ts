import { Component } from '@angular/core';
import { categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrl: './categoria-listar.component.css'
})
export class ListarCategoriaComponent {
  listaCategorias: categoria[] = [];

  constructor(private _categoriaService: CategoriaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() { 
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarCategoria(categoriaId: number) {
    this._categoriaService.verificarModelosPorCategoria(categoriaId).subscribe({
      next: (existenModelos) => {
        if (existenModelos) {
          this.toastr.error('No se puede eliminar la categoría porque tiene modelos asociados', 'Error');
        } else {
          this._categoriaService.eliminarCategoria(categoriaId).subscribe({
            next: () => {
              this.toastr.success('Categoría eliminada con éxito', 'Éxito');
              this.getCategorias(); // Actualiza la lista después de eliminar
            },
            error: (err) => {
              if (err.status === 400) {
                this.toastr.error(err.error.msg, 'Error');
              } else {
                console.error('Error al eliminar Categoría:', err);
                this.toastr.error('Error inesperado al eliminar la categoría', 'Error');
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar modelos por categoría:', err);
        this.toastr.error('Error al verificar si la categoría tiene modelos asociados', 'Error');
      }
    });
  }
  
}


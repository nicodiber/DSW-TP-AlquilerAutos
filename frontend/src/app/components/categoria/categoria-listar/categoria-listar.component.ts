import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria.service';
import { categoria } from '../../../models/categoria';
import { modelo } from '../../../models/modelo';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  listaCategorias: categoria[] = [];
  categoriasConModelos: { [key: number]: boolean } = {}; // Verificar si cada categoría tiene modelos asociados
  usuarioLogueado: any;

  constructor(
    private _categoriaService: CategoriaService,
    private _authservice: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.getCategorias();
  }

   isNotAdminTrabajador() {
        this._authservice.getAuthenticatedUser().subscribe(
          (user) => {
            if (user.rol === 'administrador' || user.rol === 'trabajador') {
              // Si el rol es admin o trabajador, se permite el acceso
            } else {
              // Otros roles, patea a login
              window.location.href = '/loginUsuario';
            }
          },
          (error) => {
            window.location.href = '/loginUsuario';
          }
        );
    }


  getCategorias(): void {
    this._categoriaService.obtenerCategorias().subscribe({
      next: (data: categoria[]) => {
        this.listaCategorias = data;
        this.checkModelos(); // Verificar modelos por cada categoría
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
        this.toastr.error('Error al cargar las categorías', 'Error');
      }
    });
  }

  // Verificar si cada categoría tiene modelos asociados
  checkModelos(): void {
    this.listaCategorias.forEach(categoria => {
      if (categoria._id !== undefined) {
        this._categoriaService.obtenerModelosPorCategoria(categoria._id.toString()).subscribe({
          next: (modelos: modelo[]) => {
            this.categoriasConModelos[categoria._id!] = modelos.length > 0;
          },
          error: (error) => {
            console.error('Error al verificar modelos:', error);
          }
        });
      }
    });
  }

  eliminarCategoria(categoriaId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this._categoriaService.verificarModelosPorCategoria(categoriaId).subscribe({
        next: (existenModelos: boolean) => {
          if (existenModelos) {
            this.toastr.error('No se puede eliminar la categoría porque tiene modelos asociados', 'Operación no permitida');
          } else {
            this._categoriaService.eliminarCategoria(categoriaId).subscribe({
              next: () => {
                this.toastr.success('Categoría eliminada con éxito', 'Éxito');
                this.getCategorias(); // Refrescar la lista
              },
              error: (err) => {
                console.error('Error al eliminar la categoría:', err);
                this.toastr.error('Ocurrió un error inesperado al intentar eliminar la categoría', 'Error');
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

  trackByCategoria(index: number, categoria: categoria): number | undefined {
    return categoria._id;
  }
}

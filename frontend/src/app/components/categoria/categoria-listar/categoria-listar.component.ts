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
  categoriaIdToDelete: any | null = null;

  constructor(
    private _categoriaService: CategoriaService,
    private _authservice: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isNotAdminTrabajador();
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

              const backdrop = document.querySelector('.modal-backdrop.show');
              if (backdrop) {
                backdrop.remove();
              }

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
      }
    });
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

  abrirDeleteModal(id: any) {
    this.categoriaIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
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

  trackByCategoria(index: number, categoria: categoria): number | undefined {
    return categoria._id;
  }
}

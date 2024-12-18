import { Component, OnInit } from '@angular/core';
import { marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { modelo } from '../../../models/modelo';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrls: ['./marca-listar.component.css']
})
export class ListarMarcaComponent implements OnInit {
  listaMarcas: marca[] = [];
  marcasConModelos: { [key: number]: boolean } = {}; // Cambiar clave a número
  usuarioLogueado: any;
  marcaIdToDelete: any | null = null;

  constructor(private _marcaService: MarcaService, private _authservice: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isNotAdminTrabajador();
    this.getMarcas();
    
  }

  getMarcas() { 
    this._marcaService.obtenerMarcas().subscribe ({
      next: (data) => {
        this.listaMarcas = data;
      },
      error: (err) => console.error('Error al obtener marcas:', err)
    });
  }

  eliminarMarca(marcaId: number) {
    this._marcaService.verificarModelosPorMarca(marcaId).subscribe({
      next: (existenModelos) => {
        if (existenModelos) {
          this.toastr.error('No se puede eliminar la marca porque tiene modelos asociados', 'Error');
        } else {
          this._marcaService.eliminarMarca(marcaId).subscribe({
            next: () => {
              this.toastr.success('Marca eliminada con éxito', 'Éxito');
              const backdrop = document.querySelector('.modal-backdrop.show');
              if (backdrop) {
                backdrop.remove();
              }
              this.getMarcas(); // Actualiza la lista después de eliminar
            },
            error: (err) => {
              if (err.status === 400) {
                this.toastr.error(err.error.msg, 'Error');
              } else {
                console.error('Error al eliminar Marca:', err);
                this.toastr.error('Error inesperado al eliminar la marca', 'Error');
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
    this.marcaIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }

  checkModelos(): void {
    this.listaMarcas.forEach(marca => {
      if (marca._id !== undefined) {
        this._marcaService.obtenerModelosPorMarca(marca._id.toString()).subscribe({
          next: (modelos: modelo[]) => {
            this.marcasConModelos[marca._id!] = modelos.length > 0;
          },
          error: (error) => {
            console.error('Error al verificar modelos:', error);
          }
        });
      }
    });
  }

  trackByMarca(index: number, marca: marca): number {
    return marca._id!;
  }
}

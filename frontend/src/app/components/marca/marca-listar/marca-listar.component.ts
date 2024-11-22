import { Component } from '@angular/core';
import { marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrl: './marca-listar.component.css'
})
export class ListarMarcaComponent {
  listaMarcas: marca[] = [];
  marcaIdToDelete: any | null = null;

  constructor(private _marcaService: MarcaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas() { 
    this._marcaService.obtenerMarcas().subscribe(data => {
      this.listaMarcas = data;
    }, error => {
      console.log(error);
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
      },
      error: (err) => {
        console.error('Error al verificar modelos por marca:', err);
        this.toastr.error('Error al verificar si la marca tiene modelos asociados', 'Error');
      }
    });
  }
  
  abrirDeleteModal(id: any) {
    this.marcaIdToDelete = id; // Guardamos el ID del usuario a eliminar
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal); // Crear instancia de modal de Bootstrap
      bootstrapModal.show(); // Mostrar el modal
    }
  }
}


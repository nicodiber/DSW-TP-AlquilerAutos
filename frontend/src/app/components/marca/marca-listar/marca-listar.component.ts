import { Component, OnInit } from '@angular/core';
import { marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrls: ['./marca-listar.component.css']
})
export class ListarMarcaComponent implements OnInit {
  listaMarcas: marca[] = [];
  marcasConModelos: { [key: number]: boolean } = {}; // Cambiar clave a número

  constructor(private _marcaService: MarcaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(): void {
    this._marcaService.obtenerMarcas().subscribe({
      next: (data: marca[]) => {
        this.listaMarcas = data;
        this.checkModelos();
      },
      error: (error) => {
        console.error('Error al obtener marcas:', error);
        this.toastr.error('Error al cargar las marcas', 'Error');
      }
    });
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

  eliminarMarca(marcaId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
      this._marcaService.verificarModelosPorMarca(marcaId).subscribe({
        next: (existenModelos: boolean) => {
          if (existenModelos) {
            this.toastr.error('No se puede eliminar la marca porque tiene modelos asociados', 'Operación no permitida');
          } else {
            this._marcaService.eliminarMarca(marcaId).subscribe({
              next: () => {
                this.toastr.success('Marca eliminada con éxito', 'Éxito');
                this.getMarcas();
              },
              error: (err) => {
                console.error('Error al eliminar la marca:', err);
                this.toastr.error('Ocurrió un error inesperado al intentar eliminar la marca', 'Error');
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
  }

  trackByMarca(index: number, marca: marca): number {
    return marca._id!;
  }
}

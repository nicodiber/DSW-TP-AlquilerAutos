import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { ModeloService } from '../../../services/modelo.service';
import { categoria } from '../../../models/categoria';
import { marca } from '../../../models/marca';
import { modelo } from '../../../models/modelo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modelo-listar',
  templateUrl: './modelo-listar.component.html',
  styleUrls: ['./modelo-listar.component.css']
})
export class ListarModelosComponent implements OnInit {
  listCategorias: categoria[] = [];
  listMarcas: marca[] = [];
  listModelos: modelo[] = [];
  modelosFiltrados: modelo[] = [];
  categoriasSeleccionadas: number | null = null;
  marcasSeleccionadas: number[] = [];

  constructor(private _categoriaService: CategoriaService, private _marcaService: MarcaService, private _modeloService: ModeloService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerMarcas();
    this.obtenerModelos();
  }

  obtenerCategorias() {
    this._categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.listCategorias = data;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al cargar las categorias', 'Error');
      }
    });
  }

  obtenerMarcas() {
    this._marcaService.obtenerMarcas().subscribe({
      next: (data) => {
        this.listMarcas = data;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al cargar las marcas', 'Error');
      }
    });
  }

  obtenerModelos() {
    this._modeloService.obtenerModelos().subscribe({
      next: (data) => {
        this.listModelos = data;
        this.modelosFiltrados = data; // Inicialmente mostramos todos los modelos
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al cargar los modelos', 'Error');
      }
    });
  }

  toggleCategoria(categoriaId: number) {
    this.categoriasSeleccionadas = categoriaId; // Solo una categoría puede estar seleccionada
    this.filtrarModelos(); // Aplica el filtro con la categoría seleccionada
  }

  toggleMarca(marca: any, event: any) {
    const marcaId = marca._id;
    if (event.target.checked) {
        // Si el checkbox está marcado, lo añadimos a la lista
        this.marcasSeleccionadas.push(marcaId);
    } else {
        // Si no, lo eliminamos de la lista
        this.marcasSeleccionadas = this.marcasSeleccionadas.filter(id => id !== marcaId);
    }
    // Filtramos los modelos
    this.filtrarModelos();
  }

  filtrarModelos() {
    if ((this.categoriasSeleccionadas !== null && this.categoriasSeleccionadas !== -1) || this.marcasSeleccionadas.length > 0) {
        this.modelosFiltrados = this.listModelos.filter(modelo => 
            (modelo.categoriaModelo._id === this.categoriasSeleccionadas) || 
            (modelo.marcaModelo?._id !== undefined && 
            this.marcasSeleccionadas.includes(modelo.marcaModelo._id))
        );
    } else {
        this.modelosFiltrados = this.listModelos; // Si no hay categorías seleccionadas, mostramos todos los modelos
    }
  }

}

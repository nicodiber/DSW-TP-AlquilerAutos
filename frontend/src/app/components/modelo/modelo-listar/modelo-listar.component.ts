import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { ModeloService } from '../../../services/modelo.service';
import { categoria } from '../../../models/categoria';
import { marca } from '../../../models/marca';
import { modelo } from '../../../models/modelo';
import { Router } from '@angular/router';

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

  modelosDisponibles: modelo[] = [];
  datosBusqueda: any;

  constructor(
    private router: Router,
    private _categoriaService: CategoriaService,
    private _marcaService: MarcaService,
    private _modeloService: ModeloService,
  ) {}

  ngOnInit(): void {
    this.datosBusqueda = JSON.parse(localStorage.getItem('datosBusqueda') || '{}');
    this.modelosDisponibles = JSON.parse(localStorage.getItem('modelosDisponibles') || '[]');
    console.log("Datos de búsqueda:", this.datosBusqueda);
    console.log("Modelos coincidentes disponibles:", this.modelosDisponibles);

    if (Object.keys(this.datosBusqueda).length === 0) {
      this.router.navigate(['/buscador']); // Redirigir a "buscador"
    } else {
      if (window.localStorage) {
        // Recarga la primera vez para que todo se vea bien, pero evitando loop
        if (!localStorage.getItem('reload')) {
          localStorage['reload'] = true;
          window.location.reload();
        } else {
          localStorage.removeItem('reload');
        }
      }
    }

    this.obtenerCategorias();
    this.obtenerMarcas();
    // Inicializar modelosFiltrados con modelosDisponibles
    this.modelosFiltrados = [...this.modelosDisponibles];
  }

  obtenerCategorias() {
    this._categoriaService.obtenerCategorias().subscribe(data => {
      this.listCategorias = data;
    });
  }

  obtenerMarcas() {
    this._marcaService.obtenerMarcas().subscribe(data => {
      this.listMarcas = data;
    });
  }

  // Método para manejar la selección y deselección de categorías
  seleccionarCategoria(idCategoria: number) {
    // Si la categoría ya está seleccionada, deseleccionar estableciendo null
    this.categoriasSeleccionadas = this.categoriasSeleccionadas === idCategoria ? null : idCategoria;
    this.filtrarModelos();
  }

  // Método para manejar la selección de marcas con checkboxes
  checkMarca(idMarca: number) {
    const index = this.marcasSeleccionadas.indexOf(idMarca);
    if (index > -1) {
      this.marcasSeleccionadas.splice(index, 1);
    } else {
      this.marcasSeleccionadas.push(idMarca);
    }
    this.filtrarModelos();
  }

  resetFiltros() {
    this.categoriasSeleccionadas = null;
    this.marcasSeleccionadas = [];
    this.filtrarModelos();
  }


  // Lógica de filtrado que considera categoría y marcas seleccionadas
  filtrarModelos() {
    this.modelosFiltrados = this.modelosDisponibles.filter(modelo => {
      // Verificamos si modelo.categoriaModelo y modelo.marcaModelo son números directamente. Si no, asume que son objetos y accede al campo _id
      const modeloCategoriaId = typeof modelo.categoriaModelo === 'number' ? modelo.categoriaModelo : modelo.categoriaModelo?._id;
      const modeloMarcaId = typeof modelo.marcaModelo === 'number' ? modelo.marcaModelo : modelo.marcaModelo?._id;

      // (condicion) ? valor_si_cumple : valor_si_nocumple
      const categoriaCoincide = this.categoriasSeleccionadas ? modeloCategoriaId === this.categoriasSeleccionadas : true;
      const marcaCoincide = this.marcasSeleccionadas.length > 0 && modeloMarcaId !== undefined ? this.marcasSeleccionadas.includes(modeloMarcaId) : true; // Solo se intenta aplicar includes si modeloMarcaId no es undefined, para que no tire error

      return categoriaCoincide && marcaCoincide;
    });
  }

}
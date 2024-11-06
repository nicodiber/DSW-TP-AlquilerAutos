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

  constructor(
    private _categoriaService: CategoriaService,
    private _marcaService: MarcaService,
    private _modeloService: ModeloService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerMarcas();
    this.obtenerModelos();
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

  obtenerModelos() {
    this._modeloService.obtenerModelos().subscribe(data => {
      this.listModelos = data;
      console.log("Modelos obtenidos desde el servicio:", this.listModelos);
      this.filtrarModelos();
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
    this.modelosFiltrados = this.listModelos.filter(modelo => {
      const modeloCategoriaId = modelo.categoriaModelo?._id;  // ?. significa encadenamiento opcional, para evitar errores cuando la propiedad podría ser null o undefined
      const modeloMarcaId = modelo.marcaModelo?._id;

      // (condicion) ? valor_si_cumple : valor_si_nocumple
      const categoriaCoincide = this.categoriasSeleccionadas ? modeloCategoriaId === this.categoriasSeleccionadas : true;
      const marcaCoincide = this.marcasSeleccionadas.length > 0 ? this.marcasSeleccionadas.includes(modeloMarcaId as number) : true;

      return categoriaCoincide && marcaCoincide;
    });
  }

}
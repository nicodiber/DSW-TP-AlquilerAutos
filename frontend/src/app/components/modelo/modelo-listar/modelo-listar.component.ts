import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { categoria } from '../../../models/categoria';
import { marca } from '../../../models/marca';
import { modelo } from '../../../models/modelo';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { gestionCookiesService } from '../../../services/gestionCookies.service';

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

  constructor(private router: Router, private toastr: ToastrService, private _categoriaService: CategoriaService, private _marcaService: MarcaService, private cookieService: CookieService, private gestionCookiesService: gestionCookiesService) {}

  ngOnInit(): void {

    if (this.gestionCookiesService.getDatosBusquedaExpiration() !== 0) {
      if (this.gestionCookiesService.getDatosBusqueda() === 0) {
        this.toastr.warning('Sus parámetros de búsqueda han expirado, complételos de nuevo');
        setTimeout(() => {
          window.location.href = '/buscador';
        }, 2000);
      } else {
        // Que navegue, tiene todo bien
      }
    } else {
      window.location.href = '/buscador';
    }

    // Obtenemos Categorias y Marcas
    this.obtenerCategorias();
    this.obtenerMarcas();
    // console.log(this.gestionCookiesService.getDatosBusqueda());
    
    // Inicializamos modelosFiltrados con modelosDisponibles
    this.modelosDisponibles = this.gestionCookiesService.getDatosModelosDisponibles(); // Necesitamos modelosDisponibles como una referencia constante (para tener siempre el conjunto completo de modelos sin filtrado o modificaciones)
    this.modelosFiltrados = [...(this.modelosDisponibles)]; // El operador ... toma todos los elementos del array modelosDisponibles y los mete dentro de modelosFiltrados. Así, cualquier modificación en modelosFiltrados no afectará a modelosDisponibles (y no se rompe todo al filtrar)
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

  // Función auxiliar para obtener el nombre de la categoría
  obtenerNombreCategoria(idCategoria: any): string {
  const idString = String(idCategoria);
  const categoria = this.listCategorias.find(cat => String(cat._id) === idString);
  return categoria ? categoria.nombreCategoria : 'Categoría no encontrada';
  }

  // Manejo de la selección y deselección de categorías
  seleccionarCategoria(idCategoria: any) {
    // Si la categoría ya está seleccionada, deseleccionar estableciendo null
    this.categoriasSeleccionadas = this.categoriasSeleccionadas === idCategoria ? null : idCategoria;
    this.filtrarModelos();
  }

  // Manejo de la selección de marcas con checkboxes
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
  
  filtrarModelos() {
    this.modelosFiltrados = this.gestionCookiesService.getDatosModelosDisponibles().filter((modelo: modelo) => {
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


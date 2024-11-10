import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { categoria } from '../../../models/categoria';
import { marca } from '../../../models/marca';
import { modelo } from '../../../models/modelo';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private router: Router, private _categoriaService: CategoriaService, private _marcaService: MarcaService, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Cookies
    this.datosBusqueda = JSON.parse(this.cookieService.get('datosBusqueda') || '{}');
    this.modelosDisponibles = JSON.parse(this.cookieService.get('modelosDisponibles') || '[]');

    if (Object.keys(this.datosBusqueda).length === 0) {
      this.router.navigate(['/buscador']);
    } else {
      // Una recarga para que se vea correctamente si llega de forma forzada
      console.log(this.cookieService.get('reload'));
      if (this.cookieService.get('reload') !== 'true') {
        this.cookieService.set('reload', 'true'); // Eliminar la cookie para evitar loop
        window.location.reload();
      }

      // Establecer cookies con tiempo de expiración calculado
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + 1800); // Tiempo de expiración de las cookies en 30 minutos
      this.cookieService.set('datosBusqueda', JSON.stringify(this.datosBusqueda), { expires: expirationDate });
      this.cookieService.set('modelosDisponibles', JSON.stringify(this.modelosDisponibles), { expires: expirationDate });
    }

    // Obtenemos Categorias y Marcas e inicializamos modelosFiltrados con modelosDisponibles
    this.obtenerCategorias();
    this.obtenerMarcas();
    this.modelosFiltrados = [...this.modelosDisponibles]; // El operador ... toma todos los elementos del array modelosDisponibles y los mete dentro de modelosFiltrados. Así, cualquier modificación en modelosFiltrados no afectará a modelosDisponibles (y no se rompe todo al filtrar)
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

  // Manejo de la selección y deselección de categorías
  seleccionarCategoria(idCategoria: number) {
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


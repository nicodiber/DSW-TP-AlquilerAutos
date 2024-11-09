import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { marca } from '../../../models/marca';

@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrls: ['./marca-listar.component.css']
})
export class MarcaListarComponent implements OnInit {
  marcas: marca[] = [];

  constructor(private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  // Cargar todas las marcas desde el backend
  cargarMarcas() {
    this.marcaService.obtenerMarcas().subscribe(
      (marcas) => {
        this.marcas = marcas;
      },
      (error) => {
        console.error('Error al cargar marcas:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { marca } from '../../../models/marca';  // Modelo con 'marca' en minúscula
import { MarcaService } from '../../../services/marca.service';  // Servicio de marcas

@Component({
  selector: 'app-marca-listar',
  templateUrl: './marca-listar.component.html',
  styleUrls: ['./marca-listar.component.css']
})
export class MarcaListarComponent implements OnInit {
  listaMarcas: marca[] = [];  // Lista de marcas obtenidas del backend

  constructor(private _marcaService: MarcaService) { }

  ngOnInit(): void {
    this.getMarcas();  // Obtener las marcas al cargar el componente
  }

  // Método para obtener las marcas
  getMarcas(): void {
    this._marcaService.obtenerMarcas().subscribe(
      data => {
        console.log(data);
        this.listaMarcas = data;  // Asignar los datos obtenidos a la lista de marcas
      },
      error => {
        console.log(error);  // Manejo de errores
      }
    );
  }
}

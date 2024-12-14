import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-listar',
  templateUrl: './mantenimiento-listar.component.html',
  styleUrls: ['./mantenimiento-listar.component.css'],
})
export class MantenimientoListarComponent implements OnInit {
  mantenimientos: any[] = []; // Lista para almacenar mantenimientos

  constructor(private http: HttpClient, private mantenimientoService: MantenimientoService) { }

  ngOnInit(): void {
    this.obtenerMantenimientos();
  }

  obtenerMantenimientos(): void {
    this.mantenimientoService.obtenerMantenimientos().subscribe(
      data => {
        this.mantenimientos = data;
      },
      error => {
        console.error('Error al obtener mantenimientos:', error);
      }
    );
  }
}

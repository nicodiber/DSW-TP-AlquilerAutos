import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../services/sucursal.service';
import { sucursal } from '../../../models/sucursal';

@Component({
  selector: 'app-sucursal-listar',
  templateUrl: './sucursal-listar.component.html',
  styleUrls: ['./sucursal-listar.component.css']
})
export class SucursalListarComponent implements OnInit {
  sucursales: sucursal[] = []; // Propiedad para almacenar las sucursales
  error: string | null = null; // Propiedad para almacenar errores

  constructor(private sucursalService: SucursalService) { }

  ngOnInit(): void {
    // this.obtenerSucursales(); // Llama al método para obtener las sucursales al inicializar el componente
    this.sucursalService.obtenerSucursales().subscribe(
            (data: sucursal[]) => {
                this.sucursales = data.map(sucursal => ({
                    ...sucursal,
                    trabajadores: sucursal.trabajadores || [], // Inicializa como array
                    autos: sucursal.autos || [] // Inicializa como array
                }));
            },
            error => {
                console.error('Error al obtener sucursales:', error);
            }
        );
  }

  obtenerSucursales(): void {
    this.sucursalService.obtenerSucursales().subscribe(
      (data: sucursal[]) => {
        this.sucursales = data; // Asigna la respuesta a la propiedad sucursales
      },
      (error) => {
        this.error = 'Error al obtener las sucursales'; // Manejo de errores
        console.error(error); // Muestra el error en la consola
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  // Importamos el servicio para mostrar notificaciones (toasts)
import { sucursal } from '../../../models/sucursal';  // Importamos el modelo de datos para la sucursal
import { SucursalService } from '../../../services/sucursal.service';  // Importamos el servicio que gestiona las sucursales

@Component({
  selector: 'app-sucursal-listar',
  templateUrl: './sucursal-listar.component.html',
  styleUrls: ['./sucursal-listar.component.css']
})
export class SucursalListarComponent implements OnInit {
  listaSucursales: sucursal[] = [];  // Lista que almacenará las sucursales obtenidas desde el servicio

  // El constructor recibe los servicios necesarios para gestionar las sucursales y las notificaciones
  constructor(private _sucursalService: SucursalService,
    private toastr: ToastrService) { }

  // ngOnInit es un ciclo de vida de Angular que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.getSucursales();  // Llamamos al método que obtiene las sucursales al inicializar el componente
  }

  // Método que obtiene la lista de sucursales desde el servicio
  getSucursales() {
    // Llamamos al servicio obtenerSucursales, que devuelve un observable
    this._sucursalService.obtenerSucursales().subscribe(
      data => {
        // Si la respuesta es exitosa, almacenamos los datos en la listaSucursales
        this.listaSucursales = data;  // Asignamos la respuesta a la variable listaSucursales
      },
      error => {
        // Si ocurre un error, se imprime en consola
        console.log(error);
      }
    );
  }

  // Método para eliminar una sucursal, recibe el ID de la sucursal a eliminar
  deleteSucursal(id: any) {
    // Llamamos al servicio eliminarSucursal, que devuelve un observable
    this._sucursalService.eliminarSucursal(id).subscribe(
      data => {
        // Si la eliminación es exitosa, mostramos una notificación de éxito
        this.toastr.success('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
        // Luego, actualizamos la lista de sucursales para reflejar los cambios
        this.getSucursales();
      },
      error => {
        // Si ocurre un error, se imprime en consola
        console.log(error);
      }
    );
  }
}

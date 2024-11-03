import { Component } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-sucursal-eliminar',
  templateUrl: './sucursal-eliminar.component.html',
  styleUrls: ['./sucursal-eliminar.component.css']
})
export class SucursalEliminarComponent {
  idSucursal: number = 0;
  mensaje: string | null = null;

  constructor(private sucursalService: SucursalService) { }

  eliminarSucursal(): void {
    this.sucursalService.eliminarSucursal(this.idSucursal).subscribe(
      (response) => {
        this.mensaje = 'Sucursal eliminada con éxito';
        this.idSucursal = 0;
      },
      (error) => {
        this.mensaje = 'Error al eliminar la sucursal';
        console.error(error);
      }
    );
  }
}

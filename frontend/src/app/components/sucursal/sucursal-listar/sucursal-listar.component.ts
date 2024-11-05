import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { sucursal } from '../../../models/sucursal';
import { SucursalService } from '../../../services/sucursal.service';

@Component({
  selector: 'app-sucursal-listar',
  templateUrl: './sucursal-listar.component.html',
  styleUrls: ['./sucursal-listar.component.css']
})
export class SucursalListarComponent implements OnInit {
  listaSucursales: sucursal[] = [];

  constructor(private _sucursalService: SucursalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales() {
    this._sucursalService.obtenerSucursales().subscribe(data => {
      console.log(data);
      this.listaSucursales = data;
    }, error => {
      console.log(error);
    });
  }

  deleteSucursal(id: any) {
    this._sucursalService.eliminarSucursal(id).subscribe(data => {
      this.toastr.success('La sucursal fue eliminada con éxito', 'Sucursal Eliminada');
      this.getSucursales();
    }, error => {
      console.log(error);
    });
  }
}

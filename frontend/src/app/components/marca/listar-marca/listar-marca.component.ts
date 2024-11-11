import { Component, OnInit } from '@angular/core';
import { marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  listaMarcas: marca[] = [];

  constructor(
    private _marcaService: MarcaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas() { 
    this._marcaService.obtenerMarcas().subscribe(data => {
      console.log(data);
      this.listaMarcas = data;
    }, error => {
      console.log(error);
    });
  }
  eliminarMarca(id: number | undefined) {
    if (id !== undefined) {
      this._marcaService.eliminarMarca(id).subscribe(
        () => {
          this.toastr.success('Marca eliminada con éxito', 'Éxito');
          this.getMarcas();  // Recargar la lista después de eliminar
        },
        error => {
          console.log(error);
          this.toastr.error('Error al eliminar la Marca', 'Error');
        }
      );
    } else {
      this.toastr.error('ID de Marca no válido', 'Error');
    }
  }
  

}

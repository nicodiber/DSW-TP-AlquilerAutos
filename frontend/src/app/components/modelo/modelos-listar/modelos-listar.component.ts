import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModeloService } from '../../../services/modelo.service';
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-modelos-listar',
  templateUrl: './modelos-listar.component.html',
  styleUrls: ['./modelos-listar.component.css']
})
export class ModelosListarComponent implements OnInit {
  listaModelos: modelo[] = [];

  constructor(private _modeloService: ModeloService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getModelos();
  }

  getModelos() {
    this._modeloService.obtenerModelos().subscribe(
      data => {
        this.listaModelos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteModelo(id: any) {
    this._modeloService.eliminarModelo(id).subscribe(
      data => {
        this.toastr.success('El modelo fue eliminado con éxito', 'Modelo Eliminado');
        this.getModelos();
      },
      error => {
        console.log(error);
      }
    );
  }
}

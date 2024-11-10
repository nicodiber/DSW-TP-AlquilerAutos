import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  listaMarcas: marca[] = [];

  constructor(private _marcaService: MarcaService) { }

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
}

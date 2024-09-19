import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../services/modelo.service';
import { modelo } from '../../models/modelo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listarModelos',
  templateUrl: './listarModelos.component.html',
  styleUrls: ['./listarModelos.component.css']
})
export class ListarModelosComponent implements OnInit {
  listModelos: modelo[] = [];

  constructor(private _modeloService: ModeloService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerModelos();
  }

  obtenerModelos() {
    this._modeloService.obtenerModelos().subscribe({
      next: (data) => {
        console.log(data);
        this.listModelos = data;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error al cargar los modelos', 'Error');
      }
    });
  }
}

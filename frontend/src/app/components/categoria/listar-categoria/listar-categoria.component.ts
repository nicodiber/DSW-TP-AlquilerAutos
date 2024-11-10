import { Component } from '@angular/core';
import { categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.css'
})
export class ListarCategoriaComponent {
  listaCategorias: categoria[] = [];

  constructor(private _categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() { 
    this._categoriaService.obtenerCategorias().subscribe(data => {
      console.log(data);
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    });
  }
}


import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeloService } from '../../../services/modelo.service';
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-listar-categoria-modelo',
  templateUrl: './listar-categoria-modelo.component.html',
  styleUrl: './listar-categoria-modelo.component.css'
})
export class ListarCategoriaModeloComponent {
  modelos: modelo[] = [];
  nombreCategoria!: string;

  constructor(
    private route: ActivatedRoute,
    private modeloService: ModeloService
  ) { }

  ngOnInit(): void {
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombreCategoria')!;
    this.getModelosByCategoria(this.nombreCategoria);
  }

  getModelosByCategoria(nombreCategoria: string): void {
    this.modeloService.obtenerModelosPorCategoria().subscribe(
      data => {
        // Filtrar los modelos para que solo coincidan con la categoria seleccionada
        this.modelos = data.filter(modelo => modelo.categoriaModelo.nombreCategoria === nombreCategoria );
      },
      error => {
        console.log(error);
      }
    );
  }
}

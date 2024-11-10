import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeloService } from '../../../services/modelo.service';
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-listar-marca-modelo',
  templateUrl: './listar-marca-modelo.component.html',
  styleUrls: ['./listar-marca-modelo.component.css']
})
export class ListarModelosMarcaComponent implements OnInit {
  modelos: modelo[] = [];
  nombreMarca!: string;

  constructor(
    private route: ActivatedRoute,
    private modeloService: ModeloService
  ) { }

  ngOnInit(): void {
    this.nombreMarca = this.route.snapshot.paramMap.get('nombreMarca')!;
    this.getModelosByMarca(this.nombreMarca);
  }

  getModelosByMarca(nombreMarca: string): void {
    this.modeloService.obtenerModelosPorMarca().subscribe(
      data => {
        // Filtrar los modelos para que solo coincidan con la marca seleccionada
        this.modelos = data.filter(modelo => modelo.marcaModelo.nombreMarca === nombreMarca);
      },
      error => {
        console.log(error);
      }
    );
  }
}

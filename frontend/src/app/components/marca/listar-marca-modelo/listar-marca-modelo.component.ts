import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeloService } from '../../../services/modelo.service'; // Ajusta la ruta según tu estructura
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-listar-marca-modelo',
  templateUrl: './listar-marca-modelo.component.html',
  styleUrls: ['./listar-marca-modelo.component.css']
})
export class ListarModelosMarcaComponent implements OnInit {
  modelos: modelo[] = [];
  marcaId!: number;

  constructor(
    private route: ActivatedRoute,
    private modeloService: ModeloService
  ) { }

  ngOnInit(): void {
    this.marcaId = +this.route.snapshot.paramMap.get('marcaId')!; // Obtén el marcaId de la URL
    this.getModelosByMarca(this.marcaId);
  }

  getModelosByMarca(marcaId: number): void {
    this.modeloService.obtenerModelosPorMarca(marcaId).subscribe(
      data => {
        this.modelos = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}

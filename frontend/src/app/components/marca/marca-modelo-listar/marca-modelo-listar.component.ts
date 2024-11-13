import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { modelo } from '../../../models/modelo';

@Component({
  selector: 'app-marca-modelo-listar',
  templateUrl: './marca-modelo-listar.component.html',
  styleUrl: './marca-modelo-listar.component.css'
})
export class ListarMarcaModeloComponent {
  modelos: modelo[] = [];
  idMarca!: string;
  nombreMarca!: string;

  constructor(private route: ActivatedRoute, private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.idMarca = this.route.snapshot.paramMap.get('idMarca')!;
    this.nombreMarca = this.route.snapshot.paramMap.get('nombreMarca')!;
    this.getModelosByMarca(this.idMarca);
  }

  getModelosByMarca(idMarca: string): void {
    this.marcaService.obtenerModelosPorMarca(idMarca).subscribe(
      (data: modelo[]) => {
        this.modelos = data;
      },
      error => {
        console.error('Error al obtener los modelos por Marca:', error);
      }
    );
  }

}

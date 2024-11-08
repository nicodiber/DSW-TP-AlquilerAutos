import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../../services/modelo.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {
  modelo: any;

  constructor(private route: ActivatedRoute, private modeloService: ModeloService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.modeloService.obtenerModelo(id).subscribe(data => {
          this.modelo = data;
        }, error => {
          console.error('Error al obtener los datos del modelo:', error);
        });
      }
    });
  }
}

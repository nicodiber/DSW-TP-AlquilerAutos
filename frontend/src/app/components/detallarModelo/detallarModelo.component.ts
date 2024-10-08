import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../services/modelo.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detallarModelo',
  templateUrl: './detallarModelo.component.html',
  styleUrls: ['./detallarModelo.component.css']
})
export class DetallarModeloComponent implements OnInit {
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

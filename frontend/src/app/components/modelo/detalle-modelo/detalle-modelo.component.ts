import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../../services/modelo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detalle-modelo',
  templateUrl: './detalle-modelo.component.html',
  styleUrls: ['./detalle-modelo.component.css']
})
export class DetalleModeloComponent implements OnInit {
  modelo: any;
  datosBusqueda: any;

  constructor(private route: ActivatedRoute, private modeloService: ModeloService, private router: Router, private cookieService: CookieService) {}
  ngOnInit(): void {
    // Cookies
    this.datosBusqueda = JSON.parse(this.cookieService.get('datosBusqueda') || '{}');

    if (Object.keys(this.datosBusqueda).length === 0) {
      this.router.navigate(['/buscador']);
    }

    // Chequeo parametro default
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

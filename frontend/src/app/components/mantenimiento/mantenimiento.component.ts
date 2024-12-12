import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientoComponent implements OnInit {
  mantenimientos: any[] = []; // Lista para almacenar mantenimientos

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerMantenimientos();
  }

  obtenerMantenimientos(): void {
    this.http.get('/api/mantenimientos').subscribe(
      (data: any) => {
        this.mantenimientos = data;
      },
      (error) => {
        console.error('Error al obtener mantenimientos:', error);
      }
    );
  }
}

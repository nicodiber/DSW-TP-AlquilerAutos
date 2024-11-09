import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marca } from '../models/marca';  // Usar 'marca' en minúscula

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:4200/marcas';  // La URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener todas las marcas
  obtenerMarcas(): Observable<marca[]> {
    return this.http.get<marca[]>(this.apiUrl);
  }
}

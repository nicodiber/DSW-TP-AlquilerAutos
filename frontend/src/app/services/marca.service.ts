import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private apiUrl = 'http://localhost:4000/api/marcas';  // La URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las marcas
  obtenerMarcas(): Observable<marca[]> {
    return this.http.get<marca[]>(this.apiUrl);  // Asegúrate de que la respuesta sea un arreglo de marcas
  }

  // Obtener una marca por ID
  obtenerMarca(id: number): Observable<marca> {
    return this.http.get<marca>(`${this.apiUrl}/${id}`);
  }
}

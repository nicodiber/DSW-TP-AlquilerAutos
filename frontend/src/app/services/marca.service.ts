import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  url = 'http://localhost:4000/api/marcas/';

  
  constructor(private http: HttpClient) { }

  obtenerMarcas(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerMarca(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
  // Método para crear una nueva marca
  crearMarca(marca: marca): Observable<marca> {
    return this.http.post<marca>(this.url, marca);
  }

  obtenerMarcaPorId(id: number): Observable<marca> {
    return this.http.get<marca>(`${this.url}/${id}`);
  }  

  // Método para actualizar una marca
  actualizarMarca(id: number, marca: marca): Observable<marca> {
    return this.http.put<marca>(`${this.url}/${id}`, marca);
  }

  // Método para eliminar una marca
  eliminarMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

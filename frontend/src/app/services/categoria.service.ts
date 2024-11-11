import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'http://localhost:4000/api/categorias/';

  
  constructor(private http: HttpClient) { }
  crearCategoria(categoria: categoria): Observable<categoria> {
    return this.http.post<categoria>(this.url, categoria);
  }

    // Método para actualizar una categoria
    actualizarCategoria(id: number, categoria: categoria): Observable<categoria> {
      return this.http.put<categoria>(`${this.url}/${id}`, categoria);
    }
  
    // Método para eliminar una categoria
    eliminarCategoria(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }

  //el get devuelve un observable y se usa para hacer peticiones asincronas
  obtenerCategorias(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerCategoria(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

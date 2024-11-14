import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoria } from '../models/categoria';
import { modelo } from '../models/modelo';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'http://localhost:4000/api/categorias/';

  constructor(private http: HttpClient) { }

  crearCategoria(categoria: categoria): Observable<categoria> {
    return this.http.post<categoria>(this.url, categoria);
  }

  obtenerCategoriaPorId(id: number): Observable<categoria> {
    return this.http.get<categoria>(`${this.url}${id}`);
  }
  
  editarCategoria(_id: string, categoria: categoria):Observable<any>{
    return this.http.put(this.url + _id, categoria);
  }
  
  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  obtenerCategorias(): Observable<any>{
    return this.http.get(this.url);
  }
  
  obtenerCategoria(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Funciones especificas
  obtenerCategoriaPorNombre(nombreCategoria: string): Observable<any> {
    return this.http.get(`${this.url}existe-nombre/${nombreCategoria}`);
  }

  obtenerModelosPorCategoria(idCategoria: string): Observable<modelo[]> {
    return this.http.get<modelo[]>(`${this.url}${idCategoria}/categoria-modelos`);
  }

  verificarModelosPorCategoria(idCategoria: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}${idCategoria}/existe-modelos`);
  }
}

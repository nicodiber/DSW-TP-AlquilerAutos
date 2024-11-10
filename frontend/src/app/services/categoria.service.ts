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

  //el get devuelve un observable y se usa para hacer peticiones asincronas
  obtenerCategorias(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerCategoria(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

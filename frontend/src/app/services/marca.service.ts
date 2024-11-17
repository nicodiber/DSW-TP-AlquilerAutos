import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marca } from '../models/marca';
import { modelo } from '../models/modelo';

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

  crearMarca(marca: marca): Observable<marca> {
    return this.http.post<marca>(this.url, marca);
  }

  obtenerMarcaPorId(id: number): Observable<marca> {
    return this.http.get<marca>(`${this.url}${id}`);
  }  

  editarMarca(id: string, marca: marca): Observable<marca> {
    return this.http.put<marca>(`${this.url}${id}`, marca);
  }

  eliminarMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  // Especificas
  obtenerMarcaPorNombre(nombreMarca: string): Observable<any> {
    return this.http.get(`${this.url}existe-nombre/${nombreMarca}`);
  }

  obtenerModelosPorMarca(idMarca: string): Observable<modelo[]> {
    return this.http.get<modelo[]>(`${this.url}${idMarca}/marca-modelos`);
  }

  verificarModelosPorMarca(idMarca: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}${idMarca}/existe-modelos`);
  }
  obtenerModelosPorMarca2(marcaId: number): Observable<modelo[]> {
    return this.http.get<modelo[]>(`/api/modelos/marca/${marcaId}`);
  }
  
  
}

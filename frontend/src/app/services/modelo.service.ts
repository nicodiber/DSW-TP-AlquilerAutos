import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modelo } from '../models/modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  url = 'http://localhost:4000/api/modelos/';

  constructor(private http: HttpClient) { }
  
  obtenerModelos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarModelo(_id: number): Observable<any>{
    return this.http.delete(this.url + _id, { withCredentials: true,});
  }

  guardarModelo(modeloData: FormData): Observable<any>{
    return this.http.post(this.url, modeloData, { withCredentials: true,});
  }

  editarModelo(_id: string, modeloData: FormData):Observable<any>{
    return this.http.put(this.url + _id, modeloData, { withCredentials: true,});
  }

  obtenerModelo(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Funciones especificas
  buscarAutoAleatorioDisponible(idAutos: number[], idModelo: number): Observable<any> {
    return this.http.post<any>(this.url + 'buscarAutoAleatorioDisponible', { idAutos, idModelo});
  }

  verificarAutosPorModelo(idModelo: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}${idModelo}/existe-autos`);
  }

}

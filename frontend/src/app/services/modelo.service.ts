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
    return this.http.delete(this.url + _id);
  }

  guardarModelo(modelo: modelo): Observable<any>{
    return this.http.post(this.url, modelo);
  }

  editarModelo(_id: string, modelo: modelo):Observable<any>{
    return this.http.put(this.url + _id, modelo);
  }

  obtenerModelo(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  url = 'http://localhost:4000/api/tipos/';

  
  constructor(private http: HttpClient) { }

  //el get devuelve un observable y se usa para hacer peticiones asincronas
  obtenerTipos(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerTipo(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conductor } from '../models/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
    url = 'http://localhost:4000/api/conductores/';

  constructor(private http: HttpClient) { }

  //el get devuelve un observable y se usa para hacer peticiones asincronas
  getConductores(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarConductor(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarConductor(conductor: conductor): Observable<any>{
    return this.http.post(this.url, conductor);
  }

  editarConductor(id: string, conductor: conductor):Observable<any>{
    return this.http.put(this.url + id, conductor);
  }

  obtenerConductor(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}

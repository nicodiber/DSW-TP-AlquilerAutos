import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { incidente } from '../models/incidente';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {
  url = 'http://localhost:4000/api/incidentes/';

  constructor(private http: HttpClient) { }
  
  obtenerIncidentes(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarIncidente(_id: number): Observable<any>{
    return this.http.delete(this.url + _id, { withCredentials: true,});
  }

  guardarIncidente(incidente: incidente): Observable<any>{
    return this.http.post(this.url, incidente, { withCredentials: true,});
  }

  editarIncidente(_id: string, incidente: incidente):Observable<any>{
    return this.http.put(this.url + _id, incidente, { withCredentials: true,});
  }

  obtenerIncidente(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  obtenerIncidentesUsuario(id: string): Observable<any> {
    return this.http.get(`${this.url}usuario/${id}`, { withCredentials: true,});
  }

  pagarIncidente(id: string): Observable<any> {
    return this.http.put(this.url + 'pay/' + id, {}, {
      withCredentials: true,
    });
}
}

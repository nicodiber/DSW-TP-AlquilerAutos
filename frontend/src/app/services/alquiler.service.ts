import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  url = 'http://localhost:4000/api/alquileres/';

  constructor(private http: HttpClient) { }
  
  obtenerAlquileres(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarAlquiler(_id: number): Observable<any>{
    return this.http.delete(this.url + _id);
  }

  guardarAlquiler(alquiler: alquiler): Observable<any>{
    return this.http.post(this.url, alquiler);
  }

  editarAlquiler(_id: string, alquiler: alquiler):Observable<any>{
    return this.http.put(this.url + _id, alquiler);
  }

  obtenerAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  asignarTrabajadorAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'asignar-trabajador');
  }

  actualizarEstadoAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'estado');
  }
}

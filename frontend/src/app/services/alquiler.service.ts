import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alquiler } from '../models/alquiler';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  url = 'http://localhost:4000/api/alquileres/';

  constructor(private http: HttpClient) { }
  
  guardarAlquiler(alquiler: alquiler): Observable<any>{
    return this.http.post(this.url, alquiler);
  }

  obtenerAlquileres(): Observable<any>{
    return this.http.get(this.url);
  }

  obtenerAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Funciones especificas - Alquiler

  establecerFechaInicioReal(_id: string, fecha: string) {
    return this.http.put(`${this.url}${_id}/fechaInicioReal`, { fechaInicioReal: fecha });
  }

  establecerFechaFinReal(_id: string, fecha: string) {
    return this.http.put(`${this.url}${_id}/fechaFinReal`, { fechaFinReal: fecha });
  }

  modificarNotas(_id: string, notas: string) {
    return this.http.put(`${this.url}${_id}/notas`, { notas });
  }

  obtenerUsuariosPorRol(rol: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(`http://localhost:4000/api/usuarios/rol/${rol}`);
  }

  modificarTrabajador(_id: string, trabajadorId: number) {
    return this.http.put(`${this.url}${_id}/trabajador`, { trabajadorAsignado: trabajadorId });
  }

  cambiarEstado(_id: string, estado: string) {
    return this.http.put(`${this.url}${_id}/estado`, { estadoAlquiler: estado });
  }

  /* VIEJO
  asignarTrabajadorAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'asignar-trabajador');
  }

  actualizarEstadoAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'estado');
  }
  */

  // Funciones especificas - Buscador

  buscarModelosDisponibles(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'buscarModelosDisponibles', data);
  }
  
}

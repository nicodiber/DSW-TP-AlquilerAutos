import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

// Voy a redefinir mis Alquiler para almacenar los atributos por el id unicamente
interface AlquilerData {
  usuario: number;
  auto: number;  // Ej. cambié a string para recibir el ID
  sucursalEntrega: number;
  sucursalDevolucion: number;
  trabajadorAsignado?: number;
  fechaInicio: Date;
  fechaFin: Date;
  fechaInicioReal?: Date;
  fechaFinReal?: Date;
  notas?: string;
  precioTotalAlquiler: number;
  estadoAlquiler: string;
}

@Injectable({
  providedIn: 'root'
})

// Cuándo usar Observable<any> : Operaciones asíncronas (HTTP, WebSockets, etc.); Datos que cambian dinámicamente o en tiempo real; Flujos de datos que involucran transformación o combinación
// Cuándo no usar Observable<any>: si el dato es inmediato, estático o si la función no devuelve nada

export class AlquilerService {
  url = 'http://localhost:4000/api/alquileres/';

  constructor(private http: HttpClient) { }
  
  
  crearAlquiler(alquiler: AlquilerData): Observable<any>{
    return this.http.post(this.url, alquiler);
  }

  obtenerAlquileres(): Observable<any>{
    return this.http.get(this.url);
  }

  obtenerAlquiler(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Funciones especificas - Listar Alquiler
  establecerFechaInicioReal(_id: string, fecha: string | Date) {
    return this.http.put(`${this.url}${_id}/fechaInicioReal`, { fechaInicioReal: fecha }, { withCredentials: true,});
  }

  establecerFechaFinReal(_id: string, fecha: string | Date) {
    return this.http.put(`${this.url}${_id}/fechaFinReal`, { fechaFinReal: fecha }, { withCredentials: true,});
  }

  modificarNotas(_id: string, notas: string) {
    return this.http.put(`${this.url}${_id}/notas`, { notas }, { withCredentials: true,});
  }

  obtenerUsuariosPorRol(rol: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(`http://localhost:4000/api/usuarios/rol/${rol}`);
  }

  obtenerTrabajadoresPorSucursal(sucursalId: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(`http://localhost:4000/api/usuarios/trabajadores-sucursal/${sucursalId}`);
  }

  modificarTrabajador(_id: string, trabajadorId: number) {
    return this.http.put(`${this.url}${_id}/trabajador`, { trabajadorAsignado: trabajadorId }, { withCredentials: true,});
  }

  cambiarEstado(_id: string, estado: string) {
    return this.http.put(`${this.url}${_id}/estado`, { estadoAlquiler: estado }, { withCredentials: true,});
  }

  actualizarEstadoAuto(idAlquiler: string, idAuto: string, estado: string): Observable<any> {
    const url = `${this.url}${idAlquiler}/autos/${idAuto}/estado`;
    return this.http.patch(url, { estado });
  }

  actualizarSucursalAuto(idAuto: string, sucursalId: string) {
    return this.http.patch(`${this.url}autos/${idAuto}/sucursal`, { sucursalId }, { withCredentials: true,});
  }

  // Funciones especificas - Buscador
  buscarModelosDisponibles(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'buscarModelosDisponibles', data);
  }

  reservarEstadoAuto(idAuto: string, estado: string): Observable<any> {
    const url = `${this.url}autos/${idAuto}/estado`;
    return this.http.patch(url, { estado });
  }

  // Otras funciones especificas
  cancelarAlquilerActualizaAuto(_id: string){
    return this.http.put(`${this.url}cancelar/${_id}`, {});
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mantenimiento } from '../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  url = 'http://localhost:4000/api/mantenimientos/';

  constructor(private http: HttpClient) { }

  obtenerMantenimientos(): Observable<any> {
    return this.http.get(this.url, { withCredentials: true,});
  }

  eliminarMantenimiento(_id: number): Observable<any> {
    return this.http.delete(this.url + _id, { withCredentials: true,});
  }

  guardarMantenimiento(mantenimiento: mantenimiento): Observable<any> {
    return this.http.post(this.url, mantenimiento, { withCredentials: true,});
  }

  editarMantenimiento(_id: string, mantenimiento: mantenimiento): Observable<any> {
    return this.http.put(this.url + _id, mantenimiento, { withCredentials: true,});
  }

  obtenerMantenimiento(_id: string): Observable<any> {
    return this.http.get(this.url + _id, { withCredentials: true,});
  }

  // Especifico
  crearMantenimientoAlquiler(idAuto: string): Observable<any> {
    return this.http.post(`${this.url}mantenimientoAlquiler/${idAuto}`, {}, { withCredentials: true,});
  }

  establecerFechaFinMantenimiento(_id: string, fecha: string | Date) {
    return this.http.put(`${this.url}${_id}/fechaFinMantenimiento`, { fechaFinMantenimiento: fecha }, { withCredentials: true,});
  }

  actualizarEstadoAuto(idAuto: string): Observable<any> {
    return this.http.patch(`${this.url}autos/${idAuto}/estado`, {}, { withCredentials: true,});
  }

  modificarTrabajador(_id: string, trabajadorId: number) {
    return this.http.put(`${this.url}${_id}/trabajador`, { trabajadorACargo: trabajadorId }, { withCredentials: true,});
  }

  modificarDescripcion(_id: string, descripcion: string) {
    return this.http.put(`${this.url}${_id}/descripcion`, { descripcion }, { withCredentials: true,});
  }

  modificarCosto(_id: string, costoMantenimiento: number) {
    return this.http.put(`${this.url}${_id}/costo`, { costoMantenimiento }, { withCredentials: true,});
  }
}

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
    return this.http.get(this.url);
  }

  eliminarMantenimiento(_id: number): Observable<any> {
    return this.http.delete(this.url + _id);
  }

  guardarMantenimiento(mantenimiento: mantenimiento): Observable<any> {
    return this.http.post(this.url, mantenimiento);
  }

  editarMantenimiento(_id: string, mantenimiento: mantenimiento): Observable<any> {
    return this.http.put(this.url + _id, mantenimiento);
  }

  obtenerMantenimiento(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Especifico
  crearMantenimientoAlquiler(idAuto: string): Observable<any> {
    return this.http.post(`${this.url}mantenimientoAlquiler/${idAuto}`, {});
  }

  establecerFechaFinMantenimiento(_id: string, fecha: string | Date) {
    return this.http.put(`${this.url}${_id}/fechaFinMantenimiento`, { fechaFinMantenimiento: fecha });
  }

  actualizarEstadoAuto(idAuto: string): Observable<any> {
    return this.http.patch(`${this.url}autos/${idAuto}/estado`, {});
  }

  modificarTrabajador(_id: string, trabajadorId: number) {
    return this.http.put(`${this.url}${_id}/trabajador`, { trabajadorACargo: trabajadorId });
  }

  modificarDescripcion(_id: string, descripcion: string) {
    return this.http.put(`${this.url}${_id}/descripcion`, { descripcion });
  }

  modificarCosto(_id: string, costoMantenimiento: number) {
    return this.http.put(`${this.url}${_id}/costo`, { costoMantenimiento });
  }
}

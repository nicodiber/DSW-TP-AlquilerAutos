import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mantenimiento } from '../models/mantenimiento';
import { usuario } from '../models/usuario';

interface MantenimientoData {
  usuario: number;
}

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
    console.log(`${this.url}mantenimientoAlquiler/${idAuto}`);
    return this.http.post(`${this.url}mantenimientoAlquiler/${idAuto}`, {});
  }

  obtenerTrabajadoresPorSucursal(sucursalId: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(`http://localhost:4000/api/usuarios/trabajadores-sucursal/${sucursalId}`);
  }

  establecerFechaFinMantenimiento(_id: string, fechaFin: Date): Observable<any> {
    const body = { fechaFinMantenimiento: fechaFin };
    return this.http.put(`${this.url}${_id}/fechaFin`, body);
  }

  actualizarEstadoAuto(_id: string, autoId: string, estado: string): Observable<any> {
    const body = { estado };
    return this.http.put(`${this.url}${_id}/autos/${autoId}/estado`, body);
  }

  modificarTrabajador(_id: string, trabajadorId: number): Observable<any> {
    const body = { trabajadorACargo: trabajadorId };
    return this.http.put(`${this.url}${_id}/trabajador`, body);
  }

  modificarCosto(_id: string, costo: number): Observable<any> {
    const body = { costoMantenimiento: costo };
    return this.http.put(`${this.url}${_id}/costo`, body);
  }

  modificarDescripcion(_id: string, descripcion: string): Observable<any> {
    const body = { descripcion };
    return this.http.put(`${this.url}${_id}/descripcion`, body);
  }
}

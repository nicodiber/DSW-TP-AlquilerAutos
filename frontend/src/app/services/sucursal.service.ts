import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  url = 'http://localhost:4000/api/sucursales/';

  constructor(private http: HttpClient) { }

  // Obtiene todas las sucursales
  obtenerSucursales(): Observable<any> {
    return this.http.get(this.url);
  }

  // Elimina una sucursal por su ID
  eliminarSucursal(_id: number): Observable<any> {
    return this.http.delete(this.url + _id);
  }

  // Guarda una nueva sucursal
  guardarSucursal(sucursal: sucursal): Observable<any> {
    return this.http.post(this.url, sucursal);
  }

  // Edita una sucursal existente
  editarSucursal(_id: string, sucursal: sucursal): Observable<any> {
    return this.http.put(this.url + _id, sucursal);
  }

  // Obtiene una sucursal por su ID
  obtenerSucursalPorId(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  obtenerSucursal(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  asignarTrabajador(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'asignar-trabajador');
  }

  asignarAuto(_id: string): Observable<any> {
    return this.http.get(this.url + _id + 'asignar-auto');
  }

  obtenerTrabajadoresSucursal(idSucursal: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${idSucursal}/trabajadores`);
  }

  obtenerTrabajadoresParaAsignacion(idSucursal: string): Observable<any> {
    return this.http.get(`${this.url}${idSucursal}/trabajadores`);
  }

  asignarTrabajadores(idSucursal: string, trabajadoresAsignados: string[], trabajadoresNoAsignados: string[]): Observable<any> {
    return this.http.post(`${this.url}${idSucursal}/asignar-trabajadores`, {
      trabajadoresAsignados,
      trabajadoresNoAsignados
    });
  }

}

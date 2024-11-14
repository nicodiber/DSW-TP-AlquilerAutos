import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private url = 'http://localhost:4000/api/sucursales/';

  constructor(private http: HttpClient) { }

  // Obtiene todas las sucursales
  obtenerSucursales(): Observable<any> {
    return this.http.get(this.url);
  }

  // Elimina una sucursal por su ID
  eliminarSucursal(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }

  // Guarda una nueva sucursal
  guardarSucursal(sucursal: sucursal): Observable<any> {
    return this.http.post(this.url, sucursal);
  }

  // Edita una sucursal existente
  editarSucursal(id: string, sucursal: sucursal): Observable<any> {
    return this.http.put(`${this.url}${id}`, sucursal);
  }

  // Obtiene una sucursal por su ID
  obtenerSucursalPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  // Obtiene trabajadores asignados y no asignados de una sucursal
  obtenerTrabajadoresParaAsignacion(idSucursal: string): Observable<any> {
    return this.http.get(`${this.url}${idSucursal}/trabajadores`);
  }

  // Asigna o desasigna trabajadores a una sucursal
  asignarTrabajadores(idSucursal: string, trabajadoresAsignados: string[], trabajadoresNoAsignados: string[]): Observable<any> {
    return this.http.post(`${this.url}${idSucursal}/asignar-trabajadores`, {
      trabajadoresAsignados,
      trabajadoresNoAsignados
    });
  }
}

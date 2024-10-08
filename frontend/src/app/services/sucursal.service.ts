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
  
  obtenerSucursales(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarSucursal(_id: number): Observable<any>{
    return this.http.delete(this.url + _id);
  }

  guardarSucursal(sucursal: sucursal): Observable<any>{
    return this.http.post(this.url, sucursal);
  }

  editarSucursal(_id: string, sucursal: sucursal):Observable<any>{
    return this.http.put(this.url + _id, sucursal);
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
}

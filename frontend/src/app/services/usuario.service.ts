import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:4000/api/usuarios/';

  constructor(private http: HttpClient) { }
  
  obtenerUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarUsuario(_id: number): Observable<any>{
    return this.http.delete(this.url + _id);
  }

  guardarUsuario(usuario: usuario): Observable<any>{
    return this.http.post(this.url, usuario);
  }

  editarUsuario(_id: string, usuario: usuario):Observable<any>{
    return this.http.put(this.url + _id, usuario);
  }

  obtenerUsuario(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  // Meter el alquiler en el array alquileres del usuario
  actualizarAlquileresUsuario(userId: number, nuevoAlquiler: any): Observable<any> {
    return this.http.put(this.url + userId + '/alquileres', { alquiler: nuevoAlquiler });
  }

  // Actualizar el estado de un alquiler del usuario
  actualizarEstadoAlquilerUsuario(userId: number, alquilerId: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${userId}/alquileres/${alquilerId}/estado`, { nuevoEstado });
  }

}

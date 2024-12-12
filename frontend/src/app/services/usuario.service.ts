import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:4000/api/usuarios/';

  constructor(private http: HttpClient) { }
  
   obtenerUsuarios(): Observable<any> {
    return this.http.get(this.url, { withCredentials: true,});;
  }

  eliminarUsuario(_id: number): Observable<any> {
    return this.http.delete(this.url + _id, { withCredentials: true,});
  }

  guardarUsuario(usuario: usuario): Observable<any> {
    return this.http.post(this.url, usuario, { withCredentials: true,});
  }

  editarUsuario(_id: string, usuario: usuario): Observable<any> {
    return this.http.put(this.url + _id, usuario, { withCredentials: true,});
  }

  obtenerUsuario(_id: string): Observable<any> {
    return this.http.get(this.url + _id, { withCredentials: true,});
  }

  actualizarAlquileresUsuario(userId: number, nuevoAlquiler: any): Observable<any> {
    return this.http.put(this.url + userId + '/alquileres', { alquiler: nuevoAlquiler }, { withCredentials: true,});
  }

  actualizarEstadoAlquilerUsuario(userId: number, alquilerId: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${userId}/alquileres/${alquilerId}/estado`, { nuevoEstado });
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.url}/editar-datos-usuario/${usuario.email}`, usuario, { withCredentials: true,});
  }

  cambiarPassword(email: string, data: { contrasenaActual: string, nuevaContrasena: string }): Observable<any> {
  return this.http.put(`${this.url}/cambiar-password/${email}`, data, { withCredentials: true,});
}

cancelarAlquilerUsuario(userId: number, alquilerId: number, nuevoEstado: string): Observable<any> {
    return this.http.put( `${this.url}${userId}/alquileres/${alquilerId}/estado`, { nuevoEstado });
  }

}

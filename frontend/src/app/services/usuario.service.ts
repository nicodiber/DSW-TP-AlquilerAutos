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
  
  private getToken(): string | null {
    return sessionStorage.getItem('token'); 
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

   obtenerUsuarios(): Observable<any> {
    return this.http.get(this.url, { headers: this.getHeaders() });
  }

  eliminarUsuario(_id: number): Observable<any> {
    return this.http.delete(this.url + _id, { headers: this.getHeaders() });
  }

  guardarUsuario(usuario: usuario): Observable<any> {
    return this.http.post(this.url, usuario, { headers: this.getHeaders() });
  }

  editarUsuario(_id: string, usuario: usuario): Observable<any> {
    return this.http.put(this.url + _id, usuario, { headers: this.getHeaders() });
  }

  obtenerUsuario(_id: string): Observable<any> {
    return this.http.get(this.url + _id, { headers: this.getHeaders() });
  }

  actualizarAlquileresUsuario(userId: number, nuevoAlquiler: any): Observable<any> {
    return this.http.put(this.url + userId + '/alquileres', { alquiler: nuevoAlquiler }, { headers: this.getHeaders() });
  }

  actualizarEstadoAlquilerUsuario(userId: number, alquilerId: number, nuevoEstado: string): Observable<any> {
    return this.http.put(
      `${this.url}${userId}/alquileres/${alquilerId}/estado`,
      { nuevoEstado },
      { headers: this.getHeaders() }
    );
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.url}/editar-datos-usuario/${usuario.email}`, usuario, { headers: this.getHeaders() });
  }

  cambiarPassword(email: string, data: { contrasenaActual: string, nuevaContrasena: string }): Observable<any> {
  return this.http.put(`${this.url}/cambiar-password/${email}`, data, { headers: this.getHeaders() });
}

}

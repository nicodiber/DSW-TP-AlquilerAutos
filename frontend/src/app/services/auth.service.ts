import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  url = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/loginUsuario`, { email, password });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.url}/registrar`, userData);
  }

  obtenerUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.url}/email/${email}`);
  }
  
  // Guardar usuario en sessionStorage
  setUsuarioLogueado(usuario: any): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));  // Guardar el objeto completo como string
  }

  getUsuarioLogueado(): any {
    const usuario = sessionStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;  // Parsear el objeto de nuevo a JSON
  }

  // Eliminar usuario de sessionStorage al cerrar sesión
  logout(): void {
  sessionStorage.removeItem('usuario');  // Eliminar el usuario de sessionStorage
}


actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.url}/editar-datos-usuario/${usuario.email}`, usuario);
  }

}

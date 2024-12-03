import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  url = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.url}/registrar`, userData);
  }

  enviarEmail(email: string): Observable<any> {
     return this.http.post(`${this.url}/enviar-email`, {email: email});
  }

  resetPassword(resetObj: any): Observable<any> {
     return this.http.post(`${this.url}/reset-password`, resetObj);
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Guardar usuario en sessionStorage
  setUsuarioLogueado(usuario: any): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));  // Guardar el objeto completo como string
  }

  getUsuarioLogueado(): any {
    const usuario = sessionStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;  // Parsear el objeto de nuevo a JSON
  }

  
  logout(): void {
    sessionStorage.removeItem('usuario');  
    sessionStorage.removeItem('token'); 
  }


  obtenerAlquileresLogueado(usuarioid: number): Observable<any>{
    return this.http.get(`${this.url}/datos/${usuarioid}`);
  }
}

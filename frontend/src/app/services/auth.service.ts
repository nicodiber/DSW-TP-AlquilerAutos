import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  url = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient,  private router: Router, private cookieService: CookieService) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials, {
      withCredentials: true, // Esto habilita las cookies
    });
  }

   register(userData: any): Observable<any> {
    return this.http.post(`${this.url}/registrar`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.url}/logout`, {}, {
      withCredentials: true,
    });
  }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get(`${this.url}/perfil`, {
      withCredentials: true,
    });
  }

  verificarToken(): Observable<any> {
  return this.http.get(`${this.url}/verificarToken`, {
      withCredentials: true,
    });
  }


  redirigirEnBaseAlRol(role: string): void {
    if (role === 'administrador') {
      window.location.href = '/escritorio';
      //this.router.navigate(['/escritorio']);
    } else if (role === 'trabajador') {
      window.location.href = '/escritorio';
      //this.router.navigate(['/escritorio']);
    } else if (role === 'usuario') {
      window.location.href = '/escritorio';
      //this.router.navigate(['/escritorio']);
    } else {
      window.location.href = '/index.html';
      //this.router.navigate(['/nosotros.html']);
    }
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
    const token = this.cookieService.get('access_token');
    return token;
  }

  // Guardar usuario en sessionStorage
  setUsuarioLogueado(usuario: any): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));  // Guardar el objeto completo como string
  }

  getUsuarioLogueado(): any {
    const usuario = sessionStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;  // Parsear el objeto de nuevo a JSON
  }


  obtenerAlquileresLogueado(usuarioid: number): Observable<any>{
    return this.http.get(`${this.url}/datos/${usuarioid}`);
  }
  
}

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class gestionCookiesService {

  constructor(private cookieService: CookieService) { }

  setDatosBusqueda(datos: any, modelo?: any, auto?: any, precio?: any, idAlq?: any): void {
    const data = {
      sucursalRetiro: datos.sucursalRetiro,
      sucursalDevolucion: datos.sucursalDevolucion,
      fechaRetiro: datos.fechaRetiro,
      fechaDevolucion: datos.fechaDevolucion,
      horaRetiro: datos.horaRetiro,
      horaDevolucion: datos.horaDevolucion,
      modeloElegido: modelo != undefined ? modelo : datos.modeloElegido,
      autoAsignado: auto != undefined ? auto : datos.autoAsignado,
      precioTotal: precio != undefined ? precio : datos.precioTotal,
      idAlquiler: idAlq != undefined ? idAlq : datos.idAlquiler,
    };

    const expiration = this.cookieService.get('datosBusquedaExpiration');
    const expirationDate = new Date(expiration);  // Para mantener la fecha de expiración anterior
    this.cookieService.delete('datosBusqueda', '/');
    this.cookieService.set('datosBusqueda', JSON.stringify(data), { expires: expirationDate, path: '/' }); // Almacenar temporalmente
  }

  getDatosBusqueda(): any {
    const cookie = this.cookieService.get('datosBusqueda');
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (error) {
        return 1; // Devuelve 1 si ocurre un error de parseo
      }
    }
    return 0; // Devuelve 0 si la cookie no existe
  }

  getDatosBusquedaExpiration(): any {
    const cookie = this.cookieService.get('datosBusquedaExpiration');
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (error) {
        return 1; // Devuelve 1 si ocurre un error de parseo
      }
    }
    return 0; // Devuelve 0 si la cookie no existe
  }

  getDatosModelosDisponibles(): [] {
    return JSON.parse(this.cookieService.get('modelosDisponibles') || '[]');  // No hace falta el chequeo de error de las otras porque no la usamos con ese proposito
  }

  getautosCoincidentesIds(): [] {
    return JSON.parse(this.cookieService.get('autosCoincidentesIds') || '[]');  // No hace falta el chequeo de error de las otras porque no la usamos con ese proposito
  }

  borrarCookie(nombreCookie: string){
    this.cookieService.delete(nombreCookie, '/');
  }
}

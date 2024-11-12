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
    return JSON.parse(this.cookieService.get('datosBusqueda') || '{}');
  }

  getDatosModelosDisponibles(): [] {
    return JSON.parse(this.cookieService.get('modelosDisponibles') || '[]');
  }

  borrarCookie(nombreCookie: string){
    this.cookieService.delete(nombreCookie, '/');
  }
}

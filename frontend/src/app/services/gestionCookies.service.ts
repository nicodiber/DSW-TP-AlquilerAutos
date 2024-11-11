import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class gestionCookiesService {

  constructor(private cookieService: CookieService) { }

  setDatosBusqueda(datos: any, modelo?: any, precio?: any): void {
    const data = {
      sucursalRetiro: datos.sucursalRetiro,
      sucursalDevolucion: datos.sucursalDevolucion,
      fechaRetiro: datos.fechaRetiro,
      fechaDevolucion: datos.fechaDevolucion,
      horaRetiro: datos.horaRetiro,
      horaDevolucion: datos.horaDevolucion,
      modeloElegido: modelo != undefined ? modelo : datos.modeloElegido,
      precioTotal: precio != undefined ? precio : datos.precioTotal,
    };

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 900); // Tiempo de expiración de las cookies en 900 = 15 minutos
    this.cookieService.delete('datosBusqueda', '/');
    this.cookieService.set('datosBusqueda', JSON.stringify(data), { expires: expirationDate, path: '/' }); // Almacenar temporalmente
  }

  getDatosBusqueda(): any {
    return JSON.parse(this.cookieService.get('datosBusqueda') || '{}');
  }

  getDatosModelosDisponibles(): [] {
    return JSON.parse(this.cookieService.get('modelosDisponibles') || '[]');
  }
}

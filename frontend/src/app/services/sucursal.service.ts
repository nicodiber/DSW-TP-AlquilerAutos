import { HttpClient } from '@angular/common/http';  // Importamos el módulo HttpClient para realizar solicitudes HTTP
import { Injectable } from '@angular/core';  // Importamos el decorador Injectable para inyectar este servicio
import { Observable } from 'rxjs';  // Importamos Observable para manejar las respuestas asíncronas
import { sucursal } from '../models/sucursal';  // Importamos el modelo de datos para la sucursal

@Injectable({
  providedIn: 'root'  // Esto indica que el servicio estará disponible a nivel global en toda la aplicación
})
export class SucursalService {
  private url = 'http://localhost:4000/api/sucursales/';  // La URL base de la API donde se gestionan las sucursales

  // Constructor que inyecta HttpClient para hacer las solicitudes HTTP
  constructor(private http: HttpClient) { }

  // Método para obtener todas las sucursales desde la API
  obtenerSucursales(): Observable<any> {
    return this.http.get(this.url);  // Realiza una solicitud GET a la URL base y devuelve un observable con la respuesta
  }

  // Método para obtener una sucursal específica utilizando su ID
  obtenerSucursal(id: string): Observable<any> {
    return this.http.get(`${this.url}${id}`);  // Realiza una solicitud GET a la URL base concatenando el ID de la sucursal
  }

  // Método para guardar una nueva sucursal en la base de datos
  guardarSucursal(sucursal: sucursal): Observable<any> {
    return this.http.post(this.url, sucursal);  // Realiza una solicitud POST con el objeto sucursal al servidor
  }

  // Método para editar una sucursal existente
  editarSucursal(id: string, sucursal: sucursal): Observable<any> {
    return this.http.put(`${this.url}${id}`, sucursal);  // Realiza una solicitud PUT a la URL de la sucursal con el ID y el objeto actualizado
  }

  // Método para eliminar una sucursal especificada por su ID
  eliminarSucursal(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);  // Realiza una solicitud DELETE a la URL de la sucursal especificando el ID
  }

  // Método para asignar o desasignar trabajadores a una sucursal
  asignarTrabajadores(idSucursal: string, trabajadoresAsignados: string[], trabajadoresNoAsignados: string[]): Observable<any> {
    // Realiza una solicitud POST para asignar o desasignar trabajadores de la sucursal, enviando los IDs de los trabajadores
    return this.http.post(`${this.url}${idSucursal}/asignar-trabajadores`, {
      trabajadoresAsignados,
      trabajadoresNoAsignados
    });
  }

  // Método para obtener los trabajadores asignados y no asignados para una sucursal
  obtenerTrabajadoresParaAsignacion(idSucursal: string): Observable<any> {
    return this.http.get(`${this.url}${idSucursal}/obtener-trabajadores`);  // Realiza una solicitud GET para obtener la lista de trabajadores para asignación
  }

  // Método para obtener autos asignados y no asignados para una sucursal específica
  obtenerAutosParaAsignacion(idSucursal: string): Observable<any> {
    return this.http.get(`${this.url}${idSucursal}/obtener-autos`);  // Realiza una solicitud GET para obtener la lista de autos asignados y no asignados para la sucursal especificada por su ID
  }

  // Método para asignar o desasignar autos a una sucursal específica
  asignarAutos(idSucursal: string, autosAsignados: string[], autosNoAsignados: string[]): Observable<any> {
    // Realiza una solicitud POST para asignar o desasignar autos de la sucursal, enviando los IDs de los autos seleccionados
    return this.http.post(`${this.url}${idSucursal}/asignar-autos`, {
      autosAsignados,
      autosNoAsignados
    });
  }
}

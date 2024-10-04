import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  url = 'http://localhost:4000/api/marcas/';

  
  constructor(private http: HttpClient) { }

  obtenerMarcas(): Observable<any>{
    return this.http.get(this.url);
  }
  obtenerMarca(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auto } from '../models/auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  url = 'http://localhost:4000/api/autos/';

  constructor(private http: HttpClient) { }
  
  obtenerAutos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarAuto(_id: number): Observable<any>{
    return this.http.delete(this.url + _id);
  }

  guardarAuto(auto: auto): Observable<any>{
    return this.http.post(this.url, auto);
  }

  editarAuto(_id: string, auto: auto):Observable<any>{
    return this.http.put(this.url + _id, auto);
  }

  obtenerAuto(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }
}

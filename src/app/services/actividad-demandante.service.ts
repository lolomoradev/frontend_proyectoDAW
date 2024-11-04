import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadDemandante } from '../models/actividadDemandanteModel';

@Injectable({
  providedIn: 'root'
})
export class ActividadDemandanteService {
  private apiUrl = 'http://localhost:8081/actividad-demandante'; // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient) {}

  getActividadDemandantes(): Observable<ActividadDemandante[]> {
    return this.http.get<ActividadDemandante[]>(this.apiUrl);
  }

  getActividadDemandante(id: number): Observable<ActividadDemandante> {
    return this.http.get<ActividadDemandante>(`${this.apiUrl}/${id}`);
  }

  crearActividadDemandante(actividadDemandante: ActividadDemandante): Observable<ActividadDemandante> {
    return this.http.post<ActividadDemandante>(this.apiUrl, actividadDemandante);
  }

  eliminarActividadDemandante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

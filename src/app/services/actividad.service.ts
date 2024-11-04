// src/app/services/actividad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividadModel'; // Asegúrate de ajustar la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://localhost:3000/actividades'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  getActividadById(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/${id}`);
  }

  createActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  updateActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.apiUrl}/${actividad.idActividad}`, actividad);
  }

  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

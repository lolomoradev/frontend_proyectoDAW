import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividadModel';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://localhost:8081/actividades'; // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades
  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  // Obtener actividades por ofertante
  getActividadesPorOfertante(idOfertante: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/ofertante/${idOfertante}`);
  }

  // Obtener una actividad por ID
  getActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva actividad
  crearActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  // Actualizar una actividad
  actualizarActividad(id: number, actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.apiUrl}/${id}`, actividad);
  }

  // Eliminar una actividad
  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

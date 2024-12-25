// src/app/services/actividad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos la clase HttpClient, no el módulo.
import { Observable } from 'rxjs';
import { ActividadDTO } from '../models/actividadDTO'; // Importa el DTO de Actividad

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrl = 'http://localhost:8080/api'; // URL base para las operaciones de actividad

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades (usando ActividadDTO)
  getActividades(): Observable<ActividadDTO[]> {
    return this.http.get<ActividadDTO[]>(`${this.apiUrl}/actividades`);
  }

  // Obtener una actividad por ID
  getActividadById(id: number): Observable<ActividadDTO> {
    return this.http.get<ActividadDTO>(`${this.apiUrl}/actividades/${id}`);
  }

  // Agregar una nueva actividad
  agregarActividad(actividad: ActividadDTO): Observable<ActividadDTO> {
    return this.http.post<ActividadDTO>(`${this.apiUrl}/agregarActividad`, actividad);
  }

  // Actualizar una actividad
  actualizarActividad(id: number, actividad: ActividadDTO): Observable<ActividadDTO> {
    return this.http.put<ActividadDTO>(`${this.apiUrl}/actualizarActividad/${id}`, actividad);
  }

  // Borrar una actividad por ID
  borrarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrarActividad/${id}`);
  }
}

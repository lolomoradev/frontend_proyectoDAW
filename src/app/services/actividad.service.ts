// src/app/services/actividad.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { ActividadDTO } from '../models/actividadDTO';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrl = 'http://localhost:8080/api'; // URL base para las operaciones de actividad

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades (usando ActividadDTO)
  getActividades(): Observable<ActividadDTO[]> {
    console.info("Solicitando todas las actividades al backend");
    return this.http.get<ActividadDTO[]>(`${this.apiUrl}/actividades`);
  }

  // Obtener una actividad por ID
  getActividadById(id: number): Observable<ActividadDTO> {
    console.info(`Solicitando actividad con ID: ${id} al backend`);
    return this.http.get<ActividadDTO>(`${this.apiUrl}/actividades/${id}`);
  }

  // Agregar una nueva actividad
  agregarActividad(actividad: ActividadDTO): Observable<ActividadDTO> {
    console.info("Enviando solicitud para agregar una nueva actividad", actividad);
    return this.http.post<ActividadDTO>(`${this.apiUrl}/agregarActividad`, actividad);
  }

  // Actualizar una actividad
  actualizarActividad(id: number, actividad: ActividadDTO): Observable<ActividadDTO> {
    console.info(`Enviando solicitud para actualizar actividad con ID: ${id}`, actividad);
    return this.http.put<ActividadDTO>(`${this.apiUrl}/actualizarActividad/${id}`, actividad);
  }

  // Borrar una actividad por ID
  borrarActividad(id: number): Observable<void> {
    console.info(`Enviando solicitud para borrar actividad con ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/borrarActividad/${id}`);
  }
}

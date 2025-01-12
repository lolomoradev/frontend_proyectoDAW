import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { ActividadDTO } from '../models/actividadDTO';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}


  getActividades(): Observable<ActividadDTO[]> {
    console.info("Solicitando todas las actividades al backend");
    return this.http.get<ActividadDTO[]>(`${this.apiUrl}/actividades`);
  }

  getActividadById(id: number): Observable<ActividadDTO> {
    console.info(`Solicitando actividad con ID: ${id} al backend`);
    return this.http.get<ActividadDTO>(`${this.apiUrl}/actividades/${id}`);
  }

  agregarActividad(actividad: ActividadDTO): Observable<ActividadDTO> {
    console.info("Enviando solicitud para agregar una nueva actividad", actividad);
    return this.http.post<ActividadDTO>(`${this.apiUrl}/agregarActividad`, actividad);
  }

  actualizarActividad(actividad: ActividadDTO): Observable<ActividadDTO> {
    console.log('Enviando actividad para actualización:', actividad);
    return this.http.put<ActividadDTO>(`${this.apiUrl}/actualizarActividad/${actividad.idActividad}`, actividad);
  }

  borrarActividad(id: number): Observable<void> {
    console.info(`Enviando solicitud para borrar actividad con ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/borrarActividad/${id}`);
  }
}

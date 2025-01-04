import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividadModel';

@Injectable({
  providedIn: 'root'
})
export class ActividadOfertanteService {
  private apiUrl = 'http://localhost:8081/actividades'; // Cambia esto por la URL real de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades
  getActividades(): Observable<Actividad[]> {
    console.log('ActividadOfertanteService: solicitando todas las actividades desde', this.apiUrl);
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  // Obtener actividades por ofertante
  getActividadesPorOfertante(idOfertante: number): Observable<Actividad[]> {
    const url = `${this.apiUrl}/ofertante/${idOfertante}`;
    console.log(`ActividadOfertanteService: solicitando actividades para el ofertante con ID ${idOfertante} desde`, url);
    return this.http.get<Actividad[]>(url);
  }

  // Obtener una actividad por ID
  getActividad(id: number): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ActividadOfertanteService: solicitando actividad con ID ${id} desde`, url);
    return this.http.get<Actividad>(url);
  }

  // Crear una nueva actividad
  crearActividad(actividad: Actividad): Observable<Actividad> {
    console.log('ActividadOfertanteService: creando nueva actividad:', actividad);
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  // Actualizar una actividad
  actualizarActividad(id: number, actividad: Actividad): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ActividadOfertanteService: actualizando actividad con ID ${id} en`, url, 'Datos:', actividad);
    return this.http.put<Actividad>(url, actividad);
  }

  // Eliminar una actividad
  eliminarActividad(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ActividadOfertanteService: eliminando actividad con ID ${id} desde`, url);
    return this.http.delete<void>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadDemandante } from '../models/actividadDemandanteModel';

@Injectable({
  providedIn: 'root'
})
export class ActividadDemandanteService {
  private apiUrl = 'http://localhost:8080/api/actividadDemandante'; 
  
  constructor(private http: HttpClient) {}

  // Obtener todas las reservas de actividades
  getActividadDemandantes(): Observable<ActividadDemandante[]> {
    console.log('ActividadDemandanteService: Solicitando todas las reservas de actividades desde', this.apiUrl);
    return this.http.get<ActividadDemandante[]>(this.apiUrl);
  }

  // Obtener una reserva de actividad por ID
  getActividadDemandante(id: number): Observable<ActividadDemandante> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ActividadDemandanteService: Solicitando reserva de actividad con ID ${id} desde`, url);
    return this.http.get<ActividadDemandante>(url);
  }

  crearActividadDemandante(actividadDemandante: ActividadDemandante): Observable<any> {
    const url = `${this.apiUrl}/reservar`;
    console.log('Enviando solicitud de reserva a:', url);
    console.debug('Datos de la reserva:', actividadDemandante);

    if (!actividadDemandante.idActividad || !actividadDemandante.idDemandante || !actividadDemandante.fechaReserva) {
        console.error('Datos incompletos para la reserva:', actividadDemandante);
        return new Observable(observer => observer.error('Datos incompletos para la reserva.'));
    }

    return this.http.post<any>(url, actividadDemandante);
}


  // Eliminar una reserva de actividad por ID
  eliminarActividadDemandante(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ActividadDemandanteService: Enviando solicitud para eliminar reserva de actividad con ID ${id} desde`, url);
    return this.http.delete<void>(url);
  }
}

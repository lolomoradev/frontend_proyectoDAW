// src/app/services/actividadDemandante.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadDemandante } from '../models/actividadDemandanteModel';

@Injectable({
  providedIn: 'root'
})
export class ActividadDemandanteService {

  private apiUrl = 'http://localhost:8080/api/actividad-demandante'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) { }

  // Método para crear una nueva reserva (actividadDemandante)
  crearActividadDemandante(actividadDemandante: ActividadDemandante): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservar`, actividadDemandante);
  }

  // Método para obtener actividades reservadas por un demandante específico (opcional)
  obtenerActividadesDemandante(idDemandante: number): Observable<ActividadDemandante[]> {
    return this.http.get<ActividadDemandante[]>(`${this.apiUrl}/demandante/${idDemandante}`);
  }

  // Otros métodos relacionados con actividadDemandante pueden añadirse aquí
}

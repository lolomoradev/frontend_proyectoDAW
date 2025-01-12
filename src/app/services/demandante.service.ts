import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demandante } from '../models/demandanteModel';

@Injectable({
  providedIn: 'root'
})
export class DemandanteService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getDemandantes(): Observable<Demandante[]> {
    return this.http.get<Demandante[]>(this.apiUrl);
  }

  //Obtiene el iddemandante usando el id del usuario
  getIdDemandanteByUserId(userId: number): Observable<number> {
      const url = `${this.apiUrl}/actividadDemandante/usuarios/${userId}/demandante`;
      console.log('DemandanteService: Obteniendo ID del demandante desde:', url);
      return this.http.get<number>(url);
  }
}
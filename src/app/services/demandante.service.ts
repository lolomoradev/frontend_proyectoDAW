import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demandante } from '../models/demandanteModel';

@Injectable({
  providedIn: 'root'
})
export class DemandanteService {
  private apiUrl = 'http://localhost:8080/api/demandantes';

  constructor(private http: HttpClient) {}

  getDemandantes(): Observable<Demandante[]> {
    return this.http.get<Demandante[]>(this.apiUrl);
  }

  // Métodos específicos para demandantes
  // Método para obtener el idDemandante a partir del userId
  getIdDemandanteByUserId(userId: number): Observable<number> {
      const url = `${this.apiUrl}/usuarios/${userId}/demandante`;
      console.log('DemandanteService: Obteniendo ID del demandante desde:', url);
      return this.http.get<number>(url);
  }
}

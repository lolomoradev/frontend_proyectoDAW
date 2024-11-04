import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demandante } from '../models/demandanteModel';

@Injectable({
  providedIn: 'root'
})
export class DemandanteService {
  private apiUrl = 'http://localhost:8081/demandantes';

  constructor(private http: HttpClient) {}

  getDemandantes(): Observable<Demandante[]> {
    return this.http.get<Demandante[]>(this.apiUrl);
  }

  // Métodos específicos para demandantes
}

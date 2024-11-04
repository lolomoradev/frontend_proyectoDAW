import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ofertante } from '../models/ofertanteModel';

@Injectable({
  providedIn: 'root'
})
export class OfertanteService {
  private apiUrl = 'http://localhost:8081/ofertantes';

  constructor(private http: HttpClient) {}

  getOfertantes(): Observable<Ofertante[]> {
    return this.http.get<Ofertante[]>(this.apiUrl);
  }

  // Métodos específicos para ofertantes
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistroDTO } from '../models/registroDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:8080/api/registrar'; 

  constructor(private http: HttpClient) { }

  register(registro: RegistroDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, registro, { headers });
  }
}

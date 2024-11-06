import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsuarioDTO } from '../models/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8080/api/registrar'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  register(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.apiUrl, usuario);
  }
}

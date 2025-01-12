import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/usuarioDTO'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';  

  constructor(private http: HttpClient) {}


  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuarios`); 
  }

  getUsuarioById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/usuarios/${id}`);
  }

  registrarUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/registrar`, usuario);  // Ruta en tu controlador para registrar
  }


  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(`${this.apiUrl}/actualizar/${id}`, usuario);  // Ruta para actualizar usuario por ID
  }


    actualizarPerfil(datos: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/actualizar`, datos);
    }


  borrarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${id}`);  // Ruta para borrar usuario
  }
}

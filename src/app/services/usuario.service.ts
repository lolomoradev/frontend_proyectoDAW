// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/usuarioDTO'; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';  // La URL base para las operaciones del usuario

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios (usando UsuarioDTO)
  getUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuarios`);  // Utiliza la ruta definida en el controller
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Registrar un nuevo usuario (con UsuarioDTO)
  registrarUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/registrar`, usuario);  // Ruta en tu controlador para registrar
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(`${this.apiUrl}/actualizar/${id}`, usuario);  // Ruta para actualizar usuario por ID
  }

  // Borrar un usuario por ID
  borrarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/borrar/${id}`);  // Ruta para borrar usuario
  }
}

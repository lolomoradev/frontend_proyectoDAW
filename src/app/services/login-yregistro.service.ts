// src/app/services/login-yregistro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginYRegistroService {
  private apiUrl = 'http://localhost:8081/auth'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient, private router: Router) {}

  // Método para registrar un nuevo usuario
  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Limpiar el token
    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token almacenado
  }
}

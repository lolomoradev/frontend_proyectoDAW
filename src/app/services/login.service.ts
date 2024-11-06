import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://api.tu-app.com/auth'; // Cambia esto por la URL de tu API


  // Método para realizar el login
  login() {

  }

  // Método para cerrar sesion
  logout(){

  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para obtener el rol del usuario
  getUserRole(): Observable<string | null> {
   
    return of(null); // Retorna null si no hay token
  }
}

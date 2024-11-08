// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login'; // URL del backend para login
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      // Si no estamos en el navegador (SSR), inicializamos con un valor vacío
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  // Método para obtener el usuario actual
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Método para hacer login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Si el login es exitoso, almacenamos el token en localStorage (solo si estamos en el navegador)
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('currentUser', JSON.stringify(response));
              this.currentUserSubject.next(response);  // Actualizamos el sujeto con el usuario logueado
            }
          }
        })
      );
  }

  // Método para hacer logout
  logout() {
    // Eliminar del localStorage solo si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');  // Eliminamos el token y los datos del usuario
    }
    this.currentUserSubject.next(null);  // Actualizamos el sujeto para indicar que no hay usuario logueado
    this.router.navigate(['/login']);  // Redirigimos a la página de login
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserValue;  // Retorna true si hay un usuario autenticado
  }

  // Método para obtener el token JWT almacenado
  getToken(): string {
    const user = this.currentUserValue;
    return user ? user.token : '';  // Devuelve el token JWT si el usuario está autenticado
  }
}

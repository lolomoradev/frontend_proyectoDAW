// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/login'; // URL del backend para login
  private currentUserSubject: BehaviorSubject<any>; // Cambiado a any para flexibilidad
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<any>(
        storedUser ? JSON.parse(storedUser) : { token: null, userId: null, role: null }
      );
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      // Si no estamos en el navegador (SSR), inicializamos con un valor vacío
      this.currentUserSubject = new BehaviorSubject<any>({ token: null, userId: null, role: null });
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
          if (response && response.token && response.userId && response.role) {
            // Si el login es exitoso, almacenamos el token, userId y role en localStorage
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('currentUser', JSON.stringify({
                token: response.token,
                userId: response.userId,
                role: response.role
              }));
              this.currentUserSubject.next({
                token: response.token,
                userId: response.userId,
                role: response.role
              }); // Actualizamos el sujeto con el usuario logueado
            }
          }
        })
      );
  }

  // Método para hacer logout
  logout() {
    // Eliminar del localStorage solo si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser'); // Eliminamos el token y los datos del usuario
    }
    this.currentUserSubject.next({ token: null, userId: null, role: null }); // Indicamos que ya no hay un usuario logueado
    this.router.navigate(['/login']); // Redirigimos a la página de login
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    // Retorna true si existe usuario y token
    return !!user && !!user.token;
  }

  // Método para obtener el token JWT almacenado
  getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  // Método para obtener el userId almacenado
  getUserId(): number | null {
    const user = this.currentUserValue;
    return user ? user.userId : null;
  }

  // Método para obtener el role almacenado
  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.role : null;
  }
}

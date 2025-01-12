import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/login'; 
  private currentUserSubject: BehaviorSubject<any>; 
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<any>(
        storedUser ? JSON.parse(storedUser) : { token: null, userId: null, role: null }
      );
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>({ token: null, userId: null, role: null });
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token && response.userId && response.role) {
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
              }); 
            }
          }
        })
      );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser'); 
    }
    this.currentUserSubject.next({ token: null, userId: null, role: null }); 
    this.router.navigate(['/login']); 
  }

  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!user && !!user.token;
  }

  getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  getUserId(): number | null {
    const user = this.currentUserValue;
    return user ? user.userId : null;
  }

  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.role : null;
  }

    getUserName(): string | null {
      const user = this.currentUserValue;
      return user ? user.username : null;
    }
}

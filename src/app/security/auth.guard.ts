import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Verificamos si el usuario está autenticado
    if (this.loginService.isAuthenticated()) {
      return true; // Si el usuario está autenticado, permitimos el acceso
    } else {
      // Si el usuario no está autenticado, lo redirigimos al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

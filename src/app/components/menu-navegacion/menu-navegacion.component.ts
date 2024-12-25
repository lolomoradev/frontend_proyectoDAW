// src/app/components/menu-navegacion/menu-navegacion.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent implements OnInit {
  userRole: string | null = null; // Variable para almacenar el rol del usuario

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener el usuario actual
    this.loginService.currentUser.subscribe(user => {
      this.userRole = user?.role || null; // Si no hay usuario logueado, establece null
      console.log('Role del usuario:', this.userRole);
    });
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout(): void {
    this.loginService.logout();
  }
}

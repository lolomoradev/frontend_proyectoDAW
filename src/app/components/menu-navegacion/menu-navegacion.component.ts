// src/app/components/menu-navegacion.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [RouterModule, HttpClientModule,CommonModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent implements OnInit {

  userRole: string | null = null; // Guardamos el rol del usuario

  constructor(private authService: LoginService, private httpClient: HttpClient) {}

  ngOnInit() {
    // Obtenemos el rol del usuario actual (si está logueado)
    const user = this.authService.currentUserValue;
    if (user && user.role) {
      this.userRole = user.role;  // Aquí se guarda el rol del usuario (admin, ofertante, demandante)
    }
  }

  // Método para saber si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Método para saber si el usuario es admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  // Método para saber si el usuario es ofertante o demandante
  isOfertanteOrDemandante(): boolean {
    return this.userRole === 'ofertante' || this.userRole === 'demandante';
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}


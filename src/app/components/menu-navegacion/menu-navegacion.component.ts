import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent implements OnInit {
  userRole: string | null = null; // Guardamos el rol del usuario

  constructor(private authService: LoginService) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.userRole = user?.role || null; // Si no hay usuario logueado, userRole será null
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  logout() {
    this.authService.logout();
  }
}

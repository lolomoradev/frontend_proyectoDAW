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
  userRole: string | null = null;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe(user => {
      this.userRole = user?.role || null; // Si no hay usuario logueado, establece null
      console.log('Role del usuario:', this.userRole);
    });
  }

  //Verifica si el usuario esta autenticado
  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  logout(): void {
    this.loginService.logout();
  }
}

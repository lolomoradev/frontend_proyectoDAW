// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userRole: string | null = null; // Rol del usuario
  nombreUsuario: string = ''; // Nombre del usuario
  busqueda: string = ''; // Término de búsqueda
  actividadesFiltradas: any[] = []; // Actividades filtradas por búsqueda

  constructor(
    private authService: LoginService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole(); // Cargar el rol del usuario
    this.nombreUsuario = this.authService.getUserName() || 'Usuario'; // Obtener el nombre
  }

  // Buscar actividades por título (solo para demandantes)
  buscarActividades() {
    if (this.busqueda.trim() && this.userRole === 'demandante' || this.userRole === 'ambos') {
      this.http
        .get<any[]>(`http://localhost:8080/api/actividadesPorTitulo?titulo=${this.busqueda}`)
        .subscribe(
          (data) => {
            this.actividadesFiltradas = data; // Asignar actividades filtradas
          },
          (error) => {
            console.error('Error al buscar actividades:', error);
            this.actividadesFiltradas = []; // Resetear en caso de error
          }
        );
    } else {
      this.actividadesFiltradas = []; // Limpiar actividades si no hay búsqueda
    }
  }

}

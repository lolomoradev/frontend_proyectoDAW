// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { HomeDemandanteComponent } from '../home-demandante/home-demandante.component';
import { HomeOfertanteComponent } from '../home-ofertante/home-ofertante.component';

// OJO: Importamos la clase HttpClient, NO HttpClientModule
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  // Eliminamos HttpClientModule de "imports"
  imports: [
    HomeAdminComponent,
    HomeDemandanteComponent,
    HomeOfertanteComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  // Inyectamos LoginService y HttpClient si necesitas hacer peticiones aquí
  constructor(private authService: LoginService, private http: HttpClient) {}

  ngOnInit() {
    // Aquí puedes usar this.http si lo necesitas.
    // Si no haces peticiones HTTP en este componente,
    // puedes retirar 'private http: HttpClient' del constructor.
  }
}

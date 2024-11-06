// home.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { HomeDemandanteComponent } from '../home-demandante/home-demandante.component';
import { HomeOfertanteComponent } from '../home-ofertante/home-ofertante.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeAdminComponent,HomeDemandanteComponent, HomeOfertanteComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: LoginService, private http: HttpClient) {}

  ngOnInit() {
    // Suscribirse al observable para obtener el rol del usuario
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role; // Asigna el rol recibido a userRole

      if (this.userRole === null) {
        console.log("No hay usuario logueado o el rol es desconocido.");
      } else {
        console.log("Rol del usuario:", this.userRole);
      }
    });
  }
}

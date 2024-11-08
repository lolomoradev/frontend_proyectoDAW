import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = {}; // Objeto para almacenar la información del usuario
  loading: boolean = true; // Variable para mostrar el estado de carga

  constructor(
    private loginService: LoginService, 
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  // Método para cargar el perfil del usuario
  cargarPerfil() {
    const token = this.loginService.getToken(); // Recuperar el token JWT del servicio

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer el header Authorization con el token

      // Hacer la solicitud GET al backend para obtener los datos del perfil
      this.http.get<any>('http://localhost:8080/perfil', { headers })
        .subscribe(
          (data) => {
            this.usuario = data; // Asignar los datos al objeto usuario
            this.loading = false; // Ya no está cargando
          },
          (error) => {
            console.error('Error al obtener el perfil del usuario', error);
            this.loading = false;
            this.router.navigate(['/login']); // Si no se obtiene el perfil, redirige al login
          }
        );
    } else {
      this.router.navigate(['/login']); // Si no hay token, redirige al login
    }
  }
}

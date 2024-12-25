import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  // Eliminamos HttpClientModule de imports.
  imports: [CommonModule],
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
      // Puedes dejar la lógica manual de cabeceras...
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // ...o confiar en el interceptor y simplemente:
      // this.http.get<any>('http://localhost:8080/perfil')
      this.http.get<any>('http://localhost:8080/perfil', { headers })
        .subscribe(
          (data) => {
            this.usuario = data; // Asignar los datos al objeto usuario
            this.loading = false;
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

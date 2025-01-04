// src/app/components/perfil-usuario/perfil-usuario.component.ts

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = {}; // Objeto para almacenar la información del usuario
  loading: boolean = true; // Variable para mostrar el estado de carga
  mostrarFormulario: boolean = false; // Controla la visibilidad del formulario de edición

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
    const userId = this.loginService.getUserId(); // Obtener el ID del usuario

    if (userId) {
      this.http.get<any>(`http://localhost:8080/api/usuarios/${userId}`)
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
      this.router.navigate(['/login']); // Si no hay ID de usuario, redirige al login
    }
  }

  // Método para editar el perfil
  editarPerfil() {
    if (!this.usuario.idUsuario) {
      console.warn("No se puede editar porque el usuario no tiene ID.");
      return;
    }

    this.http.put<any>(`http://localhost:8080/api/actualizar/${this.usuario.idUsuario}`, this.usuario)
      .subscribe(
        (data) => {
          alert('Perfil actualizado con éxito.');
          this.usuario = data; // Actualizar los datos en el frontend
          this.mostrarFormulario = false; // Ocultar el formulario
        },
        (error) => {
          console.error('Error al actualizar el perfil del usuario', error);
          alert('Hubo un error al actualizar el perfil. Intenta nuevamente.');
        }
      );
  }

  eliminarCuenta() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      const userId = this.loginService.getUserId(); // Obtener el ID del usuario
  
      if (userId) {
        this.http.delete(`http://localhost:8080/api/borrar/${userId}`)
          .subscribe(
            () => {
              alert('Cuenta eliminada con éxito.');
              this.loginService.logout(); // Cierra sesión
              this.router.navigate(['/login']); // Redirige al login
            },
            (error) => {
              console.error('Error al eliminar la cuenta del usuario', error);
              alert('Hubo un error al eliminar tu cuenta. Intenta nuevamente.');
            }
          );
      }
    }
  }
  
}

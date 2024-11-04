import { Component } from '@angular/core';
import { LoginYRegistroService } from '../../services/login-yregistro.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuarioModel'; // Asegúrate de importar el modelo
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  templateUrl: './perfil-usuario.component.html',
  imports: [FormsModule], // Asegúrate de incluir FormsModule aquí
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  // Inicializa el objeto usuario con todos los campos requeridos
  usuario: Usuario = { 
    idUsuario: 0, // Puede ser 0 o dejarlo vacío si es un nuevo registro
    nombre: '', 
    apellido1: '', 
    apellido2: '', // Agregado
    email: '', 
    nombreUsuario: '', // Agregado
    password: '', 
    biografia: '', // Opcional
    fechaRegistro: new Date(), // Esto puede ser actualizado después
    idiomasHablados: '', // Opcional
    telefono: '', // Opcional
    rol: '' // Puede ser 'ofertante' o 'demandante', según lo que necesites
  }; 

  constructor(private authService: LoginYRegistroService, private router: Router) {}

  register() {
    this.authService.register(this.usuario).subscribe({
      next: () => {
        // Redirigir a la página de login o éxito
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error de registro', error);
      }
    });
  }
}

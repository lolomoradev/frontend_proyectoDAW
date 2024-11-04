import { Component } from '@angular/core';
import { LoginYRegistroService } from '../../services/login-yregistro.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PerfilOfertanteComponent } from '../perfil-ofertante/perfil-ofertante.component'; // Ajusta la ruta según tu estructura de carpetas
import { PerfilDemandanteComponent } from '../perfil-demandante/perfil-demandante.component'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, PerfilDemandanteComponent, PerfilOfertanteComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    nombreUsuario: '',
    password: '',
    biografia: '',
    idiomasHablados: '',
    telefono: '',
    rol: ''
  };

  constructor(private authService: LoginYRegistroService, private router: Router) {}


  idiomasDisponibles = [
    'Espanol', 'Ingles', 'Frances', 'Aleman', 'Italiano', 'Portugues', 'Chino', 
    'Ruso', 'Japones', 'Danes', 'Sueco', 'Ucraniano', 'Otro'
  ];


  register() {
    this.authService.register(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error de registro', error);
      }
    });
  }

  onRoleChange() {
    console.log('Rol seleccionado:', this.usuario.rol);
  }
}

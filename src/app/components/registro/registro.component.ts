import { Component } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PerfilOfertanteComponent } from '../perfil-ofertante/perfil-ofertante.component'; // Ajusta la ruta según tu estructura de carpetas
import { PerfilDemandanteComponent } from '../perfil-demandante/perfil-demandante.component'; // Ajusta la ruta según tu estructura de carpetas
import { HttpClientModule } from '@angular/common/http';
import { UsuarioDTO } from '../../models/usuarioDTO';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, PerfilDemandanteComponent, PerfilOfertanteComponent,HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: UsuarioDTO = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    nombreUsuario: '',
    password: '',
    biografia: '',
    idiomasHablados: '',
    telefono: '',
    rol: '',
    idUsuario: 0,
    fechaRegistro: new Date()
  };

  constructor(private registroService: RegistroService, private router: Router) {}


  idiomasDisponibles = [
    'Espanol', 'Ingles', 'Frances', 'Aleman', 'Italiano', 'Portugues', 'Chino', 
    'Ruso', 'Japones', 'Danes', 'Sueco', 'Ucraniano', 'Otro'
  ];


  register() {
    this.registroService.register(this.usuario).subscribe({
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

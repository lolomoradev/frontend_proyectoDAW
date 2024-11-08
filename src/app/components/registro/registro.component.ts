import { Component } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../../models/usuarioDTO';
import { RegistroDemandanteComponent } from '../registro-demandante/registro-demandante.component';
import { RegistroOfertanteComponent } from '../registro-ofertante/registro-ofertante.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroDemandanteComponent, RegistroOfertanteComponent, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent {
  usuario: UsuarioDTO = new UsuarioDTO();  // Crear un nuevo UsuarioDTO

  // Lista de idiomas disponibles
  idiomasDisponibles = [
    'Espanol', 'Ingles', 'Frances', 'Aleman', 'Italiano', 'Portugues', 'Chino', 
    'Ruso', 'Japones', 'Danes', 'Sueco', 'Ucraniano', 'Otro'
  ];

  idiomasSeleccionados: string[] = [];


  constructor(private registroService: RegistroService, private router: Router) {}

  // Método de registro
  register() {
    console.log('Datos a enviar al backend:', this.usuario);

    this.registroService.register(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['/login']);  // Redirigir al login después de registrarse
      },
      error: (error) => {
        console.error('Error de registro', error);
        alert('Error al registrar el usuario');
      }
    });
  }

  onIdiomasChange() {
    // Convertir el array de idiomas seleccionados a un string, separado por comas
    this.usuario.idiomasHablados = this.idiomasSeleccionados.join(', ');
    console.log('Idiomas seleccionados como string:', this.usuario.idiomasHablados);
  }

  // Manejo del cambio de rol
  onRoleChange() {
    console.log('Rol seleccionado:', this.usuario.rol);
  }
}

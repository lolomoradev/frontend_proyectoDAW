import { Component, ViewChild } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';
import { UsuarioRegistroDTO } from '../../models/usuarioRegistroDTO';
import { RegistroDemandanteComponent } from '../registro-demandante/registro-demandante.component';
import { RegistroOfertanteComponent } from '../registro-ofertante/registro-ofertante.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroDTO } from '../../models/registroDTO';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroDemandanteComponent, RegistroOfertanteComponent, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: UsuarioRegistroDTO = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    username: '',
    password: '',
    biografia: '',
    idiomasHablados: '',
    telefono: '',
    rol: ''
  };


  idiomasDisponibles = [
    'Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Chino', 
    'Ruso', 'Japonés', 'Danés', 'Sueco', 'Ucraniano', 'Otro'
  ];

  idiomasSeleccionados: string[] = [];

  // Referencias a los componentes hijos
  @ViewChild(RegistroDemandanteComponent) registroDemandanteComponent!: RegistroDemandanteComponent;
  @ViewChild(RegistroOfertanteComponent) registroOfertanteComponent!: RegistroOfertanteComponent;

  constructor(private registroService: RegistroService, private router: Router) {}

  register() {
    if (!this.usuario.nombre || !this.usuario.apellido1 || !this.usuario.email || !this.usuario.username || !this.usuario.password || !this.usuario.rol) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if ((this.usuario.rol === 'ofertante' || this.usuario.rol === 'ambos') && !this.registroOfertanteComponent.oferta.experiencia) {
      alert('Por favor, completa la experiencia como ofertante.');
      return;
    }

    if ((this.usuario.rol === 'demandante' || this.usuario.rol === 'ambos') && !this.registroDemandanteComponent.demanda.telefonoEmergencia) {
      alert('Por favor, completa el teléfono de emergencia como demandante.');
      return;
    }

    let registroDTO: RegistroDTO = {
      usuario: { 
        nombre: this.usuario.nombre,
        apellido1: this.usuario.apellido1,
        apellido2: this.usuario.apellido2,
        email: this.usuario.email,
        username: this.usuario.username,
        password: this.usuario.password,
        biografia: this.usuario.biografia,
        idiomasHablados: this.idiomasSeleccionados.join(', '),
        telefono: this.usuario.telefono,
        rol: this.usuario.rol
      },
    };

    if (this.usuario.rol === 'ofertante' || this.usuario.rol === 'ambos') {
      registroDTO.ofertante = { 
        experiencia: this.registroOfertanteComponent.oferta.experiencia,
        certificacion: this.registroOfertanteComponent.oferta.certificacion,
        valoracion: this.registroOfertanteComponent.oferta.valoracion
      };
    }

    if (this.usuario.rol === 'demandante' || this.usuario.rol === 'ambos') {
      registroDTO.demandante = { 
        telefonoEmergencia: this.registroDemandanteComponent.demanda.telefonoEmergencia,
        edad: this.registroDemandanteComponent.demanda.edad,
        saldo: this.registroDemandanteComponent.demanda.saldo
      };
    }

    console.log('Datos a enviar al backend:', registroDTO);

    this.registroService.register(registroDTO).subscribe({
      next: () => {
        this.router.navigate(['/login']);  
      },
      error: (error) => {
        console.error('Error de registro', error);
        if (error.status === 400) {
          alert('Datos inválidos. Por favor, verifica la información ingresada.');
        } else if (error.status === 403) {
          alert('No tienes permisos para realizar esta acción.');
        } else {
          alert('Error al registrar el usuario. Intenta nuevamente más tarde.');
        }
      }
    });
  }

  onRoleChange() {
    console.log('Rol seleccionado:', this.usuario.rol);
  }
}

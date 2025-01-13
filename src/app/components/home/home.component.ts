import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadDemandante } from '../../models/actividadDemandanteModel';
import { ActividadDemandanteService } from '../../services/actividad-demandante.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;
  nombreUsuario: string = '';
  busqueda: string = '';
  actividadesFiltradas: any[] = [];
  reservas: any[] = [];
  actividadesDemandantes: ActividadDemandante[] = [];

  constructor(
    private authService: LoginService,
    private http: HttpClient,
    private actividadDemandanteService: ActividadDemandanteService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.nombreUsuario = this.authService.getUserName() || 'Usuario';

    if (this.userRole === 'demandante' || this.userRole === 'ambos') {
      this.obtenerReservasPorDemandante();
    }
  }

  buscarActividades() {
    if (this.busqueda.trim() && (this.userRole === 'demandante' || this.userRole === 'ambos')) {
      this.http.get<any[]>(`http://localhost:8080/api/actividadesPorTitulo?titulo=${this.busqueda}`)
        .subscribe(
          (data) => {
            this.actividadesFiltradas = data;
          },
          (error) => {
            console.error('Error al buscar actividades:', error);
            this.actividadesFiltradas = [];
          }
        );
    } else {
      this.actividadesFiltradas = [];
    }
  }
  
 obtenerReservasPorDemandante() {
  const userId = this.authService.getUserId();
  console.log('Obteniendo reservas para el usuario con ID:', userId);

  // Llama al método del servicio
  this.actividadDemandanteService.getActividadDemandantes()
    .subscribe(
      (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.actividadesDemandantes = data.map((reserva: any) => {
          const actividadDemandante: ActividadDemandante = {
            idActividad: reserva.actividad.idActividad,
            idDemandante: reserva.demandante.idDemandante,
            fechaReserva: reserva.fechaReserva,
            tituloActividad: reserva.actividad.titulo,
            fechaRealizacion: reserva.actividad.fechaRealizacion || new Date()
          };
          return actividadDemandante;
        });
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
        this.actividadesDemandantes = [];
      }
    );
}

  
}

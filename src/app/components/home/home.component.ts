import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadDemandante } from '../../models/actividadDemandanteModel';
import { ActividadDemandanteService } from '../../services/actividad-demandante.service';
import { Observable } from 'rxjs';

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
  actividadesReservadas: any[] = []; 

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
      this.http.get<any[]>(`http://localhost:8080/api/actividadesPorTitulo?titulo=${this.busqueda}`).subscribe(
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
    const userId = this.authService.getUserId(); // Obtener el ID de usuario desde el servicio de autenticación
    console.log('Obteniendo reservas para el usuario con ID:', userId);
  
    if (userId !== null) {
      // Llamar al backend para obtener el idDemandante basado en el userId
      this.http.get<number>(`http://localhost:8080/api/actividadDemandante/usuarios/${userId}/demandante`).subscribe(
        (idDemandante) => {
          console.log('ID de Demandante obtenido:', idDemandante);
  
          // Usar el idDemandante para obtener las reservas
          this.actividadDemandanteService.getActividadDemandante(idDemandante).subscribe(
            (data) => {
              console.log('Datos recibidos del servicio:', data);
              this.actividadesReservadas = data.map((reserva: any) => reserva.idActividad);
            },
            (error) => {
              console.error('Error al obtener las reservas:', error);
              this.actividadesReservadas = [];
            }
          );
        },
        (error) => {
          console.error('Error al obtener el ID de Demandante:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID de usuario. La recuperación de reservas no se puede realizar.');
    }
  }
  
  eliminarReserva(idActividad: number) {
    const userId = this.authService.getUserId();  // Obtener el ID del usuario
    if (userId !== null) {
      this.actividadDemandanteService.obtenerIdDemandantePorUsuario(userId).subscribe(
        (idDemandante: number) => {
          console.log(`Eliminando la reserva con ID de actividad: ${idActividad} para el demandante con ID: ${idDemandante}`);
          
          this.actividadDemandanteService.eliminarActividadDemandante(idActividad, idDemandante).subscribe(
            (response: any) => {  // Cambia a cualquier tipo que recibas de la respuesta
              console.log('Reserva eliminada con éxito.');
              this.actividadesReservadas = this.actividadesReservadas.filter(
                (id) => id !== idActividad
              );
            },
            (error: any) => {
              // Asegúrate de capturar errores con el tipo adecuado
              console.error('Error al eliminar la reserva:', error);
              alert('Hubo un problema al intentar eliminar la reserva.');
            }
          );
        },
        (error: any) => {
          console.error('No se pudo obtener el ID del demandante:', error);
          alert('Hubo un problema al obtener los datos del demandante.');
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario. La eliminación de la reserva no se puede realizar.');
      alert('No se pudo obtener el ID del usuario. La eliminación de la reserva no se puede realizar.');
    }
  }
  
  
  
  
}

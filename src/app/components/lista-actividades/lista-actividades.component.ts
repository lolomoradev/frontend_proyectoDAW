// src/app/components/lista-actividades/lista-actividades.component.ts
import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../models/actividadModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadDTO } from '../../models/actividadDTO';  // Asegúrate de que la ruta sea correcta


@Component({
  selector: 'app-lista-actividades',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit {
  actividades: ActividadDTO[] = [];
  actividadActual: ActividadDTO = this.crearActividadInicial();

  nuevaActividad: ActividadDTO = this.crearActividadInicial(); // Agrega esto
  editando: boolean = false;

  tiposActividad = [
    'Escalada',
    'Barranquismo',
    'Senderismo',
    'Alpinismo',
    'Kayak',
    'Esqui',
    'Snowboard',
    'Surf',
    'Rafting',
    'BTT',
    'Paracaidismo',
    'Parapente'
  ];

  dificultades = ['Muy Fácil', 'Fácil', 'Intermedio', 'Difícil', 'Muy Difícil'];




  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadService.getActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  agregarActividad() {
    this.actividadService.agregarActividad(this.actividadActual).subscribe(actividad => {
      this.actividades.push(actividad);
      this.resetFormulario();
    });
  }

  editarActividad(actividadDTO: ActividadDTO) {
    this.editando = true;
    this.actividadActual = { ...actividadDTO }; // Copia la actividad a editar
  }

  actualizarActividad() {
    const id = this.actividadActual.idActividad; // Extraer el ID de la actividad actual
    this.actividadService.actualizarActividad(id, this.actividadActual).subscribe(() => {
      const index = this.actividades.findIndex(a => a.idActividad === id);
      if (index !== -1) {
        this.actividades[index] = this.actividadActual;
      }
      this.resetFormulario();
    });
  }
  
  eliminarActividad(id: number) {
    this.actividadService.borrarActividad(id).subscribe(() => {
      this.actividades = this.actividades.filter(a => a.idActividad !== id);
    });
  }

  resetFormulario() {
    this.actividadActual = this.crearActividadInicial();
    this.editando = false;
  }

  crearActividadInicial(): ActividadDTO {
    return {
      idActividad: 0,
      titulo: '',
      descripcion: '',
      precio: 0,
      tipoPago: '',
      tipoActividad: '',
      edadRequerida: 0,
      estadoActividad: '',
      puntoEncuentro: '',
      minimoPersonas: 0,
      maximoPersonas: 0,
      fechaPublicacion: new Date(),
      fechaLimiteInscripcion: new Date(),
      fechaRealizacion: new Date(),
      duracion: '',
      ubicacion: '',
      dificultad: '',
      politicaCancelacion: '',
      materialNecesario: '',
      idOfertante: 0
    };
  }
}

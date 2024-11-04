// src/app/components/lista-actividades/lista-actividades.component.ts
import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../models/actividadModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-actividades',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit {
  actividades: Actividad[] = [];
  actividadActual: Actividad = this.crearActividadInicial();
  editando: boolean = false;

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
    this.actividadService.createActividad(this.actividadActual).subscribe(actividad => {
      this.actividades.push(actividad);
      this.resetFormulario();
    });
  }

  editarActividad(actividad: Actividad) {
    this.editando = true;
    this.actividadActual = { ...actividad }; // Copia la actividad a editar
  }

  actualizarActividad() {
    this.actividadService.updateActividad(this.actividadActual).subscribe(() => {
      const index = this.actividades.findIndex(a => a.idActividad === this.actividadActual.idActividad);
      if (index !== -1) {
        this.actividades[index] = this.actividadActual;
      }
      this.resetFormulario();
    });
  }

  eliminarActividad(id: number) {
    this.actividadService.deleteActividad(id).subscribe(() => {
      this.actividades = this.actividades.filter(a => a.idActividad !== id);
    });
  }

  resetFormulario() {
    this.actividadActual = this.crearActividadInicial();
    this.editando = false;
  }

  crearActividadInicial(): Actividad {
    return {
      idActividad: 0,
      titulo: '',
      descripcion: '',
      precio: 0,
      tipoPago: '',
      tipoActividad: '',
      edadRequerida: undefined,
      estadoActividad: '',
      puntoEncuentro: '',
      minimoPersonas: 0,
      maximoPersonas: 0,
      fechaPublicacion: undefined,
      fechaLimiteInscripcion: undefined,
      fechaRealizacion: undefined,
      duracion: '',
      ubicacion: '',
      dificultad: '',
      politicaCancelacion: '',
      materialNecesario: '',
      idOfertante: 0
    };
  }
}

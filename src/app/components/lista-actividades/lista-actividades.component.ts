// src/app/components/lista-actividades/lista-actividades.component.ts

import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { UsuarioService } from '../../services/usuario.service'; // Importa UsuarioService
import { ActividadDTO } from '../../models/actividadDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { ActividadDemandanteService } from '../../services/actividad-demandante-service.service';
import { ActividadDemandante } from '../../models/actividadDemandanteModel';

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

  nuevaActividad: ActividadDTO = this.crearActividadInicial();
  editando: boolean = false;

  idOfertanteActual: number | null = null;

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

  // Variable para almacenar el rol del usuario
  userRole: string | null = null;

  constructor(
    private actividadService: ActividadService,
    private loginService: LoginService,
    private actividadDemandanteService: ActividadDemandanteService,
    private usuarioService: UsuarioService // Inyecta UsuarioService
  ) {}

  ngOnInit() {
    console.info("Iniciando ListaActividadesComponent");
    this.obtenerIdOfertanteActual();
    this.cargarActividades();
    this.obtenerRolUsuario();
  }

  obtenerRolUsuario() {
    console.debug("Obteniendo rol del usuario actual");
    // Obtener el rol actual
    this.userRole = this.loginService.getUserRole();
    console.debug("Rol del usuario: ", this.userRole);

    // Suscribirse a cambios en el rol, si el rol puede cambiar dinámicamente
    this.loginService.currentUser.subscribe(user => {
      this.userRole = user.role;
      console.debug("Rol del usuario actualizado: ", this.userRole);
    });
  }


  obtenerIdOfertanteActual() {
    const idUsuario = this.loginService.getUserId();
    if (idUsuario) {
      this.usuarioService.getUsuarioById(idUsuario).subscribe(usuario => {
        if (usuario && usuario.idOfertante) {
          this.idOfertanteActual = usuario.idOfertante;
          console.debug("ID del ofertante autenticado: ", this.idOfertanteActual);
        } else {
          console.warn("No se encontró el ID de ofertante para el usuario actual.");
          this.idOfertanteActual = null;
        }
      }, error => {
        console.error('Error al obtener ID de ofertante:', error);
        this.idOfertanteActual = null;
      });
    } else {
      console.warn("No se pudo obtener el ID de usuario actual.");
      this.idOfertanteActual = null;
    }
  }

  cargarActividades() {
    console.info("Cargando actividades desde el servicio");
    
    this.actividadService.getActividades().subscribe(data => {
      if (this.userRole === 'ofertante' && this.idOfertanteActual) {
        // Filtrar actividades para mostrar solo las creadas por el ofertante actual
        this.actividades = data.filter(actividad => actividad.idOfertante === this.idOfertanteActual);
        console.debug("Actividades cargadas para el ofertante actual: ", this.actividades);
      } else if (this.userRole === 'demandante' || this.userRole === 'admin') {
        // Mostrar todas las actividades para demandantes y administradores
        this.actividades = data;
        console.debug("Actividades cargadas para demandante/admin: ", this.actividades);
      } else {
        console.warn("Rol desconocido o sin permisos para cargar actividades.");
        this.actividades = [];
      }
    }, error => {
      console.error('Error al cargar actividades:', error);
      alert('Hubo un error al cargar las actividades. Intenta nuevamente.');
    });
  }
  
  
  

  agregarActividad() {
    console.info("Intentando agregar una nueva actividad");
    // Obtener el ID de usuario actual
    const idUsuario = this.loginService.getUserId();
    if (!idUsuario) {
      console.warn("No se pudo obtener el ID de usuario actual");
      alert('No se pudo obtener tu ID de usuario.');
      return;
    }

    console.debug("ID de usuario obtenido: ", idUsuario);

    // Obtener el id_ofertante correspondiente al id_usuario
    this.usuarioService.getUsuarioById(idUsuario).subscribe(usuario => {
      if (usuario && usuario.idOfertante) {
        this.actividadActual.idOfertante = usuario.idOfertante;
        console.debug("Asignado idOfertante: ", usuario.idOfertante);

        console.debug("Enviando actividad para agregar: ", this.actividadActual);
        this.actividadService.agregarActividad(this.actividadActual).subscribe(actividad => {
          this.actividades.push(actividad);
          console.info("Actividad agregada exitosamente: ", actividad);
          this.resetFormulario();
          alert('Actividad agregada exitosamente.');
        }, error => {
          console.error('Error al agregar actividad:', error);
          alert('Hubo un error al agregar la actividad. Intenta nuevamente.');
        });
      } else {
        console.warn("No se encontró el ofertante para el usuario con ID: ", idUsuario);
        alert('No se pudo obtener el ofertante para tu usuario.');
      }
    }, error => {
      console.error('Error al obtener usuario:', error);
      alert('Hubo un error al obtener la información de tu usuario.');
    });
  }

  editarActividad(actividadDTO: ActividadDTO) {
    console.info("Intentando editar actividad con ID: ", actividadDTO.idActividad);
    if (this.userRole === 'ofertante' || this.userRole === 'admin') {
      this.editando = true;
      this.actividadActual = { ...actividadDTO }; // Copia la actividad a editar
      console.debug("Actividad actualizada para edición: ", this.actividadActual);
    } else {
      console.warn("Usuario sin permisos para editar actividades");
      alert('No tienes permisos para editar actividades.');
    }
  }

  actualizarActividad() {
    console.info("Intentando actualizar actividad con ID: ", this.actividadActual.idActividad);
    if (this.userRole === 'ofertante' || this.userRole === 'admin') {
      const id = this.actividadActual.idActividad; // Extraer el ID de la actividad actual
      this.actividadService.actualizarActividad(id, this.actividadActual).subscribe(() => {
        const index = this.actividades.findIndex(a => a.idActividad === id);
        if (index !== -1) {
          this.actividades[index] = this.actividadActual;
          console.debug("Actividad actualizada en la lista: ", this.actividades[index]);
        }
        this.resetFormulario();
        console.info("Actividad actualizada exitosamente en el frontend");
        alert('Actividad actualizada exitosamente.');
      }, error => {
        console.error('Error al actualizar actividad:', error);
        alert('Hubo un error al actualizar la actividad. Intenta nuevamente.');
      });
    } else {
      console.warn("Usuario sin permisos para actualizar actividades");
      alert('No tienes permisos para actualizar actividades.');
    }
  }

  eliminarActividad(id: number) {
    console.info("Intentando eliminar actividad con ID: ", id);
    if (this.userRole === 'ofertante' || this.userRole === 'admin') {
      if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
        this.actividadService.borrarActividad(id).subscribe(() => {
          this.actividades = this.actividades.filter(a => a.idActividad !== id);
          console.debug(`Actividad con ID: ${id} eliminada de la lista`);
          alert('Actividad eliminada exitosamente.');
        }, error => {
          console.error('Error al eliminar actividad:', error);
          alert('Hubo un error al eliminar la actividad. Intenta nuevamente.');
        });
      }
    } else {
      console.warn("Usuario sin permisos para eliminar actividades");
      alert('No tienes permisos para eliminar actividades.');
    }
  }

  reservarActividad(id: number) {
    console.info("Intentando reservar actividad con ID: ", id);
    if (this.userRole === 'demandante') {
      const idDemandante = this.getIdDemandanteActual();
      if (!idDemandante) {
        console.warn("No se pudo obtener el ID de demandante");
        alert('No se pudo obtener tu ID de demandante. Intenta nuevamente.');
        return;
      }

      const actividadDemandante: ActividadDemandante = {
        idActividad: id,
        idDemandante: idDemandante,
        fechaReserva: new Date()
      };
      console.debug("Enviando reserva de actividad: ", actividadDemandante);

      this.actividadDemandanteService.crearActividadDemandante(actividadDemandante).subscribe({
        next: () => {
          console.info(`Actividad reservada exitosamente para el ID de demandante: ${idDemandante}`);
          alert('Actividad reservada exitosamente.');
        },
        error: (error) => {
          console.error('Error al reservar la actividad', error);
          alert('Hubo un error al reservar la actividad. Intenta nuevamente.');
        }
      });
    } else {
      console.warn("Usuario sin permisos para reservar actividades");
      alert('Solo los demandantes pueden reservar actividades.');
    }
  }

  getIdDemandanteActual(): number | null {
    console.debug("Obteniendo ID de demandante actual");
    const id = localStorage.getItem('userId');
    console.debug("ID de demandante obtenido: ", id);
    return id ? parseInt(id, 10) : null;
  }

  resetFormulario() {
    console.debug("Reiniciando formulario de actividad");
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

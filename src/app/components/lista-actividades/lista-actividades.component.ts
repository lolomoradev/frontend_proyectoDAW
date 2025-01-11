// src/app/components/lista-actividades/lista-actividades.component.ts

import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { UsuarioService } from '../../services/usuario.service'; // Importa UsuarioService
import { ActividadDTO } from '../../models/actividadDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { ActividadDemandanteService } from '../../services/actividad-demandante.service';
import { ActividadDemandante } from '../../models/actividadDemandanteModel';
import { DemandanteService } from '../../services/demandante.service';

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
    private usuarioService: UsuarioService,
    private demandanteService: DemandanteService
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
      } else if (this.userRole === 'demandante' || this.userRole === 'ambos') {
        // Mostrar todas las actividades para demandantes y ambos
        this.actividades = [...data]; // Usar spread operator para crear una copia del array original
  
        if (this.userRole === 'ambos' && this.idOfertanteActual) {
          // Si el rol es "ambos", también debe ver las actividades que ha creado
          const actividadesDelOfertante = data.filter(actividad => actividad.idOfertante === this.idOfertanteActual);
  
          // Verificación manual para evitar duplicados
          actividadesDelOfertante.forEach(actividad => {
            const existeActividad = this.actividades.some(existingActividad => existingActividad.idActividad === actividad.idActividad);
            if (!existeActividad) {
              this.actividades.push(actividad);
            }
          });
  
          console.debug("Actividades cargadas para ambos (incluyendo propias): ", this.actividades);
        }
  
        console.debug("Actividades cargadas para demandante/ambos: ", this.actividades);
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
    const idUsuario = this.loginService.getUserId();
    if (!idUsuario) {
      console.warn("No se pudo obtener el ID de usuario actual");
      alert('No se pudo obtener tu ID de usuario.');
      return;
    }
  
    this.usuarioService.getUsuarioById(idUsuario).subscribe(usuario => {
      if (usuario && usuario.idOfertante) {
        this.actividadActual.idOfertante = usuario.idOfertante;
        console.debug("Asignado idOfertante: ", usuario.idOfertante);
  
        this.actividadService.agregarActividad(this.actividadActual).subscribe(actividad => {
          // Verificación manual para evitar agregar duplicados
          const existeActividad = this.actividades.some(existingActividad => existingActividad.idActividad === actividad.idActividad);
          if (!existeActividad) {
            this.actividades.push(actividad);
          }
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

  editarActividad(actividad: ActividadDTO) {
    console.info("Cargando datos de actividad para editar:", actividad);
    
    // Solo permitir edición si el usuario es el creador de la actividad
    if (this.userRole === 'ambos' && actividad.idOfertante !== this.idOfertanteActual) {
        console.warn("No puedes editar esta actividad porque no la creaste.");
        alert('No puedes editar esta actividad porque no la creaste.');
        return;
    }

    this.actividadActual = { ...actividad }; // Copiar los datos de la actividad seleccionada a actividadActual
    this.editando = true; // Cambiar el estado de edición a verdadero
}

actualizarActividad(actividadDTO: ActividadDTO): void {
    if (this.userRole === 'ofertante' || this.userRole === 'ambos') {
        if (actividadDTO) {
            // Solo permitir actualización si el usuario es el creador de la actividad
            if (this.userRole === 'ambos' && actividadDTO.idOfertante !== this.idOfertanteActual) {
                console.warn("No tienes permisos para actualizar esta actividad.");
                alert('No puedes actualizar esta actividad porque no la creaste.');
                return;
            }

            console.info("Actualizando actividad con ID: ", actividadDTO.idActividad);
            console.log('Actividad a enviar:', actividadDTO); 

            this.actividadService.actualizarActividad(actividadDTO).subscribe(
                (actividad: ActividadDTO) => {
                    const index = this.actividades.findIndex(a => a.idActividad === actividad.idActividad);
                    if (index !== -1) {
                        this.actividades[index] = actividad; // Actualizar la actividad en la lista
                        console.log('Actividad actualizada:', actividad); 
                    }
                    this.resetFormulario(); // Restablecer el formulario después de la actualización
                },
                error => {
                    console.error('Error al actualizar actividad:', error);
                }
            );
        }
    } else {
        console.warn("Usuario sin permisos para editar actividades");
        alert('No tienes permisos para editar actividades.');
    }
}

eliminarActividad(id: number) {
    console.info("Intentando eliminar actividad con ID: ", id);
    
    // Comprobar si el usuario es el creador de la actividad
    const actividad = this.actividades.find(a => a.idActividad === id);
    if (actividad && (this.userRole === 'ofertante' || this.userRole === 'ambos')) {
        if (this.userRole === 'ambos' && actividad.idOfertante !== this.idOfertanteActual) {
            console.warn("No puedes eliminar esta actividad porque no la creaste.");
            alert('No puedes eliminar esta actividad porque no la creaste.');
            return;
        }
        
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

async reservarActividad(id: number) {
  console.info("Intentando reservar actividad con ID: ", id);
  console.info("userRole.this", this.userRole);

  if (this.userRole === 'demandante') {
    try {
      const idDemandante = await this.getIdDemandanteActual(); // Espera el resultado de la promesa

      if (!idDemandante) {
        console.warn("No se pudo obtener el ID de demandante");
        alert('No se pudo obtener tu ID de demandante. Intenta nuevamente.');
        return;
      }

      const actividadDemandante: ActividadDemandante = {
        idActividad: id,
        idDemandante: idDemandante, // Ahora idDemandante es un número
        fechaReserva: new Date()
      };

      console.debug("Enviando reserva de actividad: ", actividadDemandante);

      this.actividadDemandanteService.crearActividadDemandante(actividadDemandante).subscribe({
        next: () => {
          console.info(`Actividad reservada exitosamente para el ID de demandante: ${idDemandante}`);
          alert('Actividad reservada exitosamente.');
        },
        error: (error: any) => {
          console.error('Error al reservar la actividad', error);
          alert('Hubo un error al reservar la actividad. Intenta nuevamente.');
        }
      });
    } catch (error) {
      console.error("Error al obtener el ID de demandante:", error);
      alert('Hubo un error al obtener tu ID de demandante. Intenta nuevamente.');
    }
  } else {
    console.warn("Usuario sin permisos para reservar actividades");
    alert('Solo los demandantes pueden reservar actividades.');
  }
}


getIdDemandanteActual(): Promise<number | null> {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const userId = user.userId;

    if (userId) {
      return this.demandanteService.getIdDemandanteByUserId(userId).toPromise()
        .then((idDemandante) => {
          // Si no se encuentra el idDemandante, devolvemos null
          return idDemandante !== undefined ? idDemandante : null;
        });
    }
  }

  return Promise.resolve(null);
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

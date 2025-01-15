import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { UsuarioService } from '../../services/usuario.service'; 
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

    this.userRole = this.loginService.getUserRole();
    console.debug("Rol del usuario: ", this.userRole);

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
        } else {
          console.warn("No se encontró el ID de ofertante para el usuario actual.");
          this.idOfertanteActual = null;
        }
      }, error => {
        console.error('Error al obtener ID de ofertante:', error);
        this.idOfertanteActual = null;
      });
    } else {
      console.warn("No se ha obtenido el ID del usuario");
      this.idOfertanteActual = null;
    }
  }

  cargarActividades() {
    console.info("Cargando actividades desde el servicio");
  
    this.actividadService.getActividades().subscribe(data => {
      if (this.userRole === 'ofertante' && this.idOfertanteActual) {
        //Filtra las actividades para mostrarlas creadas por el ofertante actual
        this.actividades = data.filter(actividad => actividad.idOfertante === this.idOfertanteActual);
        console.debug("Actividades cargadas para el ofertante actual: ", this.actividades);
      } else if (this.userRole === 'demandante' || this.userRole === 'ambos') {
        //Mostrar todas las actividades para demandantes y ambos
        this.actividades = [...data];  
  
        if (this.userRole === 'ambos' && this.idOfertanteActual) {
          //Si el rol es ambos tambien puede ver las actividades creadas por si mismo
          const actividadesDelOfertante = data.filter(actividad => actividad.idOfertante === this.idOfertanteActual);
  
          //Verifica para que no se dupliquen las actividades
          actividadesDelOfertante.forEach(actividad => {
            const existeActividad = this.actividades.some(existingActividad => existingActividad.idActividad === actividad.idActividad);
            if (!existeActividad) {
              this.actividades.push(actividad);
            }
          });
  
        }
  
      } else {
        console.warn("No se han podido cargar las actividades");
        this.actividades = [];
      }
    }, error => {
      console.error('Error al cargar actividades:', error);
    });
  }
  
  

  agregarActividad() {
    console.info("Intentando agregar una nueva actividad");
  
    if (!this.actividadActual.titulo || this.actividadActual.titulo.trim() === '') {
      console.warn("El campo 'titulo' no puede estar vacío");
      alert('El campo "titulo" es obligatorio');
      return;
    }

    const idUsuario = this.loginService.getUserId();
    if (!idUsuario) {
      console.warn("No se ha obtenido el ID de usuario");
      return;
    }
  
    this.usuarioService.getUsuarioById(idUsuario).subscribe(usuario => {
      if (usuario && usuario.idOfertante) {
        this.actividadActual.idOfertante = usuario.idOfertante;
        console.debug("Asignado idOfertante: ", usuario.idOfertante);
  
        this.actividadService.agregarActividad(this.actividadActual).subscribe(actividad => {
          //Verigicacion para comprobar si ya existe la actividad
          const existeActividad = this.actividades.some(existingActividad => existingActividad.idActividad === actividad.idActividad);
          if (!existeActividad) {
            this.actividades.push(actividad);
          }
          console.info("Actividad agregada exitosamente: ", actividad);
          this.resetFormulario();
        }, error => {
          console.error('Error al agregar actividad:', error);
        });
      } else {
        console.warn("No se encontro el ofertante con el id de usuario: ", idUsuario);
      }
    }, error => {
      console.error('Error al obtener usuario:', error);
    });
  }
  
  

  editarActividad(actividad: ActividadDTO) {
    console.info("Cargando datos de actividad para editar:", actividad);
    
    if (this.userRole === 'ambos' && actividad.idOfertante !== this.idOfertanteActual) {
        console.warn("No puedes editar esta actividad.");
        return;
    }

    this.actividadActual = { ...actividad };
    this.editando = true;
}

actualizarActividad(actividadDTO: ActividadDTO): void {
    if (this.userRole === 'ofertante' || this.userRole === 'ambos') {
        if (actividadDTO) {
            if (this.userRole === 'ambos' && actividadDTO.idOfertante !== this.idOfertanteActual) {
                console.warn("No puedes actualizar esta actividad.");
                return;
            }

            this.actividadService.actualizarActividad(actividadDTO).subscribe(
                (actividad: ActividadDTO) => {
                    const index = this.actividades.findIndex(a => a.idActividad === actividad.idActividad);
                    if (index !== -1) {
                        this.actividades[index] = actividad;
                        console.log('Actividad actualizada:', actividad); 
                    }
                    this.resetFormulario();
                },
                error => {
                    console.error('Error al actualizar actividad:', error);
                }
            );
        }
    } else {
        console.warn("No puedes editar actividades");
    }
}

eliminarActividad(id: number) {
  console.info("Intentando eliminar actividad con ID: ", id);

  const actividad = this.actividades.find(a => a.idActividad === id);
  if (actividad && (this.userRole === 'ofertante' || this.userRole === 'ambos')) {
    if (this.userRole === 'ambos' && actividad.idOfertante !== this.idOfertanteActual) {
      console.warn("No puedes eliminar esta actividad.");
      return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.actividadService.borrarActividad(id).subscribe({
        next: (response) => {
          console.debug('Respuesta del servidor:', response);
          if (response === 'Actividad borrada con éxito.') {
            this.actividades = this.actividades.filter(a => a.idActividad !== id);
            console.debug(`Actividad con ID: ${id} eliminada de la lista`);
          } else {
            console.warn('No se pudo eliminar la actividad.');
          }
        },
        error: () => console.error('Error al eliminar actividad.')
      });
    }
  } else {
    console.warn('No puedes eliminar esta actividad.');
  }
}




async reservarActividad(id: number) {
  console.info("Intentando reservar actividad con ID: ", id);

  if (this.userRole === 'demandante') {
    try {
      const idDemandante = await this.getIdDemandanteActual();
      if (!idDemandante) {
        console.warn("No se puede obtener el ID de demandante");
        return;
      }

      //Buscar la actividad segun el id de la actividad
      const actividad = this.actividades.find(a => a.idActividad === id);
      if (!actividad) {
        console.warn("Actividad no encontrada con ID:", id);
        return;
      }

      const actividadDemandante: ActividadDemandante = {
        idActividad: id,
        idDemandante: idDemandante,
        fechaReserva: new Date(),
        tituloActividad: actividad.titulo,
        fechaRealizacion: actividad.fechaRealizacion || new Date()
      };

      console.debug("Enviando reserva de actividad: ", actividadDemandante);

      this.actividadDemandanteService.crearActividadDemandante(actividadDemandante).subscribe({
        next: () => {
          console.info(`Actividad reservada con exito con iddemandante: ${idDemandante}`);
        },
        error: (error: any) => {
          console.error('Error al reservar la actividad', error);
        }
      });
    } catch (error) {
      console.error("Error al obtener el ID de demandante:", error);
    }
  } else {
    console.warn("No puedes reservar actividades");
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

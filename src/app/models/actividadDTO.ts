export class ActividadDTO {
  idActividad: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipoPago: string;
  tipoActividad: string;
  edadRequerida: number;
  estadoActividad: string;
  puntoEncuentro: string;
  minimoPersonas: number;
  maximoPersonas: number;
  fechaPublicacion: Date;  
  fechaLimiteInscripcion: Date; 
  fechaRealizacion: Date;
  duracion: string;
  ubicacion: string;
  dificultad: string;
  politicaCancelacion: string;
  materialNecesario: string;
  idOfertante: number;
  
  constructor(
    idActividad: number = 0,
    titulo: string = "",
    descripcion: string = "",
    precio: number = 0,
    tipoPago: string = "",
    tipoActividad: string = "",
    edadRequerida: number = 0,
    estadoActividad: string = "",
    puntoEncuentro: string = "",
    minimoPersonas: number = 0,
    maximoPersonas: number = 0,
    fechaPublicacion: Date = new Date(),
    fechaLimiteInscripcion: Date = new Date(),
    fechaRealizacion: Date = new Date(),
    duracion: string = "",
    ubicacion: string = "",
    dificultad: string = "",
    politicaCancelacion: string = "",
    materialNecesario: string = "",
    idOfertante: number = 0
  ) {
    this.idActividad = idActividad;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.tipoPago = tipoPago;
    this.tipoActividad = tipoActividad;
    this.edadRequerida = edadRequerida;
    this.estadoActividad = estadoActividad;
    this.puntoEncuentro = puntoEncuentro;
    this.minimoPersonas = minimoPersonas;
    this.maximoPersonas = maximoPersonas;
    this.fechaPublicacion = fechaPublicacion;
    this.fechaLimiteInscripcion = fechaLimiteInscripcion;
    this.fechaRealizacion = fechaRealizacion;
    this.duracion = duracion;
    this.ubicacion = ubicacion;
    this.dificultad = dificultad;
    this.politicaCancelacion = politicaCancelacion;
    this.materialNecesario = materialNecesario;
    this.idOfertante = idOfertante;
  }
}
  
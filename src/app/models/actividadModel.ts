export interface Actividad {
    idActividad: number;
    titulo: string;
    descripcion?: string;
    precio: number;
    tipoPago?: string;  
    tipoActividad?: string;            
    edadRequerida?: number;             
    estadoActividad?: string;
    puntoEncuentro?: string;
    minimoPersonas: number;
    maximoPersonas: number;
    fechaPublicacion?: Date;
    fechaLimiteInscripcion?: Date;
    fechaRealizacion?: Date;
    duracion?: string;
    ubicacion?: string;
    dificultad?: string;
    politicaCancelacion?: string;
    materialNecesario?: string;
    idOfertante: number;
  }
  
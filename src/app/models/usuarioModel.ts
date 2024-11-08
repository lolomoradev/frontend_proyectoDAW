// src/app/models/usuario.model.ts
export interface Usuario {
    idUsuario: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    username: string;
    password: string;
    biografia?: string;
    fechaRegistro: Date;
    idiomasHablados?: string;
    telefono?: string;
    rol: string;
  }
  
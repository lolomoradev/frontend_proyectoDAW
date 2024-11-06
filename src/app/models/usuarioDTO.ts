// src/app/dtos/usuario.dto.ts

export class UsuarioDTO {
    idUsuario: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    nombreUsuario: string;
    password: string;
    biografia?: string;
    fechaRegistro: Date;
    idiomasHablados?: string;
    telefono?: string;
    rol: string;
  
    // Constructor con valores por defecto
    constructor(
      idUsuario: number = 0,
      nombre: string = '',
      apellido1: string = '',
      apellido2: string = '',
      email: string = '',
      nombreUsuario: string = '',
      password: string = '',
      biografia?: string,
      fechaRegistro: Date = new Date(),
      idiomasHablados?: string,
      telefono?: string,
      rol: string = ''
    ) {
      this.idUsuario = idUsuario;
      this.nombre = nombre;
      this.apellido1 = apellido1;
      this.apellido2 = apellido2;
      this.email = email;
      this.nombreUsuario = nombreUsuario;
      this.password = password;
      this.biografia = biografia;
      this.fechaRegistro = fechaRegistro;
      this.idiomasHablados = idiomasHablados;
      this.telefono = telefono;
      this.rol = rol;
    }
  }
  
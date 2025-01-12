export class UsuarioDTO {
    idUsuario: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    username: string;
    password: string;
    biografia?: string;
    fechaRegistro: Date;
    idiomasHablados?:string;
    telefono?: string;
    rol: string;
    idOfertante?: number;

    constructor(
      idUsuario: number = 0,
      nombre: string = '',
      apellido1: string = '',
      apellido2: string = '',
      email: string = '',
      username: string = '',
      password: string = '',
      biografia?: string,
      fechaRegistro: Date = new Date(),
      idiomasHablados?: string,
      telefono?: string,
      rol: string = '',
      idOfertante?: number

    ) {
      this.idUsuario = idUsuario;
      this.nombre = nombre;
      this.apellido1 = apellido1;
      this.apellido2 = apellido2;
      this.email = email;
      this.username = username;
      this.password = password;
      this.biografia = biografia;
      this.fechaRegistro = fechaRegistro;
      this.idiomasHablados = idiomasHablados;
      this.telefono = telefono;
      this.rol = rol;
      this.idOfertante = idOfertante
    }
  }
  
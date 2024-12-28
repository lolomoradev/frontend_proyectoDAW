export interface UsuarioRegistroDTO {
    nombre: string;
    apellido1: string;
    apellido2?: string;
    email: string;
    username: string;
    password: string;
    biografia?: string;
    idiomasHablados?: string;
    telefono?: string;
    rol: string;
}

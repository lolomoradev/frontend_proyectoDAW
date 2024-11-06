import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioDTO } from '../../models/usuarioDTO';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

      usuarios: UsuarioDTO[] = [];
      usuarioActual: UsuarioDTO = this.crearUsuarioInicial();


      editando: boolean = false;


      constructor (private usuarioService: UsuarioService){}
      
      ngOnInit(){
          this.cargarUsuarios();
      }

      cargarUsuarios(){
        this.usuarioService.getUsuarios().subscribe(data => {
          this.usuarios = data;
        });
      }

      agregarUsuario(){
        this.usuarioService.registrarUsuario(this.usuarioActual).subscribe(usuario => {
            this.usuarios.push(usuario);
            this.resetFormulario();

        });
      }

      editarUsuario(usuarioDTO: UsuarioDTO){
        this.editando = true;
        this.usuarioActual = {...usuarioDTO};
      }


      actualizarUsuario(){
        const id = this.usuarioActual.idUsuario;

        this.usuarioService.actualizarUsuario(id,this.usuarioActual).subscribe(() => {
          const index = this.usuarios.findIndex(u => u.idUsuario === id);
          if (index !== -1){
            this.usuarios[index] = this.usuarioActual;
          }

          this.resetFormulario();
        })
      }

      eliminarUsuario(id: number){
        this.usuarioService.borrarUsuario(id).subscribe(() => {
          this.usuarios = this.usuarios.filter(u => u.idUsuario !== id);
        });
      }


      resetFormulario() {
        this.usuarioActual = this.crearUsuarioInicial();
        this.editando = false;
      }

      crearUsuarioInicial(): UsuarioDTO {
        return {
          idUsuario: 0,
          nombre: '',
          apellido1: '',
          apellido2: '',
          email: '',
          nombreUsuario: '',
          password: '',
          biografia: '',
          fechaRegistro: new Date(),
          idiomasHablados: '',
          telefono: '',
          rol: ''
        };
      }
      
}

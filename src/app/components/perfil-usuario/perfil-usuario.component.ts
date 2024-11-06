import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { PerfilAdminComponent } from '../perfil-admin/perfil-admin.component';
import { PerfilDemandanteComponent } from '../perfil-demandante/perfil-demandante.component';
import { PerfilOfertanteComponent } from '../perfil-ofertante/perfil-ofertante.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  templateUrl: './perfil-usuario.component.html',
  imports: [FormsModule,PerfilAdminComponent,PerfilDemandanteComponent,PerfilOfertanteComponent,HttpClientModule], // Asegúrate de incluir FormsModule aquí
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  userRole: string | null = null;

  constructor(private authService: LoginService, private http: HttpClient) {}

  ngOnInit() {
    // Suscribirse al observable para obtener el rol del usuario


  }
}

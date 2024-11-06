// src/app/components/menu-navegacion.component.ts
import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css'] // Asegúrate de que esta ruta sea correcta
})
export class MenuNavegacionComponent {


  userRole: string | null = null;

  constructor(private authService: LoginService, httpClient: HttpClient) {}

  ngOnInit() {
    // Suscribirse al observable para obtener el rol del usuario
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role; // Asigna el rol recibido a userRole
    });
  }

}

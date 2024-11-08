// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacionComponent } from './components/menu-navegacion/menu-navegacion.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de que HttpClientModule esté importado
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavegacionComponent, FormsModule, HttpClientModule, FooterComponent], // Asegúrate de que HttpClientModule esté en el array de imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adbenturFront';
}

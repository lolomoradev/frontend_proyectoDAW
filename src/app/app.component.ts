// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacionComponent } from './components/menu-navegacion/menu-navegacion.component'; // Asegúrate de que esta ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true, // Este componente es independiente
  imports: [RouterOutlet, MenuNavegacionComponent, FormsModule, HttpClientModule], // Asegúrate de que todos los componentes importados sean correctos
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Asegúrate de que esta ruta sea correcta
})
export class AppComponent {
  title = 'adbenturFront';
}

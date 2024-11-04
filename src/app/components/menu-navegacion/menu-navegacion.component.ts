// src/app/components/menu-navegacion.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css'] // Asegúrate de que esta ruta sea correcta
})
export class MenuNavegacionComponent {}

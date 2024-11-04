// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Asegúrate de que esta ruta sea correcta

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // Proporciona el router aquí
  ]
});

export default bootstrap;

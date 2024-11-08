// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { importProvidersFrom } from '@angular/core'; // Necesario para importar HttpClientModule

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proporciona el router aquí
    importProvidersFrom(HttpClientModule) // Importa y proporciona HttpClientModule para el servidor
  ]
});

export default bootstrap;

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule aquí
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Rutas de tu aplicación
      HttpClientModule // Importa HttpClientModule aquí para que esté disponible globalmente
    )
  ]
}).catch(err => console.error(err));

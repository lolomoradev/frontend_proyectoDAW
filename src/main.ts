// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Rutas de tu aplicación
      HttpClientModule // Asegúrate de agregar HttpClientModule aquí
    )
  ]
}).catch(err => console.error(err));

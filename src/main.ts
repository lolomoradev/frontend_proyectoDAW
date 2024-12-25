// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Asegúrate de importar appConfig

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers // Despliega los proveedores desde appConfig
  ]
}).catch(err => console.error(err));

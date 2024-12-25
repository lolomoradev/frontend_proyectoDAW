// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Asegúrate de importar appConfig

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers // Despliega los proveedores desde appConfig
  ]
});

export default bootstrap;

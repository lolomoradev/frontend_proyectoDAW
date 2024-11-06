// src/app/app.routes.ts
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component'; // Asegúrate de importar el componente de registro
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'actividades', component: ListaActividadesComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'login', component: LoginComponent },
  {path: 'usuarios', component: ListaUsuariosComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
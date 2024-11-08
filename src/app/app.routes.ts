import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaActividadesComponent } from './components/lista-actividades/lista-actividades.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component'; 
import { LoginComponent } from './components/login/login.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './security/auth.guard'; // Importamos el AuthGuard

export const routes: Routes = [
  // Rutas públicas (accesibles sin autenticación)
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Rutas protegidas (requieren autenticación)
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Ruta protegida para Home
  { path: 'actividades', component: ListaActividadesComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard] },

  // Ruta por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login si no se está autenticado

  // Ruta comodín (en caso de ruta no encontrada)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfoSectionLoginComponent } from '../info-section-login/info-section-login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InfoSectionLoginComponent, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Para mostrar errores de login

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    console.log('Enviando credenciales:', { username: this.username, password: this.password });
    
    // Llamamos al servicio de login
    this.loginService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del login:', response);
          
          // Verificamos si el backend devuelve un token y almacenamos los datos
          if (response && response.token) {
            console.log('Token recibido:', response.token);
            // Podemos hacer algo más aquí si es necesario, como almacenar el token en algún lado.
          }
          
          // Redirigimos al usuario a la página de inicio
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al hacer login:', error);

          // Si el error tiene un mensaje, lo mostramos
          if (error.error?.message) {
            console.log('Mensaje de error del servidor:', error.error.message);
          }

          // Establecemos el mensaje de error para mostrarlo en la interfaz
          this.errorMessage = 'Login fallido. Verifica tus credenciales o intenta de nuevo más tarde.';
        }
      });
  }
}

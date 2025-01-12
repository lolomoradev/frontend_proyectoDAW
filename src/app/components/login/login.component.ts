import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InfoSectionLoginComponent } from '../info-section-login/info-section-login.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, InfoSectionLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {
    console.log('Enviando credenciales:', { username: this.username, password: this.password });
    

    this.loginService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del login:', response);
          

          if (response && response.token && response.userId) {
            console.log('Token recibido:', response.token);
            console.log('User ID recibido:', response.userId);

          }
          
         
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al hacer login:', error);

          if (error.error?.message) {
            console.log('Mensaje de error del servidor:', error.error.message);
          }
          this.errorMessage = 'Login fallido. Verifica tus credenciales o intenta de nuevo más tarde.';
        }
      });
  }
}

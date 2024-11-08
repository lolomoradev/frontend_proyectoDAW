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
  imports: [FormsModule,InfoSectionLoginComponent,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    console.log('Enviando credenciales:', { username: this.username, password: this.password });
    
    this.loginService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del login:', response);
          if (response.token) {
            console.log('Token recibido:', response.token);
          }
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al hacer login:', error);
          if (error.error?.message) {
            console.log('Mensaje de error del servidor:', error.error.message);
          }
          this.errorMessage = 'Login fallido. Verifica tus credenciales.';
        }
      });
  }
  
  
  
}

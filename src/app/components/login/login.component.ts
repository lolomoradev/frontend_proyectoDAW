import { Component } from '@angular/core';
import { LoginYRegistroService } from '../../services/login-yregistro.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  loginError: string | null = null; // Define loginError

  constructor(private authService: LoginYRegistroService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.loginError = null; // Resetear el error en caso de éxito
      },
      error: (error) => {
        console.error('Error de login', error);
        this.loginError = 'Credenciales incorrectas. Por favor, intenta nuevamente.'; // Establecer el mensaje de error
      }
    });
  }
}

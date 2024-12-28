import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-demandante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-demandante.component.html',
  styleUrl: './registro-demandante.component.css'
})
export class RegistroDemandanteComponent {
  demanda = {
    telefonoEmergencia: '',
    edad: 0,
    saldo: 0,
  };
}

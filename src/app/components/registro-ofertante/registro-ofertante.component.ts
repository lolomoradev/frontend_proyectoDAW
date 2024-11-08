import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-ofertante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-ofertante.component.html',
  styleUrl: './registro-ofertante.component.css'
})
export class RegistroOfertanteComponent {
  oferta = {
    experiencia: '',
    certificacion: '',
    valoracion: null,
  };
}

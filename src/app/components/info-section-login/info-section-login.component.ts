import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-section-login',
  standalone: true,
  // Eliminamos HttpClientModule de los imports
  imports: [CommonModule],
  templateUrl: './info-section-login.component.html',
  styleUrls: ['./info-section-login.component.css']
})
export class InfoSectionLoginComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isImageRight: boolean = false;
}

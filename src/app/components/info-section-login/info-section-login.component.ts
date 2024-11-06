import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-info-section-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './info-section-login.component.html',
  styleUrls: ['./info-section-login.component.css']
})
export class InfoSectionLoginComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() isImageRight: boolean = false;
}

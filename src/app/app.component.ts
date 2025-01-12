import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacionComponent } from './components/menu-navegacion/menu-navegacion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavegacionComponent, FormsModule, HttpClientModule, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adbenturFront';
}

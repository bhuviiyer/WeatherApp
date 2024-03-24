import { Component } from '@angular/core';
import { CityService } from './service/city/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';

  constructor(private cityService:CityService){
  }

  resetToHome() {
    this.cityService.resetToHome();
  }
}

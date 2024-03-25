// city-tab.component.ts
import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city/city.service'

@Component({
  selector: 'app-city-tab',
  templateUrl: './city-tab.component.html',
  styleUrls: ['./city-tab.component.css']
})
export class CityTabComponent implements OnInit {
  cities : any[] = [];
  currentCity: any = null;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.getStaticCities().subscribe(cities => {
      this.cities = cities;
      this.selectCity(cities[0]);
      this.cityService.setCurrentCity(this.currentCity);
    });

    this.cityService.getCurrentCity().subscribe(city => {
      this.currentCity = city;
    });
  }

  selectCity(city: any) {
    this.cityService.setCurrentCity(city);
    this.currentCity = city;
  }
}

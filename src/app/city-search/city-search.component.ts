import { CityService } from './../service/city/city.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {
  searchQuery: string = '';

  constructor(private cityService: CityService) {}

  searchCity(): void {
    if (this.searchQuery) {
      this.cityService.getDataForCity(this.searchQuery).subscribe(data => {
        if (data && data.length > 0) {
          this.cityService.setStaticCities([data[0]]);
          const searchedCity = {
            ...data[0],
            coord: {
              lat: data[0].lat,
              lon: data[0].lon
            },
            name: data[0]?.city_name
          };
          this.cityService.setCurrentCity(searchedCity);
        } else {
          this.cityService.setCurrentCity(null);
        }
      });
    }
  }
}

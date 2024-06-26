import { CityService } from './../service/city/city.service';
import { WeatherService } from '../service/weather/weather.service';
import { Component, Input,OnChanges,OnInit,SimpleChanges,output } from '@angular/core';
import { WeatherHour } from '../interface/weather-hour.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit{
  @Input() city: any = null;
  weather?: { hourly: WeatherHour[] };
  forecast: any = null;
  filteredWeather?:  { hourly: WeatherHour[] };
  subscription?: Subscription;
  counter: number = 0;

  constructor(private weatherService: WeatherService,private cityService: CityService){}

  ngOnInit() {
    this.subscription = this.cityService.getCurrentCity().subscribe(city => {
      if (city) {
          this.getWeather();
          this.getForecast();
        }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city']) {
      this.getWeather();
      this.getForecast();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  getWeather(): void {
    const lat = this.city?.coord?.lat;
    const lon = this.city?.coord?.lon;
    if(this.city){
      this.weatherService.getWeather(lat,lon).subscribe(data=>{
        this.weather = data;
        this.filterHourlyData();
      })
    }
    else {
      this.weather = undefined;
      this.filteredWeather = undefined;
    }
  }

  filterHourlyData(): void {
    const cutoffHour = 23;
    if (this.weather && this.weather.hourly) {
      this.filteredWeather = { hourly: this.weather.hourly.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        const today = new Date();
        return itemDate.getUTCHours() <= cutoffHour && itemDate.getDate() == today.getDate();
      })};
    }
  }


  getForecast(): void {
    const lat = this.city?.coord?.lat;
    const lon = this.city?.coord?.lon;
    if(this.city){
      this.weatherService.getForecast(lat,lon).subscribe(data=>{
        this.forecast = data;
        this.processForecastData();
      })
    }
    else{
      this.forecast = null;
    }
  }

  processForecastData(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.forecast && this.forecast.daily) {
        const updatedDaily = this.forecast.daily.filter((day: { dt: number }) => {
            const dayDate = new Date(day.dt * 1000);
            return dayDate.getDate() > today.getDate();
        });
        this.forecast = { ...this.forecast, daily: updatedDaily.slice(0,5)};
    }
  }


  getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
}

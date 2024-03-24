import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import mockWeatherData from '../../../assets/mocks/mockWeatherData.json'
import mockForecastData from '../../../assets/mocks/mockForecastData.json'
import { environment } from '../../../environments/environment'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl: string = 'https://api.openweathermap.org/data/2.5/onecall';
  private apiKey: string = "482944e26d320a80bd5e4f23b3de7d1f"
  constructor(private http: HttpClient) { }
  getWeather(lat: number,lon: number): Observable<any> {
    if (environment.testing) {
      const filteredData = mockWeatherData.find(entry => entry.lat === lat && entry.lon === lon);
      console.log("The test data is:" + filteredData)
      return of(filteredData ? filteredData : null);
    }
    else{
      const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${this.apiKey}`;
      return this.http.get(url);
    }
  }

  getForecast(lat: number,lon: number): Observable<any> {
    if (environment.testing) {
      const filteredForecastData = mockForecastData.find(entry => entry.lat === lat && entry.lon === lon);
      console.log("The test data is:" + filteredForecastData)
      return of(filteredForecastData ? filteredForecastData : null);
    }
    else
    {
      const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${this.apiKey}`;
      return this.http.get(url);
    }
  }
}

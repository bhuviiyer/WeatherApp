import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWeather should return expected weather data', () => {
    const dummyWeatherData = {
      coord: { lat: 35, lon: 139 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
    };

    service.getWeather(35, 139).subscribe(data => {
      expect(data.coord.lat).toEqual(35);
      expect(data.coord.lon).toEqual(139);
      expect(data.weather[0].main).toEqual('Clear');
    });

    const req = httpTestingController.expectOne(req => req.url.includes('onecall'));
    expect(req.request.method).toEqual('GET');
    req.flush(dummyWeatherData);
  });

  it('getForecast should return expected forecast data', () => {
    const dummyForecastData = {
      daily: [
        { dt: 1605285600, temp: { day: 304.15 }, weather: [{ description: 'light rain' }] },
      ],
    };

    service.getForecast(35, 139).subscribe(data => {
      expect(data.daily.length).toBeGreaterThan(0);
      expect(data.daily[0].temp.day).toEqual(304.15);
    });

    const req = httpTestingController.expectOne(req => req.url.includes('onecall'));
    expect(req.request.method).toEqual('GET');
    req.flush(dummyForecastData);
  });

});

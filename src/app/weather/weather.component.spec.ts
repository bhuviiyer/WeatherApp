import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../service/weather/weather.service';
import { CityService } from '../service/city/city.service';
import mockDataWeather from '../../assets/mocks/mockWeatherData.json';
import mockDataForecast from '../../assets/mocks/mockForecastData.json';
import mockCityData from '../../assets/mocks/mockCityData.json';
import { of } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;
  let cityService: CityService;
  let mockCityService: jasmine.SpyObj<CityService>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;
  

  beforeEach(async () => {
    mockCityService = jasmine.createSpyObj('CityService', ['getCurrentCity']);
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather', 'getForecast']);

    mockWeatherService.getWeather.and.returnValue(of({mockDataWeather}));
    mockWeatherService.getForecast.and.returnValue(of({mockDataForecast}));
    mockCityService.getCurrentCity.and.returnValue(of({mockCityData}));

    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CityService, useValue: mockCityService },
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(WeatherComponent);
    weatherService = TestBed.inject(WeatherService);
    cityService = TestBed.inject(CityService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

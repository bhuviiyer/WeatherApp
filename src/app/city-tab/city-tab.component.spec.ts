import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityTabComponent } from './city-tab.component';
import { CityService } from '../service/city/city.service';
import { of } from 'rxjs';

describe('CityTabComponent', () => {
  let component: CityTabComponent;
  let fixture: ComponentFixture<CityTabComponent>;
  let mockCityService: jasmine.SpyObj<CityService>;

  const mockCities = [
    { id: 1, name: 'City One', coord: { lat: 123, lon: 456 } },
    { id: 2, name: 'City Two', coord: { lat: 789, lon: 101 } }
  ];

  beforeEach(async () => {
    mockCityService = jasmine.createSpyObj('CityService', ['getStaticCities', 'getCurrentCity', 'setCurrentCity']);
    mockCityService.getStaticCities.and.returnValue(of(mockCities));
    mockCityService.getCurrentCity.and.returnValue(of(null)); // initially no city selected

    await TestBed.configureTestingModule({
      declarations: [ CityTabComponent ],
      providers: [
        { provide: CityService, useValue: mockCityService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load static cities on init', () => {
    expect(component.cities.length).toBe(2);
    expect(component.cities).toEqual(mockCities);
  });

  it('should update currentCity when a city is selected', () => {
    const mockCity = { id: 2, name: 'City Two', coord: { lat: 789, lon: 101 } };
    component.selectCity(mockCity);
    expect(mockCityService.setCurrentCity).toHaveBeenCalledWith(mockCity);
    expect(component.currentCity).toEqual(mockCity);
  });

  // it('should reset to static cities if searchedCity is selected again', () => {
  //   component.currentCity = mockCities[1];
  //   component.selectCity(mockCities[1]);
  //   expect(mockCityService.getStaticCities).toHaveBeenCalled();
  //   expect(component.cities).toEqual(mockCities);
  //   expect(component.searchedCity).toBeNull();
  // });
});

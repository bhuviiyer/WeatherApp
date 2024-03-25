import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CitySearchComponent } from './city-search.component';
import { CityService } from '../service/city/city.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let mockCityService: jasmine.SpyObj<CityService>;

  beforeEach(async () => {
    mockCityService = jasmine.createSpyObj('CityService', ['getDataForCity', 'setStaticCities', 'setCurrentCity']);
    await TestBed.configureTestingModule({
      declarations: [CitySearchComponent],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [   
         { provide: CityService, useValue: mockCityService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and set the city when searchCity is called with a valid city', () => {
    const mockData = [{
      city_name: 'Test City',
      lat: '123',
      lon: '456'
    }];
    
    mockCityService.getDataForCity.and.returnValue(of(mockData));
    component.searchQuery = 'Test City';
    component.searchCity();
    
    expect(mockCityService.getDataForCity).toHaveBeenCalledWith('Test City');
    expect(mockCityService.setStaticCities).toHaveBeenCalledWith([mockData[0]]);
    expect(mockCityService.setCurrentCity).toHaveBeenCalledWith({
      ...mockData[0],
      coord: { lat: mockData[0].lat, lon: mockData[0].lon },
      name: mockData[0].city_name
    });
  });

  
  it('should handle the case where the search query returns no cities', () => {
    mockCityService.getDataForCity.and.returnValue(of([]));
    component.searchQuery = 'Unknown City';
    component.searchCity();
    
    expect(mockCityService.getDataForCity).toHaveBeenCalledWith('Unknown City');
    expect(mockCityService.setCurrentCity).toHaveBeenCalledWith(null);
  });

  
});

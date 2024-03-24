import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CityService } from './service/city/city.service';
import { CitySearchComponent } from './city-search/city-search.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockCityService: jasmine.SpyObj<CityService>;
  let citySearchComponent: CitySearchComponent;

  beforeEach(async () => {
    mockCityService = jasmine.createSpyObj('CityService', ['resetToHome']);

    await TestBed.configureTestingModule({
      declarations: [ AppComponent, citySearchComponent ],
      providers: [{ provide: CityService, useValue: mockCityService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

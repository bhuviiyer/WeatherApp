import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CityService } from './city.service';
import * as Papa from 'papaparse';
import { take } from 'rxjs/operators';

describe('CityService', () => {
  let service: CityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityService]
    });

    service = TestBed.inject(CityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return static cities', (done: DoneFn) => {
    service.getStaticCities().pipe(take(1)).subscribe(cities => {
      expect(cities.length).toBe(3);
      expect(cities[0].name).toEqual('Rio de Janeiro');
      done();
    });
  });

  it('should set and get the current city', (done: DoneFn) => {
    const mockCity = { name: 'New City', coord: { lat: 123, lon: 456 } };
    service.setCurrentCity(mockCity);

    service.getCurrentCity().pipe(take(1)).subscribe(city => {
      expect(city).toEqual(mockCity);
      done();
    });
  });

  it('should reset to home correctly', (done: DoneFn) => {
    service.resetToHome();

    service.getCurrentCity().pipe(take(1)).subscribe(city => {
      expect(city).toBeNull();
      done();
    });
  });

  it('should fetch cities data from csv and filter by search query', (done: DoneFn) => {
    const mockResponse = `"city_name","lat","lon"\n"Test City",123,456`;
    const mockCSV = new Blob([mockResponse], { type: 'text/csv' });
    const mockURL = window.URL.createObjectURL(mockCSV);

    service.getDataForCity('Test').subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].city_name).toEqual('Test City');
      done();
    });

    const req = httpTestingController.expectOne('../../../assets/cities_20000.csv');
    expect(req.request.responseType).toEqual('text');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

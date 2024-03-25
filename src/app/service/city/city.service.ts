import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private currentCity = new BehaviorSubject<any>(null);
  private staticCities = new BehaviorSubject<any[]>([
    { id: 3451189, name: 'Rio de Janeiro', coord: { lon: -43.1729, lat: -22.9068 } },
    { id: 2038349, name: 'Beijing', coord: { lon: 116.4074, lat: 39.9042 } },
    { id: 5368361, name: 'Los Angeles', coord: { lon: -118.2437, lat: 34.0522 } }
  ]);

  constructor(private http: HttpClient) {}

  setCurrentCity(city: any): void {
    this.currentCity.next(city);
  }

  getCurrentCity(): Observable<any> {
    return this.currentCity.asObservable();
  }

  getStaticCities(): Observable<any[]> {
    return this.staticCities.asObservable();
  }

  setStaticCities(cities: any[]): void {
    this.staticCities.next(cities);
  }

  resetToHome(): void {
    this.setCurrentCity(this.staticCities.getValue()[0]); // Set the first city as the current city by default
  }

  getDataForCity(searchQuery: string): Observable<any[]> {
    return this.http.get('../../../assets/cities_20000.csv', { responseType: 'text' })
      .pipe(
        map(result => {
          let data: any[] = [];
          let filteredData: any[] = [];
          Papa.parse(result, {
            header: true,
            skipEmptyLines: true,
            complete: (results: { data: any[]; }) => {
              data = results.data;
            }
          });
          if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase().trim();
            filteredData = data.filter(item => item.city_name.toLowerCase().includes(lowerCaseQuery));
          } else {
            filteredData = data;
          }
          return filteredData;
        })
      );
  }
}

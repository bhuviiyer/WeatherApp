import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { CityTabComponent } from './city-tab/city-tab.component';
import { CustomDatePipe} from '../app/shared/pipes/custom-date.pipe';
import { CitySearchComponent } from './city-search/city-search.component';
import { FormsModule } from '@angular/forms';
import { CityService } from './service/city/city.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CityTabComponent,
    CitySearchComponent,
    CustomDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  exports: [
    CustomDatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

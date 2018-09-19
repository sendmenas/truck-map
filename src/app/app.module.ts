import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { TruckMapComponent } from './truck-map/truck-map.component';

import { AgmCoreModule } from '@agm/core';
import { SelectedTruckComponent } from './selected-truck/selected-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckListComponent,
    TruckMapComponent,
    SelectedTruckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDyt7xnxtI6jUPNVnXr8oDl8T84Jglntbc'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

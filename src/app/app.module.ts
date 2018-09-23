import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TruckFilter } from './filters/truckFilter.pipe';
import { TruckListComponent } from './components/truck-list/truck-list.component';
import { TruckMapComponent } from './components/truck-map/truck-map.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { SelectedTruckComponent } from './components/selected-truck/selected-truck.component';
import { TruckSelectionDialogComponent } from './components/truck-selection-dialog/truck-selection-dialog.component';
import { RouteDataComponent } from './components/route-data/route-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckFilter,
    TruckListComponent,
    TruckMapComponent,
    SelectedTruckComponent,
    TruckSelectionDialogComponent,
    RouteDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDyt7xnxtI6jUPNVnXr8oDl8T84Jglntbc'
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

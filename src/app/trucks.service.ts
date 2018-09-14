import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Truck } from './truck';
import { TRUCKS } from './mock-trucks';



@Injectable({
  providedIn: 'root'
})

export class TrucksService {
  selectedTruckComponent: any;

  setSelectedTruck(truck: Truck) {
    this.selectedTruckComponent.open(truck);
  }

  setSelectedTruckComponent(component) {
    this.selectedTruckComponent = component;
  }

  getTrucks(): Observable<Truck[]> {
    return of(TRUCKS);
  }
}

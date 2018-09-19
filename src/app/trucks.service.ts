import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Truck } from './truck';



@Injectable({
  providedIn: 'root'
})

export class TrucksService {
  trucks: Observable<Truck[]>;
  selectedTruck: Observable<Truck>;
  private _trucks: BehaviorSubject<Truck[]>;
  private _selectedTruck: BehaviorSubject<Truck>;
  private dataStore: {
    trucks: Truck[],
    selectedTruck: Truck
  };

  constructor(private http: HttpClient) {
    this.dataStore = {
      trucks: [],
      selectedTruck: null,
    };
    this._trucks = <BehaviorSubject<Truck[]>>new BehaviorSubject([]);
    this.trucks = this._trucks.asObservable();
    this._selectedTruck = <BehaviorSubject<Truck>>new BehaviorSubject(null);
    this.selectedTruck = this._selectedTruck.asObservable();
  }

  setSelectedTruck(truck: Truck) {
    this.dataStore.selectedTruck = truck;
    this._selectedTruck.next(Object.assign({}, this.dataStore).selectedTruck);
  }

  getTrucks() {
    this.http.get('https://raw.githubusercontent.com/sendmenas/truck-map/master/data.json').subscribe(data => {
      console.log(data);
      const truckArray: any = data;
      this.dataStore.trucks = truckArray;
      this._trucks.next(Object.assign({}, this.dataStore).trucks);
    });
  }

  clearSelectedTruck() {
    this.dataStore.selectedTruck = null;
    this._selectedTruck.next(Object.assign({}, this.dataStore).selectedTruck);
  }
}

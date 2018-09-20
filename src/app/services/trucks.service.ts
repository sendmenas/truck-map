import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Truck } from '../structures/truck';



@Injectable({
  providedIn: 'root'
})

export class TrucksService {
  trucks: Observable<Truck[]>;
  checkBoxTruckArray: Observable<Truck[]>;
  selectedTruck: Observable<Truck>;
  private _trucks: BehaviorSubject<Truck[]>;
  private _checkBoxTruckArray: BehaviorSubject<Truck[]>;
  private _selectedTruck: BehaviorSubject<Truck>;
  private dataStore: {
    trucks: Truck[],
    checkBoxTruckArray: Truck[],
    selectedTruck: Truck
  };

  constructor(private http: HttpClient) {
    this.dataStore = {
      trucks: [],
      checkBoxTruckArray: [],
      selectedTruck: null,
    };
    this._trucks = <BehaviorSubject<Truck[]>>new BehaviorSubject([]);
    this.trucks = this._trucks.asObservable();
    this._checkBoxTruckArray = <BehaviorSubject<Truck[]>>new BehaviorSubject([]);
    this.checkBoxTruckArray = this._checkBoxTruckArray.asObservable();
    this._selectedTruck = <BehaviorSubject<Truck>>new BehaviorSubject(null);
    this.selectedTruck = this._selectedTruck.asObservable();
  }

  setSelectedTruck(truck: Truck) {
    this.dataStore.selectedTruck = truck;
    this._selectedTruck.next(Object.assign({}, this.dataStore).selectedTruck);
  }

  clearSelectedTruck() {
    this.dataStore.selectedTruck = null;
    this._selectedTruck.next(Object.assign({}, this.dataStore).selectedTruck);
  }

  addTruckToCheckBoxArray(truck: Truck) {
    this.dataStore.checkBoxTruckArray.push(truck);
    this._checkBoxTruckArray.next(Object.assign({}, this.dataStore).checkBoxTruckArray);
    console.log(this.dataStore);
  }

  removeTruckFromCheckBoxArray(truck: Truck) {
    const itemIndex = this.dataStore.checkBoxTruckArray.findIndex(item => {
      return item === truck;
    });
    this.dataStore.checkBoxTruckArray.splice(itemIndex, 1);
    this._checkBoxTruckArray.next(Object.assign({}, this.dataStore).checkBoxTruckArray);
    console.log(this.dataStore);
  }

  getTrucks() {
    this.http.get('https://raw.githubusercontent.com/sendmenas/truck-map/master/data.json').subscribe(data => {
      const truckArray: any = data;
      this.dataStore.trucks = truckArray;
      this._trucks.next(Object.assign({}, this.dataStore).trucks);
    });
  }

}
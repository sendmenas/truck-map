import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Truck } from '../structures/truck';

@Injectable({
  providedIn: 'root'
})

export class TrucksService {
  private trucks: BehaviorSubject<Truck[]>;
  private selectedTruck: BehaviorSubject<Truck>;
  private checkBoxTruckArray: BehaviorSubject<Truck[]>;
  private _checkBoxTruckArray: Truck[];

  constructor(private http: HttpClient) {
    this.trucks = new BehaviorSubject([]);
    this.selectedTruck = new BehaviorSubject(null);
    this.checkBoxTruckArray = new BehaviorSubject([]);
    this._checkBoxTruckArray = [];
  }

  requestTrucksFromServer() {
    this.http.get('https://raw.githubusercontent.com/sendmenas/truck-map/master/data.json').subscribe(data => {
      const truckArray: any = data;
      this.trucks.next(truckArray);
    });
  }

  setSelectedTruck(truck: Truck) {
    this.selectedTruck.next(truck);
  }

  clearSelectedTruck() {
    this.selectedTruck.next(null);
  }

  addTruckToCheckBoxArray(truck: Truck) {
    this._checkBoxTruckArray.push(truck);
    this.checkBoxTruckArray.next(this._checkBoxTruckArray);
  }

  removeTruckFromCheckBoxArray(truck: Truck) {
    const itemIndex = this._checkBoxTruckArray.findIndex(item => {
      return item === truck;
    });
    this._checkBoxTruckArray.splice(itemIndex, 1);
    this.checkBoxTruckArray.next(this._checkBoxTruckArray);
  }

  getTrucks(): Observable<Truck[]> {
    return this.trucks.asObservable();
  }

  getSelectedTruck(): Observable<Truck> {
    return this.selectedTruck.asObservable();
  }

  getCheckedTrucks(): Observable<Truck[]> {
    return this.checkBoxTruckArray.asObservable();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { TrucksService } from '../trucks.service';
import { Observable } from 'rxjs';

import { Truck } from '../truck';


@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})

export class TruckListComponent implements OnInit {
  trucks: Observable<Truck[]>;

  constructor(private trucksService: TrucksService) { }

  onSelect(event, truck: Truck) {
    if (event.target.type !== 'checkbox') {
      this.trucksService.setSelectedTruck(truck);
    }
  }

  onCheckboxChange(event, truck: Truck) {
    if (event.target.checked) {
      this.trucksService.addTruckToCheckBoxArray(truck);
    } else {
      this.trucksService.removeTruckFromCheckBoxArray(truck);
    }
  }

  ngOnInit() {
    this.trucks = this.trucksService.trucks;
    this.trucksService.getTrucks();
  }

}

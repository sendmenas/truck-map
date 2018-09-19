import { Component, OnInit } from '@angular/core';
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

  onSelect(truck: Truck) {
    this.trucksService.setSelectedTruck(truck);
  }

  ngOnInit() {
    this.trucks = this.trucksService.trucks;
    this.trucksService.getTrucks();
  }

}

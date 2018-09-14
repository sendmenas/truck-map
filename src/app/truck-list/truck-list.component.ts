import { Component, OnInit } from '@angular/core';
import { TrucksService } from '../trucks.service';

import { Truck } from '../truck';


@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {
  trucks: Truck[];
  selectedTruck: Truck;

  constructor(private trucksService: TrucksService) { }

  getTrucks(): void {
    this.trucksService.getTrucks().subscribe(trucks => this.trucks =  trucks);
  }

  onSelect(truck: Truck) {
    this.trucksService.setSelectedTruck(truck);
  }

  ngOnInit() {
    this.getTrucks();
  }

}

import { Component, OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TrucksService } from '../trucks.service';

@Component({
  selector: 'app-selected-truck',
  templateUrl: './selected-truck.component.html',
  styleUrls: ['./selected-truck.component.css']
})

export class SelectedTruckComponent implements OnInit {
  selectedTruck: Truck;
  constructor(private trucksService: TrucksService) { }

  ngOnInit() {
    this.trucksService.setSelectedTruckComponent(this);
  }

  open(truck: Truck) {
    this.selectedTruck = truck;
  }

  close() {
    this.selectedTruck = null;
  }

}

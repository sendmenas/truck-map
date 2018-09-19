import { Component, OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TrucksService } from '../trucks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-truck',
  templateUrl: './selected-truck.component.html',
  styleUrls: ['./selected-truck.component.css']
})

export class SelectedTruckComponent implements OnInit {
  selectedTruck: Truck;
  constructor(private trucksService: TrucksService) { }

  ngOnInit() {
    this.trucksService.selectedTruck.forEach(truck => {
      this.selectedTruck = truck;
    });
  }

  close() {
    this.trucksService.clearSelectedTruck();
  }

}

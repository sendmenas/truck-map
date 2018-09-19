import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../truck';
import { TrucksService } from '../trucks.service';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
  styleUrls: ['./truck-map.component.css']
})

export class TruckMapComponent implements OnInit {
  selectedTruckImage: String = '../assets/truck.png';
  checkBoxTruckImage: String = '../assets/truck_dark.png';
  trucks: Observable<Truck[]>;
  selected: Boolean = false;
  lat: Number;
  lng: Number;

  constructor(private trucksService: TrucksService) { }

  ngOnInit() {
    this.trucks = this.trucksService.checkBoxTruckArray;

    this.trucksService.selectedTruck.forEach(truck => {
      if (truck != null) {
        this.lat = truck.latitude;
        this.lng = truck.longitude;
        this.selected = true;
      } else {
        this.selected = false;
      }
    });

    navigator.geolocation.getCurrentPosition(locationData => {
      console.log(locationData);
      this.lat = locationData.coords.latitude;
      this.lng = locationData.coords.longitude;
    });
  }

}

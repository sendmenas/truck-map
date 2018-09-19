import { Component, OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TrucksService } from '../trucks.service';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
  styleUrls: ['./truck-map.component.css']
})

export class TruckMapComponent implements OnInit {
  lat: Number;
  lng: Number;

  constructor(private trucksService: TrucksService) { }

  ngOnInit() {
    this.trucksService.selectedTruck.forEach(truck => {
      if (truck != null) {
        this.lat = truck.latitude;
        this.lng = truck.longitude;
      }
    });

    navigator.geolocation.getCurrentPosition(locationData => {
      console.log(locationData);
      this.lat = locationData.coords.latitude;
      this.lng = locationData.coords.longitude;
    });
  }

}

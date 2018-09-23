import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../structures/truck';
import { TrucksService } from '../../services/trucks.service';
import { MapDataManagerService } from '../../services/map-data.service';
import { RouteRequest } from '../../structures/routeRequest';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
})

export class TruckMapComponent implements OnInit {
  directionService: any;
  selectedTruckImage: String = '../assets/truck.png';
  checkBoxTruckImage: String = '../assets/truck_dark.png';
  trucks: Truck[];
  selected: Boolean = false;
  selectedTruck: Truck;
  lat: Number;
  lng: Number;
  origin: {
    lat: Number,
    lng: Number
  };
  destination: {
    lat: Number,
    lng: Number
  };

  constructor(
    private trucksService: TrucksService,
    private mapDataService: MapDataManagerService,
  ) { }

  ngOnInit() {
    this.trucksService.getCheckedTrucks().subscribe((trucks: Truck[]) => {
      this.trucks = trucks;
    });

    this.mapDataService.getRoute().subscribe((data: RouteRequest) => {
      if (data != null) {
        if (this.origin != null || this.destination != null) {
          this.lat = null;
          this.lng = null;
          this.origin = null;
          this.destination = null;
        }
        setTimeout(() => {
          this.origin = data.origin;
          this.destination = data.destination;
          this.lat = data.origin.lat;
          this.lng = data.origin.lng;
        }, 100);
      } else {
        if (this.selectedTruck != null) {
          this.lat = null;
          this.lng = null;
          this.origin = null;
          this.destination = null;
          setTimeout(() => {
            this.lat = this.selectedTruck.latitude;
            this.lng = this.selectedTruck.longitude;
          }, 100);
        }
      }
    });

    this.trucksService.getSelectedTruck().subscribe(truck => {
      if (truck != null) {
        this.selectedTruck = truck;
        this.lat = truck.latitude;
        this.lng = truck.longitude;
        this.selected = true;
      } else {
        this.selected = false;
      }
    });

    navigator.geolocation.getCurrentPosition(locationData => {
      this.lat = locationData.coords.latitude;
      this.lng = locationData.coords.longitude;
    });
  }

}

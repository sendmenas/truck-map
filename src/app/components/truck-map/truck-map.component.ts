import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../../structures/truck';
import { TrucksService } from '../../services/trucks.service';
import { MapDataManagerService } from '../../services/map-data-manager.service';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
  styleUrls: ['./truck-map.component.css']
})

export class TruckMapComponent implements OnInit {
  directionService: any;
  selectedTruckImage: String = '../assets/truck.png';
  checkBoxTruckImage: String = '../assets/truck_dark.png';
  trucks: Observable<Truck[]>;
  selected: Boolean = false;
  lat: Number;
  lng: Number;
  origin: any;
  destination: any;

  constructor(
    private trucksService: TrucksService,
    private mapDataService: MapDataManagerService,
  ) { }

  ngOnInit() {
    this.trucks = this.trucksService.checkBoxTruckArray;

    this.mapDataService.requestData.forEach(data => {
      if (data !== null) {
        this.origin = data.origin;
        this.destination = data.destination;
      }
    });

    this.mapDataService.getRoute({
      origin: {
        lat: 54.663124,
        lng: 25.239654,
      },
      destination: {
        lat: 55.916804,
        lng: 21.071383,
      },
      travelMode: 'DRIVING',
    });

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

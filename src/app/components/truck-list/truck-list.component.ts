import { Component, OnInit } from '@angular/core';
import { TrucksService } from '../../services/trucks.service';
import { Observable } from 'rxjs';

import { Truck } from '../../structures/truck';
import { MapDataManagerService } from '../../services/map-data.service';


@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
})

export class TruckListComponent implements OnInit {
  trucks: Truck[];

  constructor(
    private trucksService: TrucksService,
    private mapService: MapDataManagerService
  ) { }

  onSelect(event, truck: Truck) {
    if (event.target.type !== 'checkbox') {
      this.trucksService.setSelectedTruck(truck);
    }
    this.mapService.setOrigin(truck);
  }

  onCheckboxChange(event, truck: Truck) {
    if (event.target.checked) {
      this.trucksService.addTruckToCheckBoxArray(truck);
    } else {
      this.trucksService.removeTruckFromCheckBoxArray(truck);
    }
  }

  ngOnInit() {
    this.trucksService.getTrucks().subscribe(trucks => {
      this.trucks = trucks;
    });
    this.trucksService.requestTrucksFromServer();
  }

}

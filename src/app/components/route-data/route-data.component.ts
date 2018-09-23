import { Component, OnInit } from '@angular/core';
import { MapDataManagerService } from '../../services/map-data.service';

@Component({
  selector: 'app-route-data',
  templateUrl: './route-data.component.html',
})
export class RouteDataComponent implements OnInit {
  routeDataReady: Boolean = false;
  routeData: any = null;

  constructor(private mapDataService: MapDataManagerService) { }

  ngOnInit() {
    this.mapDataService.getRouteData().subscribe(data => {
      if (data != null) {
        this.routeData = data.routes[0].legs[0];
        this.routeDataReady = true;
      } else {
        this.routeData = null;
        this.routeDataReady = false;
      }
    });
  }

  close() {
    this.routeDataReady = false;
    this.mapDataService.clearRoute();
  }

}

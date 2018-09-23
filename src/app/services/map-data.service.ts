import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { RouteRequest } from '../structures/routeRequest';
import { Observable, BehaviorSubject } from 'rxjs';
import { Truck } from '../structures/truck';

declare let google: any;

@Injectable({
  providedIn: 'root'
})

export class MapDataManagerService {
  private directionService: any;
  private routeRequest: RouteRequest;
  private routeDataReady: Boolean;
  private _requestData: BehaviorSubject<RouteRequest>;
  private _routeData: BehaviorSubject<RouteRequest>;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.routeRequest = {
      origin: {
        lat: null,
        lng: null,
      },
      destination: {
        lat: null,
        lng: null,
      },
      travelMode: 'DRIVING'
    };
    this._requestData = new BehaviorSubject(null);
    this._routeData = new BehaviorSubject(null);
  }

  setOrigin(truck: Truck) {
    this.routeRequest.origin.lat = truck.latitude;
    this.routeRequest.origin.lng = truck.longitude;
  }

  setDestination(truck: Truck) {
    this.routeRequest.destination.lat = truck.latitude;
    this.routeRequest.destination.lng = truck.longitude;
    this._requestData.next(this.routeRequest);
    this.routeDataReady = true;
    this.getRoute();
  }

  getRoute(): Observable<RouteRequest> {
    this.getRouteDataFromGoogle(this.routeRequest);
    return this._requestData.asObservable();
  }

  private getRouteDataFromGoogle(data: RouteRequest) {
    if (this.routeDataReady) {
      this.mapsAPILoader.load().then(() => {
        this.directionService = new google.maps.DirectionsService();
        this.directionService.route(data, (result, status) => {
          if (status === 'OK') {
            this._routeData.next(result);
          }
        });
      });
    }
  }

  getRouteData(): Observable<any> {
    return this._routeData.asObservable();
  }

  clearRoute() {
    this._requestData.next(null);
  }
}

import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { RouteRequest } from '../structures/routeRequest';
import { Observable, BehaviorSubject } from 'rxjs';

declare let google: any;

@Injectable({
  providedIn: 'root'
})

export class MapDataManagerService {
  requestData: Observable<RouteRequest>;
  routeRequested: Observable<Boolean>;
  routeData: Observable<any>;
  private _directionService: any;
  private _requestData: BehaviorSubject<RouteRequest>;
  private _routeRequested: BehaviorSubject<Boolean>;
  private _routeData: BehaviorSubject<any>;
  private dataStore: {
    requestData: RouteRequest,
    routeRequested: Boolean,
    routeData: any,
  };

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.dataStore = {
      requestData: null,
      routeRequested: false,
      routeData: null,
    };
    this._requestData = <BehaviorSubject<RouteRequest>>new BehaviorSubject(null);
    this.requestData = this._requestData.asObservable();
    this._routeRequested = <BehaviorSubject<Boolean>>new BehaviorSubject(false);
    this.routeRequested = this._routeRequested.asObservable();
    this._routeData = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.routeData = this._routeData.asObservable();
  }

  getRoute(data: RouteRequest) {
    this.mapsAPILoader.load().then(() => {
      this._directionService = new google.maps.DirectionsService();
      this._directionService.route(data, (result, status) => {
        if (status === 'OK') {
          console.log(result);
          this.dataStore.requestData = data;
          this._requestData.next(Object.assign({}, this.dataStore).requestData);
          this.dataStore.routeRequested = true;
          this._routeRequested.next(Object.assign({}, this.dataStore).routeRequested);
          this.dataStore.routeData = result;
          this._routeData.next(Object.assign({}, this.dataStore).routeData);
        }
      });
    });
  }

  clearRoute() {
    this.dataStore.routeRequested = false;
    this._routeRequested.next(Object.assign({}, this.dataStore).routeRequested);
    this.dataStore.routeData = null;
    this._routeData.next(Object.assign({}, this.dataStore).routeData);
  }
}

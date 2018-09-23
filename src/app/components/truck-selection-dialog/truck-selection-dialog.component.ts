import { Component, OnInit } from '@angular/core';
import { Truck } from '../../structures/truck';
import { TrucksService } from '../../services/trucks.service';
import { DialogsService } from '../../services/dialogs.service';
import { MapDataManagerService } from '../../services/map-data.service';

@Component({
  selector: 'app-truck-selection-dialog',
  templateUrl: './truck-selection-dialog.component.html',
})
export class TruckSelectionDialogComponent implements OnInit {
  trucks: Truck[];
  display: Boolean = false;

  constructor(
    private trucksService: TrucksService,
    private dialogService: DialogsService,
    private mapService: MapDataManagerService
  ) { }

  ngOnInit() {
    this.trucksService.getTrucks().subscribe(trucks => {
      this.trucks = trucks;
    });
    this.dialogService.getTruckSelectionDialogStatus().subscribe(value => {
      this.display = value;
    });
  }

  closeDialog() {
    this.dialogService.hideDialog();
  }

  truckSelected(truck: Truck) {
    this.mapService.setDestination(truck);
    this.closeDialog();
  }

}

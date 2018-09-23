import { Component, OnInit } from '@angular/core';
import { Truck } from '../../structures/truck';
import { TrucksService } from '../../services/trucks.service';
import { Observable } from 'rxjs';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-selected-truck',
  templateUrl: './selected-truck.component.html',
})

export class SelectedTruckComponent implements OnInit {
  selectedTruck: Truck;
  constructor(
    private trucksService: TrucksService,
    private dialogService: DialogsService
  ) { }

  ngOnInit() {
    this.trucksService.getSelectedTruck().subscribe(truck => {
      this.selectedTruck = truck;
    });
  }

  showTrucksList() {
    this.dialogService.displayDialog();
  }

  close() {
    this.trucksService.clearSelectedTruck();
  }

}

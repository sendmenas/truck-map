import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private displayTruckSelectionDialog: BehaviorSubject<boolean>;

  constructor() {
    this.displayTruckSelectionDialog = new BehaviorSubject<boolean>(false);
  }

  displayDialog() {
    this.displayTruckSelectionDialog.next(true);
  }

  hideDialog() {
    this.displayTruckSelectionDialog.next(false);
  }

  getTruckSelectionDialogStatus(): Observable<boolean> {
    return this.displayTruckSelectionDialog.asObservable();
  }
}

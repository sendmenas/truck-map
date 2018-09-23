import { Pipe, PipeTransform } from '@angular/core';
import { Truck } from '../structures/truck';

@Pipe({
    name: 'truckFilter'
})

export class TruckFilter implements PipeTransform {
    transform(items: Truck[], searchText: string): Truck[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLocaleLowerCase();

        return items.filter(truck => {
            return truck.driver.toLocaleLowerCase().indexOf(searchText) >= 0 || truck.plate.toLocaleLowerCase().indexOf(searchText) >= 0;
        });
    }
}

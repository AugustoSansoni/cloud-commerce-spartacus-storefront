import { Component, Input, OnInit } from '@angular/core';
import { StoreDataService } from '../../../services/store-data.service';

@Component({
  selector: 'y-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
  styleUrls: ['./store-finder-list-item.component.scss']
})
export class StoreFinderListItemComponent implements OnInit {
  @Input() location;

  constructor(private storeDataService: StoreDataService) {}

  ngOnInit() {}

  getDirections(location: any) {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeDataService.getStoreLatitude(location);
    const longitude = this.storeDataService.getStoreLongitude(location);
    window.open(google_map_url + latitude + ',' + longitude);
  }

  getClosingTime(location: any): Date {
    return this.storeDataService.getStoreClosingTime(location);
  }

  getOpeningTime(location: any): Date {
    return this.storeDataService.getStoreOpeningTime(location);
  }

  getCurrentDay(): string {
    return this.storeDataService.getCurrentDay();
  }

  isOpen(location: any): boolean {
    return this.storeDataService.isStoreOpen(location);
  }
}

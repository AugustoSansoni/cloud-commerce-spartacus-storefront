import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFinderListComponent implements OnInit {
  @Input() query;

  locations: any;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  @ViewChild('storeMap') storeMap: StoreFinderMapComponent;

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.store.select(fromStore.getAllStores).subscribe(locations => {
      this.locations = locations;
    });
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.query,
        searchConfig: this.searchConfig
      })
    );
  }

  centerStoreOnMapByIndex(index: number): void {
    this.storeMap.centerMap(
      this.locations.stores[index].geoPoint.latitude,
      this.locations.stores[index].geoPoint.longitude
    );
  }
}

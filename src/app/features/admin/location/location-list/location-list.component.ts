import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LocationService } from '../services/location.service';
import { LocationResponse } from '../models/location-response.model';
import { SortType } from '../models/sort-type.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {

  // Locations list
  locations$?: Observable<LocationResponse[]>;

  // Subscriptions
  private deleteSubscribtion?: Subscription
  private countSubscribtion?: Subscription

  // Filters and sort
  isFilterPanelVisible: boolean = false;
  filter: Record<string, any> = {};
  sort: Record<string, SortType> = {};

  // Pagination
  locationsCount?: number;
  currentPageNumber: number = 1;
  pageSize: number = 10;
  pagesCount?: number; 

  constructor (private locationService: LocationService) {}

  ngOnInit(): void {
    this.countSubscribtion = this.locationService.getLocationsCount(this.filter).subscribe({
      next: (value) => {
        this.locationsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.locations$ = this.getLocations();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.locationService.deleteLocationByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  onApply() : void {

    this.countSubscribtion?.unsubscribe();
    this.countSubscribtion = this.locationService.getLocationsCount(this.filter).subscribe({
      next: (value) => {
        this.locationsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.currentPageNumber = 1;
        this.locations$ = this.getLocations();
      },
      error: (error) => {
        alert(error.error);
      },
    });

    this.isFilterPanelVisible = false;
  }

  onFilterChange(key: string): void {
    const value = this.filter[key];
    
    if (value && value.trim() !== '') {
      this.filter[key] = value;
    } else {
      delete this.filter[key];
    }
  }

  onSortChange(key: string): void {
    const value = this.sort[key] as unknown as string; ;
  
    if(value === 'undefined') {
      delete this.sort[key];
    }
    if (value === '0') {
      this.sort[key] = SortType.Ascending;
    }
    if (value === '1') {
      this.sort[key] = SortType.Descending;
    }
  }

  getPage(pageNumber: number): void {

    this.currentPageNumber = pageNumber;
    this.locations$ = this.getLocations();
  }

  getPrevPage(): void {

    if (this.currentPageNumber - 1 < 1) {
      return;
    }

    this.currentPageNumber -= 1;
    this.locations$ = this.getLocations();
  }

  getNextPage(): void {

    if (!this.pagesCount || this.currentPageNumber + 1 > this.pagesCount) {
      return;
    }

    this.currentPageNumber += 1;
    this.locations$ = this.getLocations();
  }

  toggleFilterPanel(): void {
    this.isFilterPanelVisible = !this.isFilterPanelVisible;
  }

  getLocations(): Observable<LocationResponse[]> {
    return this.locationService.getLocations(this.filter, this.sort, this.currentPageNumber, this.pageSize);
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
    this.countSubscribtion?.unsubscribe();
  }
}
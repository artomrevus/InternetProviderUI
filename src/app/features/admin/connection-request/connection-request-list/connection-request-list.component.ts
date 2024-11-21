import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SortType } from '../models/sort-type.model';
import { ConnectionRequestResponse } from '../models/connection-request-response.model';
import { ConnectionRequestService } from '../services/connection-request.service';

@Component({
  selector: 'app-connection-request-list',
  templateUrl: './connection-request-list.component.html',
  styleUrls: ['./connection-request-list.component.css']
})
export class ConnectionRequestListComponent implements OnInit, OnDestroy {

  // Locations list
  connectionRequests$?: Observable<ConnectionRequestResponse[]>;

  // Subscriptions
  private deleteSubscribtion?: Subscription
  private countSubscribtion?: Subscription

  // Filters and sort
  isFilterPanelVisible: boolean = false;
  filter: Record<string, any> = {};
  sort: Record<string, SortType> = {};

  // Pagination
  connectionRequestsCount?: number;
  currentPageNumber: number = 1;
  pageSize: number = 10;
  pagesCount?: number; 

  constructor (private connectionRequestService: ConnectionRequestService) {}

  ngOnInit(): void {
    this.countSubscribtion = this.connectionRequestService.getConnectionRequestsCount(this.filter).subscribe({
      next: (value) => {
        this.connectionRequestsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.connectionRequests$ = this.getConnectionRequests();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.connectionRequestService.deleteConnectionRequestByID(id).subscribe({
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

    this.countSubscribtion = this.connectionRequestService.getConnectionRequestsCount(this.filter).subscribe({
      next: (value) => {
        this.connectionRequestsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.currentPageNumber = 1;
        this.connectionRequests$ = this.getConnectionRequests();
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
    this.connectionRequests$ = this.getConnectionRequests();
  }

  getPrevPage(): void {

    if (this.currentPageNumber - 1 < 1) {
      return;
    }

    this.currentPageNumber -= 1;
    this.connectionRequests$ = this.getConnectionRequests();
  }

  getNextPage(): void {

    if (!this.pagesCount || this.currentPageNumber + 1 > this.pagesCount) {
      return;
    }

    this.currentPageNumber += 1;
    this.connectionRequests$ = this.getConnectionRequests();
  }

  toggleFilterPanel(): void {
    this.isFilterPanelVisible = !this.isFilterPanelVisible;
  }

  getConnectionRequests(): Observable<ConnectionRequestResponse[]> {
    return this.connectionRequestService.getConnectionRequests(this.filter, this.sort, this.currentPageNumber, this.pageSize);
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
    this.countSubscribtion?.unsubscribe();
  }
}
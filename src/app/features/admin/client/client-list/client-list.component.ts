import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SortType } from '../models/sort-type.model';
import { ClientService } from '../services/client.service';
import { ClientResponse } from '../models/client-response.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  // Clients list
  clients$?: Observable<ClientResponse[]>;

  // Subscriptions
  private deleteSubscribtion?: Subscription
  private countSubscribtion?: Subscription

  // Filters and sort
  isFilterPanelVisible: boolean = false;
  filter: Record<string, any> = {};
  sort: Record<string, SortType> = {};

  // Pagination
  clientsCount?: number;
  currentPageNumber: number = 1;
  pageSize: number = 10;
  pagesCount?: number; 

  constructor (private clientService: ClientService) {}

  ngOnInit(): void {
    this.countSubscribtion = this.clientService.getClientsCount(this.filter).subscribe({
      next: (value) => {
        this.clientsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.clients$ = this.getClients();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.clientService.deleteClientByID(id).subscribe({
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

    this.countSubscribtion = this.clientService.getClientsCount(this.filter).subscribe({
      next: (value) => {
        this.clientsCount = value;
        this.pagesCount = Math.ceil(value / this.pageSize);
        this.currentPageNumber = 1;
        this.clients$ = this.getClients();
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
    this.clients$ = this.getClients();
  }

  getPrevPage(): void {

    if (this.currentPageNumber - 1 < 1) {
      return;
    }

    this.currentPageNumber -= 1;
    this.clients$ = this.getClients();
  }

  getNextPage(): void {

    if (!this.pagesCount || this.currentPageNumber + 1 > this.pagesCount) {
      return;
    }

    this.currentPageNumber += 1;
    this.clients$ = this.getClients();
  }

  toggleFilterPanel(): void {
    this.isFilterPanelVisible = !this.isFilterPanelVisible;
  }

  getClients(): Observable<ClientResponse[]> {
    return this.clientService.getClients(this.filter, this.sort, this.currentPageNumber, this.pageSize);
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
    this.countSubscribtion?.unsubscribe();
  }
}
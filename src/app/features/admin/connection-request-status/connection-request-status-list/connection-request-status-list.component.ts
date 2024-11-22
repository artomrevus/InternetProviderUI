import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConnectionRequestStatusService } from '../services/connection-request-status.service';
import { ConnectionRequestStatusResponse } from '../models/connection-request-status-response.model';

@Component({
  selector: 'app-connection-request-status-list',
  templateUrl: './connection-request-status-list.component.html',
  styleUrls: ['./connection-request-status-list.component.css']
})
export class ConnectionRequestStatusListComponent implements OnInit, OnDestroy {

  connectionRequestStatuses$?: Observable<ConnectionRequestStatusResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private connectionRequestStatusService: ConnectionRequestStatusService) {
  }

  ngOnInit(): void {
    this.connectionRequestStatuses$ = this.connectionRequestStatusService.getAllConnectionRequestStatuses();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.connectionRequestStatusService.deleteConnectionRequestStatusByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscribtion?.unsubscribe();
  }
}

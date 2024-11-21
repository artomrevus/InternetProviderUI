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
  private deleteConnectionRequestStatusSubscribtion?: Subscription 

  constructor (private connectionRequestStatusService: ConnectionRequestStatusService) {
  }

  ngOnInit(): void {
    this.connectionRequestStatuses$ = this.connectionRequestStatusService.getAllConnectionRequestStatuses();
  }

  onDelete(id: number): void {
    this.deleteConnectionRequestStatusSubscribtion = this.connectionRequestStatusService.deleteConnectionRequestStatusByID(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteConnectionRequestStatusSubscribtion?.unsubscribe();
  }
}

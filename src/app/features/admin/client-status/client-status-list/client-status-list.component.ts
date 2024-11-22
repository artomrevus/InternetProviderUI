import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientStatusResponse } from '../models/client-status-response.model';
import { Observable, Subscription } from 'rxjs';
import { ClientStatusService } from '../services/client-status.service';

@Component({
  selector: 'app-client-status-list',
  templateUrl: './client-status-list.component.html',
  styleUrls: ['./client-status-list.component.css']
})

export class ClientStatusListComponent implements OnInit, OnDestroy {

  clientStatuses$?: Observable<ClientStatusResponse[]>;
  private deleteSubscribtion?: Subscription 

  constructor (private clientStatusService: ClientStatusService) {
  }

  ngOnInit(): void {
    this.clientStatuses$ = this.clientStatusService.getAllClientStatuses();
  }

  onDelete(id: number): void {
    this.deleteSubscribtion = this.clientStatusService.deleteClientStatusByID(id).subscribe({
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

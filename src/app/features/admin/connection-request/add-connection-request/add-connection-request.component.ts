import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConnectionRequestRequest } from '../models/connection-request-request.model';
import { ConnectionRequestService } from '../services/connection-request.service';
import { ConnectionRequestStatusResponse } from '../../connection-request-status/models/connection-request-status-response.model';
import { TariffResponse } from '../../tariff/models/tariff-response.model';
import { ClientResponse } from '../../client/models/client-response.model';
import { ClientService } from '../../client/services/client.service';
import { TariffService } from '../../tariff/services/tariff.service';
import { ConnectionRequestStatusService } from '../../connection-request-status/services/connection-request-status.service';

@Component({
  selector: 'app-add-connection-request',
  templateUrl: './add-connection-request.component.html',
  styleUrls: ['./add-connection-request.component.css']
})
export class AddConnectionRequestComponent implements OnInit, OnDestroy {

  connectionRequestRequest: ConnectionRequestRequest;
  clients$?: Observable<ClientResponse[]>;
  tariffs$?: Observable<TariffResponse[]>;
  connectionRequestStatuses$?: Observable<ConnectionRequestStatusResponse[]>;

  private addSubscribtion?: Subscription 

  constructor (
    private connectionRequestService: ConnectionRequestService, 
    private clientService: ClientService, 
    private tariffService: TariffService,
    private connectionRequestStatusService: ConnectionRequestStatusService,
    private router: Router

    ) {
    this.connectionRequestRequest = {
      clientId: -1,
      internetTariffId: -1,
      internetConnectionRequestStatusId: -1,
      number: "",
    };
  }

  ngOnInit(): void {
    this.clients$ = this.clientService.getAllClients();
    this.tariffs$ = this.tariffService.getAllTariffs();
    this.connectionRequestStatuses$ = this.connectionRequestStatusService.getAllConnectionRequestStatuses();
  }

  onFormSubmit(): void {
    if (this.connectionRequestRequest.clientId === -1) {
      alert('Client is not specified.');
      return;
    }

    if (this.connectionRequestRequest.internetTariffId === -1) {
      alert('Tariff is not specified.');
      return;
    }

    if (this.connectionRequestRequest.internetConnectionRequestStatusId === -1) {
      alert('Connection request status is not specified.');
      return;
    }

    if (!this.connectionRequestRequest.number || this.connectionRequestRequest.number.trim() === '') {
      alert('Number is not specified.');
      return;
    }

    this.addSubscribtion = this.connectionRequestService.addConnectionRequest(this.connectionRequestRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/connection-requests');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.addSubscribtion?.unsubscribe();
  }
}
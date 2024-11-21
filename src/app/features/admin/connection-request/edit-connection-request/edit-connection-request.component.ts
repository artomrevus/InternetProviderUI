import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConnectionRequestResponse } from '../models/connection-request-response.model';
import { ConnectionRequestRequest } from '../models/connection-request-request.model';
import { ConnectionRequestService } from '../services/connection-request.service';
import { ConnectionRequestStatusService } from '../../connection-request-status/services/connection-request-status.service';
import { TariffService } from '../../tariff/services/tariff.service';
import { ClientService } from '../../client/services/client.service';
import { ConnectionRequestStatusResponse } from '../../connection-request-status/models/connection-request-status-response.model';
import { TariffResponse } from '../../tariff/models/tariff-response.model';
import { ClientResponse } from '../../client/models/client-response.model';

@Component({
  selector: 'app-edit-connection-request',
  templateUrl: './edit-connection-request.component.html',
  styleUrls: ['./edit-connection-request.component.css']
})
export class EditConnectionRequestComponent implements OnInit, OnDestroy {

  // Location / route id 
  id: number | null = null;

  // Location edit 
  connectionRequestResponse?: ConnectionRequestResponse 
  connectionRequestRequest: ConnectionRequestRequest 
  clients$?: Observable<ClientResponse[]>;
  tariffs$?: Observable<TariffResponse[]>;
  connectionRequestStatuses$?: Observable<ConnectionRequestStatusResponse[]>;

  // Subscriptions
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (
    private route: ActivatedRoute,
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
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.connectionRequestService.getConnectionRequestByID(this.id).subscribe({
            next: (response) => {
              this.connectionRequestResponse = response;
              this.connectionRequestRequest.number = response.number;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.clients$ = this.clientService.getAllClients();
          this.tariffs$ = this.tariffService.getAllTariffs();
          this.connectionRequestStatuses$ = this.connectionRequestStatusService.getAllConnectionRequestStatuses();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
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

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.connectionRequestService.updateConnectionRequest(this.id, this.connectionRequestRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/connection-requests');
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscribtion?.unsubscribe();
    this.updateSubscribtion?.unsubscribe();
  }
}
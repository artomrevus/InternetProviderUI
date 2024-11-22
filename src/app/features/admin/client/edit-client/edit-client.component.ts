import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClientStatusResponse } from '../../client-status/models/client-status-response.model';
import { LocationResponse } from '../../location/models/location-response.model';
import { ClientService } from '../services/client.service';
import { ClientResponse } from '../models/client-response.model';
import { ClientRequest } from '../models/client-reqest.model';
import { LocationService } from '../../location/services/location.service';
import { ClientStatusService } from '../../client-status/services/client-status.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {

  // Client / route id 
  id: number | null = null;

  // Client edit 
  clientResponse?: ClientResponse 
  clientRequest: ClientRequest 
  clientStatuses$?: Observable<ClientStatusResponse[]>;
  locations$?: Observable<LocationResponse[]>;

  // Subscriptions
  private paramsSubscribtion?: Subscription 
  private updateSubscribtion?: Subscription 

  constructor (
    private route: ActivatedRoute,
    private clientService: ClientService,
    private clientStatusService: ClientStatusService,
    private locationService: LocationService,
    private router: Router
    ) {
    this.clientRequest = {
      clientStatusId: -1,
      locationId: -1,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };
  }

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.clientService.getClientByID(this.id).subscribe({
            next: (response) => {
              this.clientResponse = response;
              this.clientRequest.firstName = response.firstName;
              this.clientRequest.lastName = response.lastName;
              this.clientRequest.phoneNumber = response.phoneNumber;
              this.clientRequest.email = response.email;
            },
            error: (error) => {
              alert(error.error);
            }
          });

          this.clientStatuses$ = this.clientStatusService.getAllClientStatuses();
          this.locations$ = this.locationService.getAllLocations();
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  onFormSubmit(): void {
    if (this.clientRequest.clientStatusId === -1) {
      alert('Client status is not specified.');
      return;
    }

    if (this.clientRequest.locationId === -1) {
      alert('Location is not specified.');
      return;
    }

    if (!this.clientRequest?.firstName || this.clientRequest?.firstName.trim() === '') {
      alert('First name is not specified.');
      return;
    }

    if (!this.clientRequest?.lastName || this.clientRequest?.lastName.trim() === '') {
      alert('Last name is not specified.');
      return;
    }

    if (!this.clientRequest?.phoneNumber || this.clientRequest?.phoneNumber.trim() === '') {
      alert('Phone number is not specified.');
      return;
    }

    if (!this.clientRequest?.email || this.clientRequest?.email.trim() === '') {
      alert('Email is not specified.');
      return;
    }

    if (this.id === null) {
      alert('Id is not provided.');
      return;
    }

    this.updateSubscribtion = this.clientService.updateClient(this.id, this.clientRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('admin/clients');
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
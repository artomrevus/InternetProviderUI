import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionRequestResponse } from '../../admin/connection-request/models/connection-request-response.model';
import { Observable, Subscription } from 'rxjs';
import { ConnectionRequestService } from '../../admin/connection-request/services/connection-request.service';
import { ClientLoginResponse } from '../auth/models/client-login-response.model';
import { ClientService } from '../../admin/client/services/client.service';
import { ClientAuthService } from '../auth/services/client-auth.service';

@Component({
  selector: 'app-client-connection-requests',
  templateUrl: './client-connection-requests.component.html',
  styleUrls: ['./client-connection-requests.component.css']
})
export class ClientConnectionRequestsComponent implements OnInit, OnDestroy {
  
  connectionRequests$?: Observable<ConnectionRequestResponse[]>;
  loginData?: ClientLoginResponse;

  private getClientSubscribtion?: Subscription;

  constructor( 
    private clientService: ClientService,
    private connectionRequestService: ConnectionRequestService,
    private clientAuthService: ClientAuthService
  ) {}

  ngOnInit(): void {
    this.loginData = this.clientAuthService.getSavedLoginData();

    if(this.loginData ) {
      this.getClientSubscribtion = this.clientService.getClientByID(this.loginData.clientId).subscribe({
        next: (clientResponse) => {
          this.connectionRequests$ = this.connectionRequestService.getConnectionRequests({
             "clientId":  clientResponse.id
          });
        },
        error: (error) => {
          alert(error); 
          console.log(error);
        },
      });
    } else {
      alert("Error while load profile data");
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Awaiting confirmation':
        return 'bg-warning text-dark';
      case 'In progress':
        return 'bg-info text-dark';
      case 'Completed':
        return 'bg-success text-white';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.getClientSubscribtion?.unsubscribe();
  }
}

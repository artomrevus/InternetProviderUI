import { Component, OnDestroy, OnInit } from '@angular/core';
import { TariffResponse } from '../../admin/tariff/models/tariff-response.model';
import { ClientLoginResponse } from '../auth/models/client-login-response.model';
import { ClientResponse } from '../../admin/client/models/client-response.model';
import { TariffService } from '../../admin/tariff/services/tariff.service';
import { ClientService } from '../../admin/client/services/client.service';
import { ClientAuthService } from '../auth/services/client-auth.service';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionRequestService } from '../../admin/connection-request/services/connection-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-connection-request',
  templateUrl: './new-connection-request.component.html',
  styleUrls: ['./new-connection-request.component.css']
})
export class NewConnectionRequestComponent implements OnInit, OnDestroy {
 
  id: number | null = null;
  tariff?: TariffResponse;
  loginData?: ClientLoginResponse;
  clientResponse?: ClientResponse;

  private getClientSubscribtion?: Subscription;
  private getTariffSubscribtion?: Subscription;
  private routeSubscribtion?: Subscription;
  private addSubscribtion?: Subscription;

  constructor(
    private tariffService: TariffService,
    private clientService: ClientService,
    private connectionRequestService: ConnectionRequestService,
    private clientAuthService: ClientAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginData = this.clientAuthService.getSavedLoginData();

    if(this.loginData ) {
      this.getClientSubscribtion = this.clientService.getClientByID(this.loginData.clientId).subscribe({
        next: (clientResponse) => {
          this.clientResponse = clientResponse;
        },
        error: (error) => {
          alert(error); 
          console.log(error);
        },
      });
    } else {
      alert("Error while load profile data");
    }

    this.routeSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        let paramId = params.get('id');
        this.id = paramId ? Number.parseInt(paramId) : null;

        if(this.id) {
          this.getTariffSubscribtion = this.tariffService.getTarifftByID(this.id).subscribe({
            next: (response) => {
              this.tariff = response;
            },
            error: (error) => {
              alert(error.error);
            }
          });
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  onSubmitRequestClick() : void {
    if(this.clientResponse && this.id) {
      const connectionRequestRequest = {
        clientId: this.clientResponse.id,
        internetTariffId: this.id,
        internetConnectionRequestStatusId: 1,
        number: uuidv4(),
      }

      this.addSubscribtion = this.connectionRequestService.addConnectionRequest(connectionRequestRequest).subscribe({
        next: () => {
          alert("Request submitted successfully!")
        },
        error: (error) => {
          alert(error); 
          console.log(error);
        },
      });
    } else {
      alert("Error occured!"); 
    }
  }

  ngOnDestroy(): void {
    this.addSubscribtion?.unsubscribe();
    this.getTariffSubscribtion?.unsubscribe();
    this.getClientSubscribtion?.unsubscribe();
    this.routeSubscribtion?.unsubscribe();
  }
}

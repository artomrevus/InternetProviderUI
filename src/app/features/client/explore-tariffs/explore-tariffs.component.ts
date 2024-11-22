import { Component, OnDestroy, OnInit } from '@angular/core';
import { TariffResponse } from '../../admin/tariff/models/tariff-response.model';
import { TariffService } from '../../admin/tariff/services/tariff.service';
import { ClientService } from '../../admin/client/services/client.service';
import { ClientAuthService } from '../auth/services/client-auth.service';
import { ClientLoginResponse } from '../auth/models/client-login-response.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore-tariffs',
  templateUrl: './explore-tariffs.component.html',
  styleUrls: ['./explore-tariffs.component.css']
})
export class ExploreTariffsComponent implements OnInit, OnDestroy {
  
  tariffs?: TariffResponse[];
  loginData?: ClientLoginResponse;

  private getClientSubscribtion?: Subscription;
  private getAllSubscribtion?: Subscription;

  constructor(
    private tariffService: TariffService,
    private clientService: ClientService,
    private clientAuthService: ClientAuthService,
  ) {}

  ngOnInit(): void {
    this.loginData = this.clientAuthService.getSavedLoginData();

    if(this.loginData ) {
      this.getClientSubscribtion = this.clientService.getClientByID(this.loginData.clientId).subscribe({
        next: (clientResponse) => {
          this.getAllSubscribtion = this.tariffService.getAllTariffs().subscribe({
            next: (response) => {
              this.tariffs = response.filter(t => t.internetTariffStatusName === "Active").filter(t => t.locationTypeName === clientResponse.locationTypeName);
            },
            error: (error) => {
              alert(error); 
              console.log(error);
            },
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

  ngOnDestroy(): void {
    this.getAllSubscribtion?.unsubscribe();
    this.getClientSubscribtion?.unsubscribe();
  }
}

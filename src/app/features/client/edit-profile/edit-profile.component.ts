import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientResponse } from '../../admin/client/models/client-response.model';
import { ClientLoginResponse } from '../auth/models/client-login-response.model';
import { ClientService } from '../../admin/client/services/client.service';
import { ClientAuthService } from '../auth/services/client-auth.service';
import { Router } from '@angular/router';
import { ClientRequest } from '../../admin/client/models/client-reqest.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  clientResponse?: ClientResponse;
  clientRequest: ClientRequest;
  loginData?: ClientLoginResponse;

  private getClientSubscribtion?: Subscription;
  private updateSubscribtion?: Subscription;

  constructor(
    private clientService: ClientService,
    private clientAuthService: ClientAuthService,
    private router: Router
  ) {
    this.clientRequest = {
      clientStatusId: -1,
      locationId: -1,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    }
  }

  ngOnInit(): void {
    this.loginData = this.clientAuthService.getSavedLoginData();

    if(this.loginData ) {
      this.getClientSubscribtion = this.clientService.getClientByID(this.loginData.clientId).subscribe({
        next: (response) => {
          this.clientResponse = response;
          this.clientRequest.firstName = response.firstName;
          this.clientRequest.lastName = response.lastName;
          this.clientRequest.email = response.email;
          this.clientRequest.phoneNumber = response.phoneNumber;
          this.clientRequest.clientStatusId = response.clientStatusId;
          this.clientRequest.locationId = response.locationId;
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

  onSubmit() {
    if (!this.clientRequest.firstName || this.clientRequest.firstName.trim().length < 2) {
      alert('First name length must be at least 2 characters.');
      return;
    }

    if (!this.clientRequest.lastName || this.clientRequest.lastName.trim().length < 2) {
      alert('Last name length must be at least 2 characters.');
      return;
    }

    if (!this.clientRequest.phoneNumber || !/^\+380[3-9][0-9]{8}$/.test(this.clientRequest.phoneNumber)) {
      alert('Phone number must me like "+380XXXXXXXXX".');
      return;
    }

    if (!this.clientRequest.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.clientRequest.email.trim())) {
      alert('Email is in incorrect format.');
      return;
    }

    if(this.clientResponse) {
      this.updateSubscribtion = this.clientService.updateClient(this.clientResponse.id, this.clientRequest).subscribe({
        next: (response) => {
          console.log(response);
          alert('Profile updated successfully!');
          this.router.navigateByUrl('/client/profile');
        },
        error: (error) => {
          alert(error); 
          console.log(error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.getClientSubscribtion?.unsubscribe();
    this.updateSubscribtion?.unsubscribe();
  }
}

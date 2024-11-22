import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../admin/client/services/client.service';
import { Router } from '@angular/router';
import { ClientResponse } from '../../admin/client/models/client-response.model';
import { ClientAuthService } from '../auth/services/client-auth.service';
import { ClientLoginResponse } from '../auth/models/client-login-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  clientResponse?: ClientResponse;
  loginData?: ClientLoginResponse;

  constructor(private clientService: ClientService, private clientAuthService: ClientAuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginData = this.clientAuthService.getSavedLoginData();

    if( this.loginData ) {
      this.clientService.getClientByID(this.loginData .clientId).subscribe({
        next: (response) => {
          this.clientResponse = response;
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
}

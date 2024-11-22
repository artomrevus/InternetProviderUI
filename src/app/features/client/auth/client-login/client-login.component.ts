import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientLoginRequest } from '../models/client-login-request.model';
import { ClientAuthService } from '../services/client-auth.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnDestroy {

  clientLoginRequest: ClientLoginRequest;
  private loginSubscribtion?: Subscription 

  constructor(private clientAuthService: ClientAuthService, private router: Router) {
    this.clientLoginRequest = {
      userName: "",
      password: "",
    };
  }

  onFormSubmit(): void {
    this.loginSubscribtion = this.clientAuthService.login(this.clientLoginRequest).subscribe({
      next: (response) => {
        this.clientAuthService.saveClientLoginResponse(response);
        this.router.navigateByUrl('/client/profile');
        console.log("Success.", response);
      },
      error: (error) => {
        alert("Login error.")
        console.warn(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.loginSubscribtion?.unsubscribe();
  }
}

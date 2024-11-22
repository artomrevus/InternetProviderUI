import { Component, OnDestroy } from '@angular/core';
import { AdminLoginRequest } from '../models/admin-login-request.model';
import { AdminAuthService } from '../services/admin-auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnDestroy {

  adminLoginRequest: AdminLoginRequest;
  private loginSubscribtion?: Subscription 

  constructor(private adminAuthService: AdminAuthService, private router: Router) {
    this.adminLoginRequest = {
      userName: "",
      password: "",
    };
  }

  onFormSubmit(): void {
    this.loginSubscribtion = this.adminAuthService.login(this.adminLoginRequest).subscribe({
      next: (response) => {
        this.adminAuthService.saveAdminLoginResponse(response);
        this.router.navigateByUrl('/admin/clients');
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

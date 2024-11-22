import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { AdminLoginResponse } from 'src/app/features/admin/auth/models/admin-login-response.model';
import { AdminAuthService } from 'src/app/features/admin/auth/services/admin-auth.service';
import { ClientLoginResponse } from '../client/auth/models/client-login-response.model';
import { ClientAuthService } from '../client/auth/services/client-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  adminLoginData?: AdminLoginResponse;
  clientLoginData?: ClientLoginResponse;

  private adminLoginResponseSubscribtion?: Subscription 
  private clientLoginResponseSubscribtion?: Subscription 

  constructor(private adminAuthService: AdminAuthService, private clientAuthService: ClientAuthService , private router: Router) {}

  ngOnInit(): void {
    this.adminLoginResponseSubscribtion = this.adminAuthService.getLoginDataBehaviorSubject().subscribe({
      next: (response) => {
        this.adminLoginData = response;
      },
      error: (error) => {
         alert(error);
      },
    });

    this.clientLoginResponseSubscribtion = this.clientAuthService.getLoginDataBehaviorSubject().subscribe({
      next: (response) => {
        this.clientLoginData = response;
      },
      error: (error) => {
         alert(error);
      },
    });

    this.adminLoginData = this.adminAuthService.getSavedLoginData();
    this.clientLoginData = this.clientAuthService.getSavedLoginData();
    this.validateUserData();
  }

  validateUserData() : void {
    if((!this.adminLoginData || !this.adminAuthService.isLoginDataSuitable(this.adminLoginData)) &&
      (!this.clientLoginData || !this.clientAuthService.isLoginDataSuitable(this.clientLoginData))
    ){
      this.adminAuthService.logout();
      this.clientAuthService.logout();
      return;
    }
  }

  onLogout(): void {
    this.adminAuthService.logout();
    this.clientAuthService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.adminLoginResponseSubscribtion?.unsubscribe();
    this.clientLoginResponseSubscribtion?.unsubscribe();
  }
}

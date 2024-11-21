import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminLoginResponse } from 'src/app/features/admin/auth/models/admin-login-response.model';
import { AdminAuthService } from 'src/app/features/admin/auth/services/admin-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  adminLoginData?: AdminLoginResponse;
  private adminLoginResponseSubscribtion?: Subscription 

  constructor(private adminAuthService: AdminAuthService, private router: Router) {}

  ngOnInit(): void {
    this.adminLoginResponseSubscribtion = this.adminAuthService.getLoginDataBehaviorSubject().subscribe({
      next: (response) => {
        this.adminLoginData = response;
      },
      error: (error) => {
         alert(error);
      },
    });
    
    this.adminLoginData = this.adminAuthService.getSavedLoginData();
    if(!this.adminLoginData || !this.adminAuthService.isLoginDataSuitable(this.adminLoginData)) {
      this.onLogout();
    }
  }

  onLogout(): void {
    this.adminAuthService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.adminLoginResponseSubscribtion?.unsubscribe();
  }
}

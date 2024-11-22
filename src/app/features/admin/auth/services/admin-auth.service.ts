import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLoginRequest } from '../models/admin-login-request.model';
import { environment } from 'src/environments/environment.development';
import { AdminLoginResponse } from '../models/admin-login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  $user = new BehaviorSubject<AdminLoginResponse | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(adminLoginRequest : AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`${environment.apiBaseUrl}/AdminAuth/login`, adminLoginRequest);
  }

  saveAdminLoginResponse(adminLoginResponse: AdminLoginResponse): void {
    // Save to browser
    localStorage.setItem('user-name' , adminLoginResponse.userName);
    localStorage.setItem('user-role' , adminLoginResponse.role);
    this.cookieService.set("Authorization", `Bearer ${adminLoginResponse.token}`, undefined, '/', undefined, true, 'Strict');

    // Update BehaviorSubject
    this.$user.next(adminLoginResponse);
  }

  getSavedLoginData(): AdminLoginResponse | undefined {
    // Get from browser
    const userName = localStorage.getItem('user-name');
    const role = localStorage.getItem('user-role');
    const token = this.cookieService.get('Authorization');

    // Return response obj
    if(userName && role) {
      return {
        userName: userName,
        role: role,
        token: token,
      }
    }

    return undefined;
  }

  isLoginDataSuitable(loginData: AdminLoginResponse) : boolean {
    let token = loginData.token;
    if(token) {
      // Decode jwt
      const decodedToken: any = jwtDecode(token.replace('Bearer ', ''));
  
      // Expiration and current date
      const expirationDate = decodedToken.exp;
      const currentDate = new Date().getSeconds();
  
      // Check is token not expired and role is Admin 
      if(expirationDate > currentDate && loginData.role === 'Admin') {
          return true;
      }
    }

    return false;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  getLoginDataBehaviorSubject() : Observable<AdminLoginResponse | undefined> {
    return this.$user.asObservable();
  }
}

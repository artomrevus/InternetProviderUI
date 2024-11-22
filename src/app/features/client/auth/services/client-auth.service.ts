import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ClientLoginResponse } from '../models/client-login-response.model';
import { ClientLoginRequest } from '../models/client-login-request.model';
import { ClientRegisterRequest } from '../models/client-register-request.model';
import { ClientRegisterResponse } from '../models/client-register-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {

  $user = new BehaviorSubject<ClientLoginResponse | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(clientLoginRequest : ClientLoginRequest): Observable<ClientLoginResponse> {
    return this.http.post<ClientLoginResponse>(`${environment.apiBaseUrl}/ClientAuth/login`, clientLoginRequest);
  }

  register(clientRegisterRequest : ClientRegisterRequest): Observable<ClientRegisterResponse> {
    return this.http.post<ClientRegisterResponse>(`${environment.apiBaseUrl}/ClientAuth/register`, clientRegisterRequest);
  }

  saveClientLoginResponse(clientLoginResponse: ClientLoginResponse): void {
    // Save to browser
    localStorage.setItem('user-name' , clientLoginResponse.userName);
    localStorage.setItem('user-role' , clientLoginResponse.role);
    localStorage.setItem('client-id' , JSON.stringify(clientLoginResponse.clientId));
    this.cookieService.set("Authorization", `Bearer ${clientLoginResponse.token}`, undefined, '/', undefined, true, 'Strict');

    // Update BehaviorSubject
    this.$user.next(clientLoginResponse);
  }

  getSavedLoginData(): ClientLoginResponse | undefined {
    // Get from browser
    const userName = localStorage.getItem('user-name');
    const role = localStorage.getItem('user-role');
    const clientId = localStorage.getItem('client-id');
    const token = this.cookieService.get('Authorization');

    // Return response obj
    if(userName && role && clientId) {
      return {
        userName: userName,
        role: role,
        token: token,
        clientId: JSON.parse(clientId),
      }
    }

    return undefined;
  }

  isLoginDataSuitable(loginData: ClientLoginResponse) : boolean {
    let token = loginData.token;
    if(token) {
      // Decode jwt
      const decodedToken: any = jwtDecode(token.replace('Bearer ', ''));
  
      // Expiration and current date
      const expirationDate = decodedToken.exp;
      const currentDate = new Date().getSeconds();
  
      // Check is token not expired and role is Admin 
      if(expirationDate > currentDate && loginData.role === 'Client') {
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

  getLoginDataBehaviorSubject() : Observable<ClientLoginResponse | undefined> {
    return this.$user.asObservable();
  }
}

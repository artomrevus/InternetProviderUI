import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientAuthService } from '../services/client-auth.service';

export const clientAuthGuard: CanActivateFn = (route, state) => {

  // Injections 
  const router = inject(Router);
  const clientAuthService = inject(ClientAuthService);

  // Saved login data 
  const loginData = clientAuthService.getSavedLoginData();

  // Check if suitable data
  if(loginData && clientAuthService.isLoginDataSuitable(loginData)) {
    return true;
  } else {
    alert('Unathorized');
    clientAuthService.logout();
    return router.createUrlTree(['/client/login']);
  }
};
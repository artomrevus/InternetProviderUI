import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  // Injections 
  const router = inject(Router);
  const adminAuthService = inject(AdminAuthService);

  // Saved login data 
  const adminLoginData = adminAuthService.getSavedLoginData();

  // Check if suitable data
  if(adminLoginData && adminAuthService.isLoginDataSuitable(adminLoginData)) {
    return true;
  } else {
    alert('Unathorized');
    adminAuthService.logout();
    return router.createUrlTree(['/admin/login']);
  }
};

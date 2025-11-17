import {CanActivateFn} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {inject} from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(OidcSecurityService);
  return authService.isAuthenticated();
};

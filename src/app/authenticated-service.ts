import {inject, Injectable, signal} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  isAuthenticated = signal<boolean>(false);
  authenticatedUserData = signal<any>(null);
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);

  constructor() {
    this.checkAuth();
  }

  checkAuth(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated, accessToken, userData}) => {
        this.isAuthenticated.set(isAuthenticated);
        this.authenticatedUserData.set(userData);
      });
  }

  getAccessToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }

  login(): void {
    this.oidcSecurityService.authorize();
    this.checkAuth();
  }

  refreshSession(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}

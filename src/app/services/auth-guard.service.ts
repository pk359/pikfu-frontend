import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { routePaths } from '../app-routing.module';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const accessToken = this.localStorageService.getItem('JWT_TOKEN');
    const isAuthPage = this.checkAuthPage(next.url.join(''))
    if (!!accessToken) {
      if (isAuthPage) {
        return false;
      }
      return true;
    }

    if (isAuthPage) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  checkAuthPage(nextUrl: string) {
    return nextUrl.includes(routePaths.loginPage) || nextUrl.includes(routePaths.registerPage);
  }
}

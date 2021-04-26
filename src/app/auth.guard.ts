import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import {
  AppService
} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    return this.checkToken();
  }

  checkToken(): boolean | Observable < boolean > {
    if (this.appService.checkCookie())
      return this.appService.checkTokenInService().pipe(
        tap(
          next => {},
          error => {
            this.router.navigate(['login'])
          },
          () => {}
        )
      )
    else {
      this.router.navigate(['login'])
      return false
    }

  }

}

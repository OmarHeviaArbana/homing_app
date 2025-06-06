import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducers';
import { AuthDTO } from 'src/app/Modules/Auth/models/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private access_token: string = '';
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select('auth').subscribe((auth) => {
      this.access_token = '';
      if (auth.access_token) {
        this.access_token = auth.access_token;
      }
    });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.access_token) {
      return true;
    }
    if (this.access_token) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}

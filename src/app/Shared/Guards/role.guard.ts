import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    private userRol: any;
    constructor(private router: Router, private store: Store<AppState>) {
      this.store.select('auth').subscribe((auth) => {

        this.userRol = '';
        if (auth.user) {
          this.userRol = auth.user?.role_id;
        }
      });
    }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log(this.userRol);


    if (this.userRol == 3 || this.userRol== 4) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Modules/Auth/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  userInitials: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.userInitials = '';
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      console.log(auth.user);


      if (auth.access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
      }

      if (auth.user) {
        this.userInitials = `${auth.user.name[0]}${auth.user.username[0]}`.toUpperCase();
      } else {
        this.userInitials = 'H.';
      }
    });
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    localStorage.removeItem('auth_homing')
    this.router.navigateByUrl('/');
  }
}



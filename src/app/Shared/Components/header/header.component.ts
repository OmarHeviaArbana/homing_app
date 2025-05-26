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
  isMenuOpen: Boolean;

  constructor(private router: Router, private store: Store<AppState>) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.userInitials = '';
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.showAuthSection = false;
      this.showNoAuthSection = true;

      if (auth.access_token ) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
        if (auth.user)  {
          this.userInitials = `${auth.user.name[0]}${auth.user.username[0]}`.toUpperCase();
        } else {
          this.userInitials = 'H.';
        }
      }

      if(!localStorage.getItem('auth_homing')) {
        this.showAuthSection = false;
        this.showNoAuthSection = true;
      }
    });
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    localStorage.removeItem('auth_homing')
    this.router.navigateByUrl('/');
  }



  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Modules/Auth/actions';
import { UserDTO } from 'src/app/Modules/Users/models/user.dto';

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
  rolUser: number | any;

  constructor(private router: Router, private store: Store<AppState>) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.userInitials = '';
    this.isMenuOpen = false;
    this.rolUser = 2;
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.showAuthSection = false;
      this.showNoAuthSection = true;

      if (auth.access_token ) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
        this.rolUser = auth.user?.role_id

        if (auth.user)  {
          this.userInitials = `${auth.user.name[0]}${auth.user.username[0]}`.toUpperCase();
        } else {
          this.userInitials = 'H.';
        }
      }
    });


  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    localStorage.removeItem('auth_homing')
    this.router.navigateByUrl('/');
  }

  goToProfile(): void {
    this.router.navigateByUrl('mi-perfil');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  goToAnimalManage(): void {
    this.router.navigateByUrl('gestion-mascotas');
  }


  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}



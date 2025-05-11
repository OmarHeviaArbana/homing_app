import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as AuthActions from './Modules/Auth/actions';
import { AuthDTO } from './Modules/Auth/models/auth.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'homing-app';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const authData = localStorage.getItem('auth_homing');
    if (authData) {
      const parsedData = JSON.parse(authData);
      const user = parsedData.user;
      const access_token = parsedData.access_token;

      this.store.dispatch(AuthActions.loginSuccess({
        user: user,
        access_token: access_token,
      }));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as AuthActions from './Modules/Auth/actions';
import { AuthDTO } from './Modules/Auth/models/auth.dto';
import { ApiAuthService } from './Shared/Services/api-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'homing-app';
  constructor(private store: Store<AppState>,private apiAuthService: ApiAuthService ) {}

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
    const token = localStorage.getItem('api_token');

    if (!token) {
      this.apiAuthService.apiLogin().subscribe({
        next: () => console.log('API token generado correctamente'),
        error: () => console.error('Fallo en el login del sistema')
      });
    }
  }
}

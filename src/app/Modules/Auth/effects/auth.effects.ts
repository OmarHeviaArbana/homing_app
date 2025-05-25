import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as AuthActions from '../actions';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.responseOK = false;
  }
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((userToken) => {
            this.responseOK = true;
            return AuthActions.loginSuccess({
              user: userToken.user,
              access_token: userToken.token
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.errorResponse = error.error?.errors || 'Error en el proceso de autenticación'
            return of(AuthActions.loginFailure({ payload: this.errorResponse }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('/');
            }
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map((action) => {
          this.responseOK = true;
          const userData = action.user;
          const accessToken = action.access_token;
          localStorage.setItem( 'auth_homing', JSON.stringify({ user: userData, access_token: accessToken }));
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload || 'Error en el proceso de autenticación';
          this.sharedService.managementToast('loginFeedback', this.responseOK, this.errorResponse);
        })
      ),
    { dispatch: false }
  );
}

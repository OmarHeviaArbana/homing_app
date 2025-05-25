import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, switchMap, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseError } from '../../../Shared/Services/shared.service';

@Injectable()
export class UserEffects {
  private responseOK: boolean;
  private errorResponse: any;
  shelterService: any;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
       private store: Store<AppState>,
  ) {
    this.responseOK = false;
  }

   register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map(userFromApi => {
            this.responseOK = true;
            return UserActions.registerSuccess({ user: userFromApi });
          }),
          catchError((error: HttpErrorResponse) => {

             this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };

            return of(UserActions.registerFailure({
              payload: this.errorResponse
            }));
          }),
          finalize(async () => {
            if (user.role_id == 2 && this.responseOK) {
              this.router.navigateByUrl('/login');
            }
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map((action) => {
          console.log(action);
          if(action.user.role_id  === 2) {
          const response = 'Registro a punto de finalizar. Haz login con las credenciales de usuario para finalizarlo.'
          this.sharedService.managementToast('registerFeedback', this.responseOK, response);
          }
          localStorage.removeItem('auth_homing');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
    ofType(UserActions.registerFailure),
    tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = 'El email de usuario ya está en uso. Por favor, elije otro email.',
          this.sharedService.managementToast('registerFeedback', this.responseOK, this.errorResponse);
        })
    ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess()),
          catchError((error: HttpErrorResponse )=> of(UserActions.deleteUserFailure({ payload: error.error})))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import * as AuthActions from './../../Auth/actions';
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


  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ userId, user }) =>

        this.userService.updateUser(userId, user).pipe(
          map((user) => {
            this.responseOK = true
            return UserActions.updateUserSuccess({
              userId: userId,
              user: user,
            });
          }),
          catchError((error) => {
            this.responseOK = false
            return of(UserActions.updateUserFailure({ payload: error }));
          }),
          finalize(async () => {

            this.errorResponse = 'Lo sentimos, algo ha salido mal. Vuelve a intentarlo',
            await this.sharedService.managementToast(
              'profileFeedback',
              this.responseOK,
              this.errorResponse
            );
            if(this.responseOK) {
              this.userService.getUserById(userId).subscribe({
              next: (fetchedUser) => {
                const token = JSON.parse(localStorage.getItem('auth_homing')  || '{}')
                if (token) {
                  this.store.dispatch(
                    AuthActions.loginSuccess({
                      user: fetchedUser,
                      access_token: token.access_token,
                    })
                  );
                }
              },
              error: (err) => {
                console.error('Error al refrescar el usuario tras actualizar:', err);
              }
            });

              this.router.navigateByUrl('/mi-perfil');
            }
          })
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.getUserById),
    switchMap(({ userId }) =>
      this.userService.getUserById(userId).pipe(
        map((user) => UserActions.getUserByIdSuccess({ user })),
        catchError((error) => of(UserActions.updateUserFailure({ payload: error })))
      )
    )
  )
);

/*   updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  ); */
  /* updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  ); */
}

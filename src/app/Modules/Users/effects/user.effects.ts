import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import * as ShelterActions from '../../Shelters/actions';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { saveShelterFormData } from '../../Shelters/actions/shelter.action';
import { AppState } from 'src/app/app.reducers';
import { ShelterDTO } from '../../Shelters/models/shelter.dto';

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
          catchError(error => {
            return of(UserActions.registerFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse);
            if (this.responseOK) {
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
          this.responseOK = true;
          console.log(action);
          localStorage.removeItem('auth_homing');
          /* const userData = action.user;
          localStorage.setItem( 'auth_homing', JSON.stringify({ user: userData })); */
        })
      ),
    { dispatch: false }
  );
  registerFailure$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.registerFailure),
   tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload;
          this.sharedService.managementToast('registerFeedback', this.responseOK, this.errorResponse);
        })
  ),
  { dispatch: false }
);
/* registerFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(UserActions.registerFailure),
      map((error) => {
      this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
      })
    ),
  { dispatch: false }
); */
/*   registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        map((error) => {
          console.log(error);

          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  ); */

  /* registerUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.register),
    switchMap(({ user }) =>
      this.userService.register(user).pipe(
        map(userFromApi => UserActions.registerSuccess({ user: userFromApi })),
        catchError(error => of(UserActions.registerFailure({ error })))
      )
    )
  )
); */

/* registerShelterAfterUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerSuccess),
      switchMap(({ user }) =>
        this.store.select(state => state.shelter.shelterFormData).pipe(
          // solo si role_id es 3 y shelterFormData existe
          filter(shelterFormData => user.role_id === 3 && !!shelterFormData),
          switchMap(shelterFormData => {
            const shelterToCreate = { ...shelterFormData, user_id: user.id };
            return this.shelterService.createShelter(shelterToCreate).pipe(
              map((shelter: ShelterDTO) => ShelterActions.createShelterSuccess({ shelter })),
              catchError(error => of(ShelterActions.createShelterFailure({ payload: error })))
            );
          })
        )
      )
    ),
    { dispatch: false }
  );
} */
}

import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';

import { AppState } from 'src/app/app.reducers';
import { ShelterService } from '../services/shelter.service';
import * as ShelterActions from './../actions';
import * as UserActions from '../../Users/actions';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ShelterEffects {
  private responseOK = false;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private shelterService: ShelterService,
    private store: Store<AppState>,
    private router: Router,
    private sharedService: SharedService
  ) {
    console.log("hola shelter effects")
  }

  registerShelterAfterUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerSuccess),
      withLatestFrom(this.store.select(state => state.shelter.shelterFormData)),
      tap(([action, shelterFormData]) => {
        console.log('Action completa:', action);
        console.log('Usuario en action:', action.user);
        console.log('ShelterFormData:', shelterFormData);
      }),
      switchMap(([action, shelterFormData]) => {
        // Validamos que tengamos el usuario y su ID

console.log('Id a registrar:', action.user.id);
const user = action.user.user
        const shelterToRegister = {
          ...shelterFormData,
          user_id: user?.id
        };

        console.log('Shelter a registrar:', shelterToRegister);

        return this.shelterService.createShelter(shelterToRegister).pipe(
          map((shelter) => ShelterActions.createShelterSuccess({ shelter })),
          catchError((error: HttpErrorResponse) => {
            return of(ShelterActions.createShelterFailure({ payload: error }));
          })
        );
      })
    )
  );

  redirectAfterShelterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShelterActions.createShelterSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
          this.sharedService.managementToast('registerFeedback', this.responseOK, this.errorResponse);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  registerShelterFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShelterActions.createShelterFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload;
          this.sharedService.managementToast('registerFeedback', this.responseOK, this.errorResponse);
        })
      ),
    { dispatch: false }
  );
}

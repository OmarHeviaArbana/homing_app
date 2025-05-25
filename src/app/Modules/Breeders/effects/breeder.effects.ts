import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';

import { AppState } from 'src/app/app.reducers';
import { BreederService } from '../services//breeder.service';
import * as BreederActions from './../actions';
import * as UserActions from '../../Users/actions';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BreederEffects {
  private responseOK = false;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private breederService: BreederService,
    private store: Store<AppState>,
    private router: Router,
    private sharedService: SharedService
  ) {}

  registerBreederAfterUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerSuccess),
      withLatestFrom(this.store.select(state => state.breeder.breederFormData)),
      filter(([action, breederFormData]) => action.user.user?.role_id == 4 && !!breederFormData),
      switchMap(([action, breederFormData]) => {
        const user = action.user.user
        const breederToRegister = {
          ...breederFormData,
          user_id: user?.id
        };
        return this.breederService.createBreeder(breederToRegister).pipe(
          map((breeder) => BreederActions.createBreederSuccess({ breeder })),
          catchError((error: HttpErrorResponse) => {
              this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };
            return of(BreederActions.createBreederFailure({ payload: this.errorResponse }));
          })
        );
      })
    )
  );

  redirectAfterBreederSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BreederActions.createBreederSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
          this.sharedService.managementToast('registerBreederFeedback', this.responseOK, this.errorResponse);
          this.store.dispatch(BreederActions.clearBreederFormData());
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  registerBreederFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BreederActions.createBreederFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload;
          this.sharedService.managementToast('registerBreederFeedback', this.responseOK, this.errorResponse);
        })
      ),
    { dispatch: false }
  );
}

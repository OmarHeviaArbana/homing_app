import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { BreederService } from '../services//breeder.service';
import * as BreederActions from './../actions';
import * as UserActions from '../../Users/actions';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { Router } from '@angular/router';


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

   getAllBreeder$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BreederActions.getAllBreeders),
        mergeMap(() =>
          this.breederService.getAllBreeders().pipe(
            map((breeders) => BreederActions.getAllBreedersSuccess({ breeders })),
            catchError((error) => of(BreederActions.getAllBreedersFailure({ error })))
          )
        )
      )
    );


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
          catchError((error, breeder) => {
              this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };
            return of(BreederActions.createBreederFailure({ error, breederToRegister}));
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
          const response = 'Registro a punto de finalizar. Haz login con las credenciales de usuario para finalizarlo'
          this.sharedService.managementToast('registerBreederFeedback', this.responseOK, response)
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
        switchMap(({ error, breederToRegister }) => {
          const failerBreeder = breederToRegister;
          const id = failerBreeder.user_id
          this.store.dispatch(UserActions.deleteUser({ id}));

          return of(
            this.responseOK = false,
            this.errorResponse = 'El nombre del Criadero ya está en uso. Por favor, elije otro nombre.',
            this.sharedService.managementToast('registerBreederFeedback', false, this.errorResponse)
          );
        })
      ),
    { dispatch: false }
  );
}

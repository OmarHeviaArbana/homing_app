import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap, mergeMap, exhaustMap, finalize } from 'rxjs/operators';
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

  getBreederById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreederActions.getBreederById),
          switchMap(({ breederId }) =>
        this.breederService.getBreederById(breederId).pipe(
          map((breederDetail) => BreederActions.getBreederByIdSuccess({ breederDetail })),
          catchError((error) => of(BreederActions.getBreederByIdFailure({ payload: error })))
        )
      )
    )
  );

  getAnimalsBreeder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreederActions.getAnimalsBreeder),
          switchMap(({ breederId }) =>
        this.breederService.getAnimalsBreeder(breederId).pipe(
          map((animalsBreeder) => BreederActions.getAnimalsBreederSuccess({ animalsBreeder })),
          catchError((error) => of(BreederActions.getAnimalsBreederFailure({ payload: error })))
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

  updateBreeder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BreederActions.updateBreeder),
      exhaustMap(({ breederId, breeder }) =>
        this.breederService.updateBreeder(breederId, breeder).pipe(
          map((breeder) => {
            this.responseOK = true;
            return BreederActions.updateBreederSuccess({
              breederId,
              breeder,
            });
          }),
          catchError((error) => {
            this.responseOK = false;
            return of(BreederActions.updateBreederFailure({ payload: error }));
          }),
          finalize(async () => {
            this.errorResponse = 'Lo sentimos, algo ha salido mal. Vuelve a intentarlo';
            await this.sharedService.managementToast(
              'profileFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.breederService.getBreederById(breederId).subscribe({
                next: (breederDetail) => {
                  this.store.dispatch(
                    BreederActions.getBreederByIdSuccess({ breederDetail })
                  );
                  this.router.navigateByUrl('/mi-perfil');
                },
                error: (err) => {
                  console.error('Error al refrescar el refugio tras actualizar:', err);
                },
              });
            }
          })
        )
      )
    )
  );
}

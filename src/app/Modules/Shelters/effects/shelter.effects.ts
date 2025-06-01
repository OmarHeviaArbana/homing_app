import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap, mergeMap, exhaustMap, finalize } from 'rxjs/operators';

import { AppState } from 'src/app/app.reducers';
import { ShelterService } from '../services/shelter.service';
import * as ShelterActions from './../actions';
import * as UserActions from '../../Users/actions';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ShelterEffects {
  private responseOK : boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private shelterService: ShelterService,
    private store: Store<AppState>,
    private router: Router,
    private sharedService: SharedService
  ) {
     this.responseOK = false;
  }

  getAllShelter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShelterActions.getAllShelters),
      mergeMap(() =>
        this.shelterService.getAllShelters().pipe(
          map((shelters) => ShelterActions.getAllSheltersSuccess({ shelters })),
          catchError((error) => of(ShelterActions.getAllSheltersFailure({ error })))
        )
      )
    )
  );

  getShelterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShelterActions.getShelterById),
          switchMap(({ shelterId }) =>
        this.shelterService.getShelterById(shelterId).pipe(
          map((shelterDetail) => ShelterActions.getShelterByIdSuccess({ shelterDetail })),
          catchError((error) => of(ShelterActions.getShelterByIdFailure({ payload: error })))
        )
      )
    )
  );

  getAnimalsShelter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShelterActions.getAnimalsShelter),
          switchMap(({ shelterId }) =>
        this.shelterService.getAnimalsShelter(shelterId).pipe(
          map((animalsShelter) => ShelterActions.getAnimalsShelterSuccess({ animalsShelter })),
          catchError((error) => of(ShelterActions.getAnimalsShelterFailure({ payload: error })))
        )
      )
    )
  );

  registerShelterAfterUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerSuccess),
      withLatestFrom(this.store.select(state => state.shelter.shelterFormData)),
      filter(([action, shelterFormData]) => action.user.user?.role_id == 3 && !!shelterFormData),
      switchMap(([action, shelterFormData]) => {
        const user = action.user.user
        const shelterToRegister = {
          ...shelterFormData,
          user_id: user?.id
        };
        return this.shelterService.createShelter(shelterToRegister).pipe(
          map((shelter) => ShelterActions.createShelterSuccess({ shelter })),
          catchError((error, shelter) => {
              this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };
              return of(ShelterActions.createShelterFailure({ error, shelterToRegister}));
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
           const response = 'Registro a punto de finalizar. Haz login con las credenciales de usuario para finalizarlo'
          this.sharedService.managementToast('registerShelterFeedback', this.responseOK, response)
          this.store.dispatch(ShelterActions.clearShelterFormData());
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  registerShelterFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShelterActions.createShelterFailure),
        switchMap(({ error, shelterToRegister }) => {
          const failerShelter = shelterToRegister;
          const id = failerShelter.user_id
          console.log(id);
          this.store.dispatch(UserActions.deleteUser({ id}));

          return of(
            this.responseOK = false,
            this.errorResponse = 'El nombre del Refugio ya está en uso. Por favor, elije otro nombre.',
            this.sharedService.managementToast('registerShelterFeedback', false, this.errorResponse)
          );
        })
      ),
    { dispatch: false }
  );

  updateShelter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShelterActions.updateShelter),
      exhaustMap(({ shelterId, shelter }) =>
        this.shelterService.updateShelter(shelterId, shelter).pipe(
          map((shelter) => {
            this.responseOK = true;
            return ShelterActions.updateShelterSuccess({
              shelterId,
              shelter,
            });
          }),
          catchError((error) => {
            this.responseOK = false;
            return of(ShelterActions.updateShelterFailure({ payload: error }));
          }),
          finalize(async () => {
            this.errorResponse = 'Lo sentimos, algo ha salido mal. Vuelve a intentarlo';
            await this.sharedService.managementToast(
              'profileFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.shelterService.getShelterById(shelterId).subscribe({
                next: (shelterDetail) => {
                  this.store.dispatch(
                    ShelterActions.getShelterByIdSuccess({ shelterDetail })
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

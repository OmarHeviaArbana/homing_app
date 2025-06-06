import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimalActions from '../actions/animal.action';
import { AnimalService } from '../services/animial.service'
import { catchError, exhaustMap, finalize, map, mergeMap, switchMap, tap, timeout, withLatestFrom } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { AnimalDTO } from '../models/animal.dto';
import { Location } from '@angular/common';

@Injectable()
export class AnimalEffects {

  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private animalService: AnimalService,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>,
    private location: Location,

  ) {
    this.responseOK = false;
  }

  getAllAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getAllAnimals),
      mergeMap(() =>
        this.animalService.getAllAnimals().pipe(
          map((animals) => AnimalActions.getAllAnimalsSuccess({ animals })),
          catchError((error) => of(AnimalActions.getAllAnimalsFailure({ error })))
        )
      )
    )
  );

 getAnimalById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getAnimalById),
         switchMap(({ animalId }) =>
        this.animalService.getAnimalById(animalId).pipe(
          map((animalDetail) => AnimalActions.getAnimalByIdSuccess({ animalDetail })),
          catchError((error) => of(AnimalActions.getAnimalByIdFailure({ payload: error })))
        )
      )
    )
  );

  getSpeciesAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getSpeciesAux),
      mergeMap(() =>
        this.animalService.getSpeciesAux().pipe(
          map((species) => AnimalActions.getSpeciesAuxSuccess({ species })),
          catchError((error) => of(AnimalActions.getSpeciesAuxFailure({ error })))
        )
      )
    )
  );

  getStatusAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getStatusAux),
      mergeMap(() =>
        this.animalService.getStatusAux().pipe(
          map(status => AnimalActions.getStatusAuxSuccess({ status })),
          catchError(error => of(AnimalActions.getStatusAuxFailure({ error })))
        )
      )
    )
  );

  createAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.createAnimal),
      exhaustMap(({ animal }) =>
        this.animalService.createAnimal(animal).pipe(
          map(animalFromApi => {
            this.responseOK = true;
            return AnimalActions.createAnimalSuccess({ animal: animalFromApi });
          }),
          catchError((error: HttpErrorResponse) => {

             this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };

            return of(AnimalActions.createAnimalFailure({
              payload: this.errorResponse
            }));
          }),
        )
      )
    )
  );

  createAnimalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.createAnimalSuccess),
        map((action) => {
          const response = 'Animal creado y publicado con éxito.'
          this.sharedService.managementToast('createAnimalSuccessFeedback', this.responseOK, response);
        })
      ),
    { dispatch: false }
  );

  createAnimalFailure$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AnimalActions.createAnimalFailure),
    tap(({ payload }) => {
          this.responseOK = false;
          console.log(payload);

          this.errorResponse =  payload ? payload.message : "Se ha producido un problema y no se creado ni publica la mascota. Vuelve a intentarlo"
          this.sharedService.managementToast('createAnimalFeedback', this.responseOK, this.errorResponse);
        })
    ),
    { dispatch: false }
  );

    updateAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.updateAnimal),
      exhaustMap(({ animal, animalId }) =>
        this.animalService.updateAnimal(animal, animalId).pipe(
          map(animalFromApi => {
            this.responseOK = true;
            return AnimalActions.updateAnimalSuccess({ animal: animalFromApi, animalId: animalId });
          }),
          catchError((error: HttpErrorResponse) => {

             this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };

            return of(AnimalActions.updateAnimalFailure({
              payload: this.errorResponse
            }));
          }),
        )
      )
    )
  );

  updateAnimalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.updateAnimalSuccess),
        map((action) => {
          this.location.back();
          const response = 'Animal modificado con éxito.'
          this.sharedService.managementToast('updateAnimalSuccessFeedback', this.responseOK, response);
        })
      ),
    { dispatch: false }
  );


  addAnimalPhotos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AnimalActions.createAnimalSuccess, AnimalActions.updateAnimalSuccess),
    withLatestFrom(this.store.select(state => state.animals)),
    mergeMap(([action, animalFormData]) => {
      const dataPhoto = animalFormData?.files;
      const animal = action.animal;

      const requests = [];

      if (dataPhoto?.principal_image) {
        requests.push(
          this.animalService.addAnimalImage(animal.id, dataPhoto.principal_image, true)
        );
      }

      if (dataPhoto?.optional_image_one) {
        requests.push(
          this.animalService.addAnimalImage(animal.id, dataPhoto.optional_image_one, false)
        );
      }

      if (dataPhoto?.optional_image_two) {
        requests.push(
          this.animalService.addAnimalImage(animal.id, dataPhoto.optional_image_two, false)
        );
      }

      return forkJoin(requests).pipe(
        map((responses) =>
          AnimalActions.addAnimalPhotosSuccess({ photo: responses })
        ),
        catchError((error) =>
          of(
            AnimalActions.addAnimalPhotosFailure({
              error: {
                message: error?.error?.message || 'Error al subir imágenes',
                errors: error?.error?.errors || {}
              },
              animal_id: animal.id
            })
          )
        )
      );
    })
  )
);

addAnimalPhotosSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AnimalActions.addAnimalPhotosSuccess),
      tap(() => {
        this.responseOK = true;
        const response = 'Se ha creado y publicado la mascota de forma correcta.';
        this.sharedService.managementToast('createAnimalFeedback', this.responseOK, response);
        this.store.dispatch(AnimalActions.clearAnimalFormData());
      timeout(2000)
      this.location.back();

      })
    ),
  { dispatch: false }
);

addAnimalPhotosFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AnimalActions.addAnimalPhotosFailure),
      tap(({ error, animal_id }) => {
        console.log(animal_id);
        const id = animal_id

        this.store.dispatch(AnimalActions.deleteAnimal({ id }));

        this.responseOK = false;
        const message = 'Algo ha fallado.';
        this.errorResponse = message;

        this.sharedService.managementToast('createAnimalFeedback', false, message);
      })
    ),
  { dispatch: false }
);


  getAgeCategoriesAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getAgeCategoriesAux),
      mergeMap(() =>
        this.animalService.getAgeCategoriesAux().pipe(
          map(ageCategories => AnimalActions.getAgeCategoriesAuxSuccess({ ageCategories })),
          catchError(error => of(AnimalActions.getAgeCategoriesAuxFailure({ error })))
        )
      )
    )
  );

  getGenresAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getGenresAux),
      mergeMap(() =>
        this.animalService.getGenresAux().pipe(
          map(genres => AnimalActions.getGenresAuxSuccess({ genres })),
          catchError(error => of(AnimalActions.getGenresAuxFailure({ error })))
        )
      )
    )
  );

  getSizesAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getSizesAux),
      mergeMap(() =>
        this.animalService.getSizesAux().pipe(
          map(sizes => AnimalActions.getSizesAuxSuccess({ sizes })),
          catchError(error => of(AnimalActions.getSizesAuxFailure({ error })))
        )
      )
    )
  );

  getEnergyLevelsAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getEnergyLevelsAux),
      mergeMap(() =>
        this.animalService.getEnergyLevelsAux().pipe(
          map(energyLevels => AnimalActions.getEnergyLevelsAuxSuccess({ energyLevels })),
          catchError(error => of(AnimalActions.getEnergyLevelsAuxFailure({ error })))
        )
      )
    )
  );

  getHousingStagesAux$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.getHousingStagesAux),
      mergeMap(() =>
        this.animalService.getHousingStagesAux().pipe(
          map(housingStages => AnimalActions.getHousingStagesAuxSuccess({ housingStages })),
          catchError(error => of(AnimalActions.getHousingStagesAuxFailure({ error })))
        )
      )
    )
  );

deleteAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.deleteAnimal),
      switchMap(({ id }) =>
        this.animalService.deleteAnimal(id).pipe(
          map(() => AnimalActions.deleteAnimalSuccess()),
          catchError((error: HttpErrorResponse )=> of(AnimalActions.deleteAnimalFailure({ payload: error.error})))
        )
      )
    )
  );

applicationAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.applicationAnimal),
      exhaustMap(({ application }) =>
        this.animalService.applicationAnimal(application).pipe(
          map(application => {
            this.responseOK = true;
            return AnimalActions.applicationAnimalSuccess({ application: application });
          }),
          catchError((error: HttpErrorResponse) => {

             this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };

            return of(AnimalActions.applicationAnimalFailure({
              payload: this.errorResponse
            }));
          }),
          finalize(async () => {
            if (this.responseOK) {
              const response = 'Solicitud de adopción enviada con éxito. Pronto nos podremos en contacto contigo a través de correo electrónico'
              this.sharedService.managementToast('applicationAnimalSuccessFeedback', this.responseOK, response);
              this.router.navigateByUrl('/mascotas');
            }
          })
        )
      )
    )
  );

  applicationAnimalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.applicationAnimalSuccess),
        map((action) => {
          const response = 'Solicitud de adopción enviada con éxito. Pronto nos podremos en contacto contigo a través de correo electrónico'
          this.sharedService.managementToast('applicationAnimalSuccessFeedback', this.responseOK, response);
        })
      ),
    { dispatch: false }
  );

  applicationAnimalFailure$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AnimalActions.applicationAnimalFailure),
    tap(({ payload }) => {
          this.responseOK = false;

          this.errorResponse =  payload ? payload.message : "Se ha producido un problema y no se creado lal solicitud. Vuelve a intentarlo"
          this.sharedService.managementToast('applicationAnimalFeedback', this.responseOK, this.errorResponse);
        })
    ),
    { dispatch: false }
  );

}


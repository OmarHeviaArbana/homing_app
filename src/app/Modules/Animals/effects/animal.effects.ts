import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimalActions from '../actions/animal.action';
import { AnimalService } from '../services/animial.service'
import { catchError, exhaustMap, map, mergeMap, switchMap, tap, timeout, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { AnimalDTO } from '../models/animal.dto';

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
      /* exhaustMap(({ animalId }) =>
        this.animalService.getAnimalById(animalId).pipe(
          map((animal: AnimalDTO) =>
            AnimalActions.getAnimalByIdSuccess({ animal })
          ),
          catchError((error) =>
            of(AnimalActions.getAnimalByIdSuccess({ payload: error }))
          )
        )
      ) */
    )
  );

 /*  getAnimalByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.getAnimalByIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  ); */


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
          console.log(action);
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


  addAnimalPhotos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AnimalActions.createAnimalSuccess),
    withLatestFrom(this.store.select(state => state.animals)),
    switchMap(([action, animalFormData]) => {
      const dataPhoto = animalFormData.animalFormData;
      const animal = action.animal;

     const photos: { image_url: string; principal: boolean; }[] = [];

      if (dataPhoto?.principal_image) {
        photos.push({ image_url: dataPhoto.principal_image, principal: true });
      }

      if (dataPhoto?.optional_image_one) {
        photos.push({ image_url: dataPhoto.optional_image_one, principal: false });
      }

      if (dataPhoto?.optional_image_two) {
        photos.push({ image_url: dataPhoto.optional_image_two, principal: false });
      }
      const payload = {
        animal_id: animal.id,
        photos
      };
      return this.animalService.addAnimalPhotos(payload).pipe(
        map(() => AnimalActions.addAnimalPhotosSuccess({ photos })),
        catchError((error) =>
          of(
            AnimalActions.addAnimalPhotosFailure({
              error: {
                message: error.error?.message || 'Error al subir imágenes',
                errors: error.error?.errors || {}
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
        this.router.navigate(['/mascotas']);
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

}


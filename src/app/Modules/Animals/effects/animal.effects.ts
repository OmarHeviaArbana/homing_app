import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimalActions from '../actions/animal.action';
import { AnimalService } from '../services/animial.service'
import { catchError, exhaustMap, filter, finalize, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

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

/* addAnimalPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.createAnimalSuccess),
      withLatestFrom(this.store.select(state => state.animals)),
      filter(([action, animalFormData]) => !!action.animal.id  && !!animalFormData),
      switchMap(([action, animalFormData]) => {
        const dataPhoto = animalFormData.animalFormData;

        const photo = {
          animal_id: action.animal.id,
          image_url: dataPhoto?.principal_image,
          principal: true
        }

        return this.animalService.addAnimalPhoto(photo).pipe(
          map((photo) => AnimalActions.addAnimalPhotosSuccess({ photo })),
          catchError((error, animal) => {
              this.errorResponse = {
              message: error.error?.message || 'Error en el registro',
              errors: error.error?.errors || {}
            };
              return of(AnimalActions.addAnimalPhotosFailure({ error, animal}));
          })
        );
      })
    )
  );

  addAnimalPhotosSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.createAnimalSuccess),
        tap(() => {
          this.responseOK = true;
           const response = 'Registro a punto de finalizar. Haz login con las credenciales de usuario para finalizarlo'
          this.sharedService.managementToast('registerAnimalFeedback', this.responseOK, response)
          this.store.dispatch(AnimalActions.clearAnimalFormData());
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  addAnimalPhotosFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AnimalActions.createAnimalFailure),
        switchMap(({ payload}) => {
          const failerAnimal = animal;
          const id = failerAnimal.animal_id;
          console.log(id);
          this.store.dispatch(AnimalActions.deleteAnimal({ id}));

          return of(
            this.responseOK = false,
            this.errorResponse = 'El nombre del Refugio ya está en uso. Por favor, elije otro nombre.',
            this.sharedService.managementToast('registerAnimalFeedback', false, payload)
          );
        })
      ),
    { dispatch: false }
  ); */
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
          /* finalize(async () => {
            if (this.responseOK) {
              this.router.navigateByUrl('/mascotas');
            }
          }) */
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

          //if(action.animal.role_id  === 2) {
          const response = 'Animal creado y publicado con éxito.'
          this.sharedService.managementToast('createAnimalFeedback', this.responseOK, response);
         // }

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
    //filter(([action, animalFormData]) => !!action.animal.id && !!animalFormData),
    switchMap(([action, animalFormData]) => {
      console.log(action.animal)
      const dataPhoto = animalFormData.animalFormData;
      const animal = action.animal

      const photo = {
        animal_id: animal.id,
        image_url: dataPhoto?.principal_image,
        principal: true
      };


      return this.animalService.addAnimalPhoto(photo).pipe(
        map((photo) => AnimalActions.addAnimalPhotosSuccess({ photo })),
        catchError((error) =>
          of(
            AnimalActions.addAnimalPhotosFailure({
              error: {
                message: error.error?.message || 'Error en el registro',
                errors: error.error?.errors || {}
              },
              animal_id: action.animal.id
            })
          )
        )
      );
    })
  )
);

// Success: después de subir la imagen correctamente
addAnimalPhotosSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AnimalActions.addAnimalPhotosSuccess), // ← Cambiado correctamente
      tap(() => {
        this.responseOK = true;
        const response = 'Se ha creado y publicado la mascota de forma correcta.';
        this.sharedService.managementToast('createAnimalFeedback', this.responseOK, response);
        this.store.dispatch(AnimalActions.clearAnimalFormData());
        this.router.navigate(['/mascotas']);
      })
    ),
  { dispatch: false }
);

// Failure: si falla el alta de la imagen
addAnimalPhotosFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AnimalActions.addAnimalPhotosFailure),
      tap(({ error, animal_id }) => {
        this.store.dispatch(AnimalActions.deleteAnimal({ id: animal_id }));

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
}


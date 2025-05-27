import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimalActions from '../actions/animal.action';
import { AnimalService } from '../services/animial.service'
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AnimalEffects {
  constructor(private actions$: Actions, private animalService: AnimalService) {}

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


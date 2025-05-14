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
        this.animalService.getAll().pipe(
          map((animals) => AnimalActions.getAllAnimalsSuccess({ animals })),
          catchError((error) => of(AnimalActions.getAllAnimalsFailure({ error })))
        )
      )
    )
  );
}

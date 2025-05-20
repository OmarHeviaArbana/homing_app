import { createAction, props } from '@ngrx/store';
import { AnimalDTO } from '../models/animal.dto';

export const getAllAnimals = createAction(
  '[Animals] Load Animals',
);

export const getAllAnimalsSuccess = createAction(
  '[Animals] Load Animals Success',
  props<{ animals: AnimalDTO[] }>()
);

export const getAllAnimalsFailure = createAction(
  '[Animals] Load Animals Failure',
  props<{ error: any }>()
);

import { createReducer, on } from '@ngrx/store';
import * as AnimalActions from '../actions/animal.action'
import { AnimalDTO } from '../models/animal.dto';

export interface AnimalState {
  animals: AnimalDTO[];
  loading: boolean;
  error: any;
}

export const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null,
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.getAllAnimals, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getAllAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals,
    loading: false,
  })),

  on(AnimalActions.getAllAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalState } from '../reducers/animal.reducer';

export const selectAnimalState = createFeatureSelector<AnimalState>('animals');

export const selectAllAnimals = createSelector(
  selectAnimalState,
  (state) => state.animals
);

export const selectAnimalsLoading = createSelector(
  selectAnimalState,
  (state) => state.loading
);

export const selectAnimalsFailure = createSelector(
  selectAnimalState,
  (state) => state.error
);

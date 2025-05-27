import { createAction, props } from '@ngrx/store';
import { AnimalDTO } from '../models/animal.dto';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import { UserDTO } from '../../Users/models/user.dto';

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


export const getSpeciesAux = createAction(
  '[Species] Load Species',
);

export const getSpeciesAuxSuccess = createAction(
  '[Species] Load Species Success',
  props<{ species: AuxiliarEntityDTO[] }>()
);

export const getSpeciesAuxFailure = createAction(
  '[Species] Load Species Failure',
  props<{ error: any }>()
);


export const getStatusAux = createAction(
  '[Status] Load Status'
);

export const getStatusAuxSuccess = createAction(
  '[Status] Load Status Success',
  props<{ status: AuxiliarEntityDTO[] }>()
);

export const getStatusAuxFailure = createAction(
  '[Status] Load Status Failure',
  props<{ error: any }>()
);


export const getAgeCategoriesAux = createAction(
  '[AgeCategories] Load Age Categories'
);

export const getAgeCategoriesAuxSuccess = createAction(
  '[AgeCategories] Load Age Categories Success',
  props<{ ageCategories: AuxiliarEntityDTO[] }>()
);

export const getAgeCategoriesAuxFailure = createAction(
  '[AgeCategories] Load Age Categories Failure',
  props<{ error: any }>()
);


export const getGenresAux = createAction(
  '[Genres] Load Genres'
);

export const getGenresAuxSuccess = createAction(
  '[Genres] Load Genres Success',
  props<{ genres: AuxiliarEntityDTO[] }>()
);

export const getGenresAuxFailure = createAction(
  '[Genres] Load Genres Failure',
  props<{ error: any }>()
);


export const getSizesAux = createAction(
  '[Sizes] Load Sizes'
);

export const getSizesAuxSuccess = createAction(
  '[Sizes] Load Sizes Success',
  props<{ sizes: AuxiliarEntityDTO[] }>()
);
export const getSizesAuxFailure = createAction(
  '[Sizes] Load Sizes Failure',
  props<{ error: any }>()
);


export const getEnergyLevelsAux = createAction(
  '[EnergyLevels] Load Energy Levels'
);

export const getEnergyLevelsAuxSuccess = createAction(
  '[EnergyLevels] Load Energy Levels Success',
  props<{ energyLevels: AuxiliarEntityDTO[] }>()
);

export const getEnergyLevelsAuxFailure = createAction(
  '[EnergyLevels] Load Energy Levels Failure',
  props<{ error: any }>()
);


export const getHousingStagesAux = createAction(
  '[HousingStages] Load Housing Stages'
);

export const getHousingStagesAuxSuccess = createAction(
  '[HousingStages] Load Housing Stages Success',
  props<{ housingStages: AuxiliarEntityDTO[] }>()
);

export const getHousingStagesAuxFailure = createAction(
  '[HousingStages] Load Housing Stages Failure',
  props<{ error: any }>()
);



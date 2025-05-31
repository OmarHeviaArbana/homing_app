import { createAction, props } from '@ngrx/store';
import { AnimalDTO } from '../models/animal.dto';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimalPhotoDTO } from '../models/animal-photo.dto';

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


export const getAnimalById = createAction(
  '[AnimalForm Page] Get Animal',
  props<{ animalId: string }>()
);
export const getAnimalByIdSuccess = createAction(
  '[AnimalForm Page] Get Animal Success',
  props<{ animalDetail: AnimalDTO[] }>()
);

export const getAnimalByIdFailure = createAction(
  '[AnimalForm Page] Get Animal Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const createAnimal = createAction(
  '[Create Animal Page] Create Animal ',
  props<{ animal: AnimalDTO}>()
);
export const createAnimalSuccess = createAction(
  '[Create Animal Page] Create Animal new animal Success',
  props<{ animal: AnimalDTO}>()
);

export const createAnimalFailure = createAction(
  '[Create Animal Page] Create Animal Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const deleteAnimal = createAction(
  '[Animal] Delete Animal',
  props<{ id: number }>()
);

export const deleteAnimalSuccess = createAction(
  '[Animal] Delete Animal Success'
);

export const deleteAnimalFailure = createAction(
  '[Animal] Delete Animal Failure',
  props<{  payload: HttpErrorResponse }>()
);

export const saveAnimalFormData = createAction(
  '[Animal Form] Save Animal Form Data',
  props<{ animalFormData: Partial<AnimalDTO> }>()
);

export const clearAnimalFormData = createAction(
  '[Animal Form] Clear Animal Form Data'
);


export const addAnimalPhotos = createAction(
  '[Photo] Add photo ',
);

export const addAnimalPhotosSuccess = createAction(
  '[Photo Add photo Success',
    props<{ photos: AnimalPhotoDTO[]}>()
);

export const addAnimalPhotosFailure = createAction(
  '[Photo] Add photo Failure',
  props<{  error: any , animal_id: number }>()
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



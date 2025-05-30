import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ShelterDTO } from '../models/shelter.dto';
import { AnimalDTO } from '../../Animals/models/animal.dto';

export const getAllShelters = createAction(
  '[Shelters] Load Shelter',
);

export const getAllSheltersSuccess = createAction(
  '[Shelters] Load Shelters Success',
  props<{ shelters: ShelterDTO[] }>()
);

export const getAllSheltersFailure = createAction(
  '[Shelters] Load Shelters Failure',
  props<{ error: any }>()
);

export const getShelterById = createAction(
  '[ShelterForm Page] Get Shelter',
  props<{ shelterId: string }>()
);
export const getShelterByIdSuccess = createAction(
  '[ShelterForm Page] Get Shelter Success',
  props<{ shelterDetail: ShelterDTO[] }>()
);

export const getShelterByIdFailure = createAction(
  '[ShelterForm Page] Get Shelter Failure',
  props<{ payload: HttpErrorResponse }>()
);



export const getAnimalsShelter = createAction(
  '[AnimalsShelterForm Page] Get AnimalsShelter',
  props<{ shelterId: string }>()
);
export const getAnimalsShelterSuccess = createAction(
  '[AnimalsShelterForm Page] Get AnimalsShelter Success',
  props<{ animalsShelter: AnimalDTO[] }>()
);

export const getAnimalsShelterFailure = createAction(
  '[AnimalsShelterForm Page] Get AnimalsShelter Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const saveShelterFormData = createAction(
  '[Shelter Form] Save Shelter Form Data',
  props<{ shelterFormData: Partial<ShelterDTO> }>()
);

export const clearShelterFormData = createAction(
  '[Shelter Form] Clear Shelter Form Data'
);

export const createShelter = createAction(
  '[Shelter] Create Shelter',
  props<{ shelter: ShelterDTO }>()
);

export const createShelterSuccess = createAction(
  '[Shelter] Create Shelter Success',
  props<{ shelter: ShelterDTO }>()
);

export const createShelterFailure = createAction(
  '[Shelter] Create Shelter Failure',
  props<{ error: any , shelterToRegister: any }>()
);


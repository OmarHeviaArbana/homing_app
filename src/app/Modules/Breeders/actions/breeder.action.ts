import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BreederDTO } from '../models/breeder.dto';
import { AnimalDTO } from '../../Animals/models/animal.dto';

export const getAllBreeders = createAction(
  '[Breeders] Load Breeders',
);

export const getAllBreedersSuccess = createAction(
  '[Breeders] Load Breeders Success',
  props<{ breeders: BreederDTO[] }>()
);

export const getAllBreedersFailure = createAction(
  '[Breeders] Load Breeders Failure',
  props<{ error: any }>()
);

export const updateBreeder = createAction(
  '[Profile Page] Update Breeder',
  props<{ breederId: number; breeder: BreederDTO ;}>()
);
export const updateBreederSuccess = createAction(
  '[Profile Page] Update Breeder Success',
  props<{ breederId: number; breeder: BreederDTO }>()
);

export const updateBreederFailure = createAction(
  '[Profile Page] Update Breeder Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const getBreederById = createAction(
  '[BreederForm Page] Get Breeder',
  props<{ breederId: number }>()
);
export const getBreederByIdSuccess = createAction(
  '[BreederForm Page] Get Breeder Success',
  props<{ breederDetail: BreederDTO[] }>()
);

export const getBreederByIdFailure = createAction(
  '[BreederForm Page] Get Breeder Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getAnimalsBreeder = createAction(
  '[AnimalsBreederForm Page] Get AnimalsBreeder',
  props<{ breederId: string }>()
);
export const getAnimalsBreederSuccess = createAction(
  '[AnimalsBreederForm Page] Get AnimalsBreeder Success',
  props<{ animalsBreeder: AnimalDTO[] }>()
);

export const getAnimalsBreederFailure = createAction(
  '[AnimalsBreederForm Page] Get AnimalsBreeder Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const saveBreederFormData = createAction(
  '[Breeder Form] Save Breeder Form Data',
  props<{ breederFormData: Partial<BreederDTO> }>()
);

export const clearBreederFormData = createAction(
  '[Breeder Form] Clear Breeder Form Data'
);

export const createBreeder = createAction(
  '[Breeder] Create Breeder',
  props<{ breeder: BreederDTO }>()
);

export const createBreederSuccess = createAction(
  '[Breeder] Create Breeder Success',
  props<{ breeder: BreederDTO }>()
);

export const createBreederFailure = createAction(
  '[Breeder] Create Breeder Failure',
  props<{ error: any , breederToRegister: any}>()
);

export const uploadBreeederLogo = createAction(
  '[Breeeder] Upload Breeeder Logo',
  props<{ files: FormData }>()
);

export const uploadBreeederLogoSuccess = createAction(
  '[Breeeder] Upload Breeeder Logo Success',
  props<{ response: any }>()
);

export const uploadBreeederLogoFailure = createAction(
  '[Breeeder] Upload Breeeder Logo Failure',
  props<{ error: { message: string; errors: any } }>()
);

export const getApplicationsBreeder = createAction(
  '[Application Breeder Page] Application Breeder',
  props<{ breederId: number}>()
);

export const getApplicationsBreederSuccess = createAction(
  '[Application Breeder Page] Application Breeder Success',
  props<{ breederApplications: any;  }>()
);

export const getApplicationsBreederFailure = createAction(
  '[Application Breeder Page] Application Breeder Failure',
  props<{ payload: HttpErrorResponse }>()
);

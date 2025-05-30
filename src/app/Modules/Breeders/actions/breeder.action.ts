import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BreederDTO } from '../models/breeder.dto';

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


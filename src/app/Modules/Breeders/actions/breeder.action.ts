import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BreederDTO } from '../models/breeder.dto';

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
  props<{ payload: HttpErrorResponse }>()
);


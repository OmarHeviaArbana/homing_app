import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ShelterDTO } from '../models/shelter.dto';

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
  props<{ payload: HttpErrorResponse }>()
);


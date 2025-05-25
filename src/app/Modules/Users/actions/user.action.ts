import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';
import { ShelterDTO } from '../../Shelters/models/shelter.dto';
import { BreederDTO } from '../../Breeders/models/breeder.dto';

export const register = createAction(
  '[Register Page] Register new user',
  props<{ user: UserDTO }>()
);
export const registerSuccess = createAction(
  '[Register Page] Register new user Success',
  props<{ user: UserDTO}>()
);

export const registerFailure = createAction(
  '[Register Page] Register new user Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success'
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{  payload: HttpErrorResponse }>()
);



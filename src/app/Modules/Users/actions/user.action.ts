import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';
import { ShelterDTO } from '../../Shelters/models/shelter.dto';
import { BreederDTO } from '../../Breeders/models/breeder.dto';
import { AnimalApplicationDTO } from '../../Animals/models/animal-application';

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

export const updateUser = createAction(
  '[Profile Page] Update User',
  props<{ userId: number; user: UserDTO }>()
);
export const updateUserSuccess = createAction(
  '[Profile Page] Update User Success',
  props<{ userId: number; user: UserDTO }>()
);

export const updateUserFailure = createAction(
  '[Profile Page] Update User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const setFilesFormData = createAction(
  '[User] Set User File Data',
  props<{  files: { [key: string]: File | null } }>()
);

export const getUserById = createAction(
  '[Profile Page] Get user by ID',
  props<{ userId: number }>()
);
export const getUserByIdSuccess = createAction(
  '[Profile Page] Get user by ID Success',
  props<{ user: UserDTO }>()
);

export const getUserByIdFailure = createAction(
  '[Profile Page] Get user by ID Failure',
  props<{ payload: HttpErrorResponse }>()
);


export const getApplicationsUser = createAction(
  '[Application User Page] Application User',
  props<{ userId: number}>()
);

export const getApplicationsUserSuccess = createAction(
  '[Application User Page] Application User Success',
  props<{ userApplications: any;  }>()
);

export const getApplicationsUserFailure = createAction(
  '[Application User Page] Application User Failure',
  props<{ payload: HttpErrorResponse }>()
);




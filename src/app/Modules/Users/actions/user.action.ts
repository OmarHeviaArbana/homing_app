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
  props<{ user: UserDTO }>()
);

export const registerFailure = createAction(
  '[Register Page] Register new user Failure',
  props<{ payload: HttpErrorResponse }>()
);





// Opcional para Breeder
/* export const registerBreeder = createAction(
  '[Breeder] Register Breeder',
  props<{ breeder: BreederDTO }>()
);

export const registerBreederSuccess = createAction(
  '[Breeder] Register Breeder Success',
  props<{ breeder: BreederDTO }>()
);

export const registerBreederFailure = createAction(
  '[Breeder] Register Breeder Failure',
  props<{ payload: HttpErrorResponse }>()
); */

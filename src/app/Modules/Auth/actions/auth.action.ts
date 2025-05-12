import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../../Users/user.dto';
import { LoginDTO } from '../models/login.dto';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: LoginDTO }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ user: UserDTO; access_token: string }>()
);

export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Login Page] Logout');

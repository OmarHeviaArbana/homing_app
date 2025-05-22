import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Modules/Auth/effects/auth.effects';
import { AnimalEffects } from './Modules/Animals/effects';
import { UserEffects } from './Modules/Users/effects';

import * as AuthReducer from './Modules/Auth/reducers';
import * as AnimalReducer from './Modules/Animals/reducers';
import * as UserReducer from './Modules/Users/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
  animals: AnimalReducer.AnimalState;
  user: UserReducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  animals: AnimalReducer.animalReducer,
  user: UserReducer.userReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  AnimalEffects,
  UserEffects
];

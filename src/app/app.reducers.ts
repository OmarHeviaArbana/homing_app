import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Modules/Auth/effects/auth.effects';
import { AnimalEffects } from './Modules/Animals/effects';
import { UserEffects } from './Modules/Users/effects';
import { ShelterEffects } from './Modules/Shelters/effects';

import * as AuthReducer from './Modules/Auth/reducers';
import * as AnimalReducer from './Modules/Animals/reducers';
import * as UserReducer from './Modules/Users/reducers';
import * as ShelterReducer  from './Modules/Shelters/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
  animals: AnimalReducer.AnimalState;
  user: UserReducer.UserState;
  shelter: ShelterReducer.ShelterState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  animals: AnimalReducer.animalReducer,
  user: UserReducer.userReducer,
  shelter: ShelterReducer.shelterReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  AnimalEffects,
  UserEffects,
  ShelterEffects
];

import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Modules/Auth/effects/auth.effects';
import { AnimalEffects } from './Modules/Animals/effects';
import { UserEffects } from './Modules/Users/effects';
import { ShelterEffects } from './Modules/Shelters/effects';
import { BreederEffects } from './Modules/Breeders/effects';

import * as AuthReducer from './Modules/Auth/reducers';
import * as AnimalReducer from './Modules/Animals/reducers';
import * as UserReducer from './Modules/Users/reducers';
import * as ShelterReducer  from './Modules/Shelters/reducers';
import * as BreederReducer  from './Modules/Breeders/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
  animals: AnimalReducer.AnimalState;
  user: UserReducer.UserState;
  shelter: ShelterReducer.ShelterState;
  breeder: BreederReducer.BreederState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  animals: AnimalReducer.animalReducer,
  user: UserReducer.userReducer,
  shelter: ShelterReducer.shelterReducer,
  breeder: BreederReducer.breederReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  AnimalEffects,
  UserEffects,
  ShelterEffects,
  BreederEffects
];

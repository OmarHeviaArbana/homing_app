import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Modules/Auth/effects/auth.effects';
import { AnimalEffects } from './Modules/Animals/effects';
import * as AuthReducer from './Modules/Auth/reducers';
import * as AnimalReducer from './Modules/Animals/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
  animals: AnimalReducer.AnimalState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  animals: AnimalReducer.animalReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  AnimalEffects
];

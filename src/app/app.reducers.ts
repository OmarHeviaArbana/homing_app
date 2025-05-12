import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Modules/Auth/effects/auth.effects';
import * as AuthReducer from './Modules/Auth/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
];

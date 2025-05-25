import { Action, createReducer, on } from '@ngrx/store';
import * as BreederActions from '../actions/breeder.action';
import { BreederDTO } from '../models/breeder.dto';


export interface BreederState {
  breederFormData: Partial<BreederDTO> | null;
}

export const initialState: BreederState = {
  breederFormData: null,
};

const _breederReducer = createReducer(
  initialState,
    on(BreederActions.saveBreederFormData, (state, { breederFormData }) => ({
    ...state,
    breederFormData,
    })),
    on(BreederActions.clearBreederFormData, state => ({
      ...state,
      breederFormData: null,
    })),

    on(BreederActions.createBreederFailure, (state, { error, breederToRegister}) => ({
    ...state,
    breederToRegister: breederToRegister,
    loading: false,
    loaded: false,
    error: error,
  }))
);

export function breederReducer(
  state: BreederState | undefined,
  action: Action
): BreederState {
  return _breederReducer(state, action);
}

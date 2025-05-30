import { Action, createReducer, on } from '@ngrx/store';
import * as BreederActions from '../actions/breeder.action';
import { BreederDTO } from '../models/breeder.dto';


export interface BreederState {
  breeders: BreederDTO[];
  breederFormData: Partial<BreederDTO> | null;
  loading: boolean;
  loaded: boolean;
  error: any;

}

export const initialState: BreederState = {
  breeders: [],
  breederFormData: null,
  loading: false,
  loaded: false,
  error: null,
};

const _breederReducer = createReducer(
  initialState,
    on(BreederActions.getAllBreeders, state => ({
      ...state,
      loading: true,
      loaded: false
    })),

    on(BreederActions.getAllBreedersSuccess, (state, { breeders }) => ({
      ...state,
      breeders,
      loading: false,
      loaded: true,
      error: null,
    })),

    on(BreederActions.getAllBreedersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),

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

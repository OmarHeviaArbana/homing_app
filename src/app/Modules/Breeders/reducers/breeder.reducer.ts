import { Action, createReducer, on } from '@ngrx/store';
import * as BreederActions from '../actions/breeder.action';
import { BreederDTO } from '../models/breeder.dto';


export interface BreederState {
  breeders: BreederDTO[];
  breederDetail: BreederDTO[];
  animalsBreeder: BreederDTO[];
  breederFormData: Partial<BreederDTO> | null;
  files: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: BreederState = {
  breeders: [],
  breederDetail: [],
  animalsBreeder: [],
  files: [],
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

    on(BreederActions.getBreederById, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),
    on(BreederActions.getBreederByIdSuccess, (state,  {breederDetail} ) => ({
      ...state,
      breederDetail,
      loading: false,
      loaded: true,
      error: null,
    })),
    on(BreederActions.getBreederByIdFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),

    on(BreederActions.updateBreeder, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),

    on(BreederActions.updateBreederSuccess, (state, action) => ({
      ...state,
      breeder: action.breeder,
      loading: false,
      loaded: true,
      error: null,
    })),

    on(BreederActions.updateBreederFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),


    on(BreederActions.getAnimalsBreeder, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),
    on(BreederActions.getAnimalsBreederSuccess, (state,  {animalsBreeder} ) => ({
      ...state,
      animalsBreeder,
      loading: false,
      loaded: true,
      error: null,
    })),
    on(BreederActions.getAnimalsBreederFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),

    on(BreederActions.createBreederFailure, (state, { error, breederToRegister}) => ({
    ...state,
    breederToRegister: breederToRegister,
    loading: false,
    loaded: false,
    error: error,
  })),
  on(BreederActions.uploadBreeederLogo, (state, {  files }) => ({
      ...state,
      files
    })),

);

export function breederReducer(
  state: BreederState | undefined,
  action: Action
): BreederState {
  return _breederReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import * as ShelterActions from '../actions/shelter.action';
import { ShelterDTO } from '../models/shelter.dto';


export interface ShelterState {
  shelters: ShelterDTO[];
  shelterFormData: Partial<ShelterDTO> | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ShelterState = {
  shelters: [],
  shelterFormData: null,
  loading: false,
  loaded: false,
  error: null,
};

const _shelterReducer = createReducer(
  initialState,

  on(ShelterActions.getAllShelters, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(ShelterActions.getAllSheltersSuccess, (state, { shelters }) => ({
    ...state,
    shelters,
    loading: false,
    loaded: true,
    error: null,
  })),

  on(ShelterActions.getAllSheltersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShelterActions.saveShelterFormData, (state, { shelterFormData }) => ({
    ...state,
    shelterFormData,
  })),
  on(ShelterActions.clearShelterFormData, state => ({
    ...state,
    shelterFormData: null,
  })),

  on(ShelterActions.createShelterFailure, (state, { error, shelterToRegister}) => ({
    ...state,
    shelterToRegister: shelterToRegister,
    loading: false,
    loaded: false,
    error: error,
  }))
);

export function shelterReducer(
  state: ShelterState | undefined,
  action: Action
): ShelterState {
  return _shelterReducer(state, action);
}

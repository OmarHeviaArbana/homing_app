import { Action, createReducer, on } from '@ngrx/store';
import * as ShelterActions from '../actions/shelter.action';
import { ShelterDTO } from '../models/shelter.dto';


export interface ShelterState {
  shelterFormData: Partial<ShelterDTO> | null;
}

export const initialState: ShelterState = {
  shelterFormData: null,
};

const _shelterReducer = createReducer(
  initialState,
   on(ShelterActions.saveShelterFormData, (state, { shelterFormData }) => ({
    ...state,
    shelterFormData,
  })),
  on(ShelterActions.clearShelterFormData, state => ({
    ...state,
    shelterFormData: null,
  }))
);

export function shelterReducer(
  state: ShelterState | undefined,
  action: Action
): ShelterState {
  return _shelterReducer(state, action);
}

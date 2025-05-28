import { Action, createReducer, on } from '@ngrx/store';
import { register,registerFailure, registerSuccess,} from '../actions';
import { UserDTO } from '../models/user.dto';
import * as UserActions from '../actions';

export interface UserState {
  user: UserDTO | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(UserActions.register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(UserActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(UserActions.registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

   on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(UserActions.deleteUserSuccess, (state) => ({
    ...state,
    user: null,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(UserActions.deleteUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}

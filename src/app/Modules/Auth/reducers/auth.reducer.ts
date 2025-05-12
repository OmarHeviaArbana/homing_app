import { Action, createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout } from '../actions';
import { UserDTO } from '../../Users/user.dto';

export interface AuthState {
  user: UserDTO | null;
  access_token: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  access_token: '',
  loading: false,
  loaded: false,
  error: null
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, { user, access_token }) => ({
    ...state,
    user,
    access_token,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(logout, () => initialState)
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}


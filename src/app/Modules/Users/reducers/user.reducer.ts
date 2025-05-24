import { Action, createReducer, on } from '@ngrx/store';
import { register,registerFailure, registerSuccess,} from '../actions';
import { UserDTO } from '../models/user.dto';

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
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
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

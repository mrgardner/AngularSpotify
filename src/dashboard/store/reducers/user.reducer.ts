import { createReducer, on } from '@ngrx/store';
import { UserApiActions } from '../actions/user.action';
import { UserState } from '../model/user.model';

export const initialState: UserState = {
  displayName: 'The Man',
  error: null,
  loaded: false,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserApiActions.loadUser, state => ({
    ...state,
    loading: true
  })),
  on(UserApiActions.loadUserSuccess, (state, { payload }) => ({
    ...state,
    error: null,
    loading: false,
    loaded: true,
    displayName: payload
  })),
  on(UserApiActions.loadUserFail, (state, { payload }) => ({
    ...state,
    error: payload.error,
    loaded: false,
    loading: false
  }))
);
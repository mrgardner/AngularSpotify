import { createReducer, on } from '@ngrx/store';
import { AuthApiActions } from '../actions/auth.action';
import { AuthState } from '../model/auth.model';

export const initialState: AuthState = {
  loggedIn: true,
  error: null,
  authToken: '',
  expiredDate: ''
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.login, state => ({ ...state })),
  on(AuthApiActions.logout, state => {
    sessionStorage.clear();
    return {
      ...state,
      loggedIn: false
    }
  }),
  on(AuthApiActions.storeAuthToken, (state, { payload }) => ({
    ...state,
    authToken: payload.authToken,
    expiredDate: payload.expiredDate,
    loggedIn: true,
  })),
  on(AuthApiActions.removeAuthToken, state => ({
    ...state,
    authToken: '',
    expiredDate: '',
    error: null
  })),
  on(AuthApiActions.authNOOP, state => ({ ...state })),
  on(AuthApiActions.authCheck, state => ({ ...state }))
);
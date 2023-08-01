import { SPOTIFY_AUTH } from '@app/constants/auth.constant';
import { AuthState } from '../model/auth.model';
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions } from '../actions';

export const initialState: AuthState = {
  loggedIn: false,
  error: null,
  authToken: '',
  expiredDate: ''
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.login, (state, { }) => {
    return {
      ...state
    };
  }),
  on(AuthApiActions.logout, (state, { }) => {
    sessionStorage.removeItem(SPOTIFY_AUTH.SPOTIFY_TOKEN);
    sessionStorage.removeItem(SPOTIFY_AUTH.EXPIRED_DATE);
    return {
      ...state,
      loggedIn: false
    }
  }),
  on(AuthApiActions.storeAuthToken, (state, { payload }) => {
    const { authToken, expiredDate } = payload;

    return {
      ...state,
      loggedIn: true,
      authToken,
      expiredDate,
      error: null
    }
  }),
  on(AuthApiActions.removeAuthToken, (state, { }) => {
    return {
      ...state,
      authToken: '',
      expiredDate: '',
      error: null
    };
  }),
  on(AuthApiActions.authError, (state, { payload }) => {
    const error = { code: payload.code, message: payload.message }
    return {
      ...state,
      loggedIn: false,
      error
    }
  }),
  on(AuthApiActions.authCheck, (state, { }) => {
    return {
      ...state
    }
  }),
);
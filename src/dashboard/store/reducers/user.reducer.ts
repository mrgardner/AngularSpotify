import { createReducer, on } from '@ngrx/store';
import { UserState } from '../model/user.model';
import { UserApiActions } from '../actions/user.action';

export const initialState: UserState = {
  displayName: 'The Man',
  error: false,
  loaded: false,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserApiActions.loadUser, (state, { }) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(UserApiActions.loadUserSuccess, (state, { payload }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: payload.displayName
    }
  }),
  on(UserApiActions.loadUserFail, (state, { }) => {
    return {
      ...state,
      error: true,
      loaded: false,
      loading: false
    }
  })
);
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface SpotifyState {
  user: fromUser.UserState;
};

export const reducers: ActionReducerMap<SpotifyState> = {
  user: fromUser.userReducer

};

// user state
export const selectUser = (state: SpotifyState) => state.user;

export const getUser = createSelector(selectUser, fromUser.getUser)
export const getUserError = createSelector(selectUser, fromUser.getUserError)
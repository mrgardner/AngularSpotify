import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromPlaylists from './playlist.reducer';

export interface SpotifyState {
  user: fromUser.UserState;
};

export interface PlaylistTablesState {
  playlists: fromPlaylists.PlaylistsState;
};

export const reducers: ActionReducerMap<SpotifyState> = {
  user: fromUser.userReducer,
  // playlists: fromPlaylists.playlistsReducer
};

// user state
export const selectUser = (state: SpotifyState) => state.user;

export const getUser = createSelector(selectUser, fromUser.getUser)
export const getUserError = createSelector(selectUser, fromUser.getUserError);

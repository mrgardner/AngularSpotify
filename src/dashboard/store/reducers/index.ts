import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromPlaylists from './playlist.reducer';

export interface DashboardState {
  user: fromUser.UserState;
  playlists: fromPlaylists.PlaylistsState;
};

export const reducers: ActionReducerMap<DashboardState> = {
  user: fromUser.userReducer,
  playlists: fromPlaylists.playlistsReducer
};

export const getDashboardState = createFeatureSelector<DashboardState>(
  'dashboard'
);


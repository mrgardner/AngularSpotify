import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { userReducer } from "./user.reducer";
import { UserState } from '../model/user.model';
import { PlaylistsState } from '../model/playlists.model';
import { playlistsReducer } from './playlists.reducer';

export interface DashboardState {
  playlists: PlaylistsState;
  user: UserState;
};

export const reducers: ActionReducerMap<DashboardState, Action> = {
  playlists: playlistsReducer,
  user: userReducer,
};

export const getDashboardState = createFeatureSelector<DashboardState>(
  'dashboard'
);


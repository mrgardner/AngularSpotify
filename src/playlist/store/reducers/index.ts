import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPlaylist from './playlist.reducer';

export interface DashboardState {
  info: fromPlaylist.PlaylistsState;
};

export const reducers: ActionReducerMap<DashboardState> = {
  info: fromPlaylist.playlistInfoReducer
};

export const getDashboardState = createFeatureSelector<DashboardState>(
  'playlist'
);


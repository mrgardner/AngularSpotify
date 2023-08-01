import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { playlistReducer } from "@playlist/store/reducers/playlist.reducer";
import { PlaylistsState } from '../model/playlist.model';

export interface DashboardState {
  playlist: PlaylistsState;
};

export const reducers: ActionReducerMap<DashboardState, Action> = {
  playlist: playlistReducer
};

export const getPlaylistState = createFeatureSelector<DashboardState>(
  'playlist'
);


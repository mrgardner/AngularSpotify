import { Action, ActionReducerMap } from '@ngrx/store';
import { userReducer } from "./user.reducer";
import { playlistsReducer } from './playlists.reducer';
import { DashboardState } from '../model';

export const reducers: ActionReducerMap<DashboardState, Action> = {
  playlists: playlistsReducer,
  user: userReducer,
};
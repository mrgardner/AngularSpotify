import { Action, ActionReducerMap } from '@ngrx/store';
import { DashboardState } from '../model';
import { playlistsReducer } from './playlists.reducer';
import { userReducer } from "./user.reducer";

export const reducers: ActionReducerMap<DashboardState, Action> = {
  playlists: playlistsReducer,
  user: userReducer,
};
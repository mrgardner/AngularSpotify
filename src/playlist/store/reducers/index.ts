import { Action, ActionReducerMap } from '@ngrx/store';
import { playlistReducer } from "@playlist/store/reducers/playlist.reducer";
import { PlaylistState } from '../model';

export const reducers: ActionReducerMap<PlaylistState, Action> = {
  playlistTracks: playlistReducer
};
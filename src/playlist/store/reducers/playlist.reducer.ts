import { createReducer, on } from '@ngrx/store';
import { PlaylistsState } from '../model/playlist.model';
import { PlaylistApiActions } from '../actions/playlist.action';

export const initialState: Readonly<PlaylistsState> = {
  data: null,
  loading: false,
  loaded: false,
  error: false
};

export const playlistReducer = createReducer(
  initialState,
  on(PlaylistApiActions.loadPlaylist, state => ({
    ...state,
    loading: true
  })),
  on(PlaylistApiActions.loadPlaylistSuccess, (state, { playlist }) => ({
    ...state,
    error: false,
    loading: false,
    loaded: true,
    data: playlist.data
  })),
  on(PlaylistApiActions.loadPlaylistFail, state => ({
    ...state,
    error: true,
    loaded: false,
    loading: false
  }))
);
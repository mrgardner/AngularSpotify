import { createReducer, on } from '@ngrx/store';
import { PlaylistApiActions } from '../actions/playlist.action';
import { PlaylistTracksState } from '../model/playlist.model';

export const initialState: Readonly<PlaylistTracksState> = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};

export const playlistReducer = createReducer(
  initialState,
  on(PlaylistApiActions.loadPlaylist, state => ({
    ...state,
    loading: true
  })),
  on(PlaylistApiActions.loadPlaylistSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload
  })),
  on(PlaylistApiActions.loadPlaylistFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  }))
);
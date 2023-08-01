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
  on(PlaylistApiActions.loadPlaylist, (state, { }) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(PlaylistApiActions.loadPlaylistSuccess, (state, { playlist }) => {
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      data: playlist.data
    }
  }),
  on(PlaylistApiActions.loadPlaylistFail, (state, { }) => {
    return {
      ...state,
      error: true,
      loaded: false,
      loading: false
    }
  })
);

export const getPlaylistsError = (state: PlaylistsState) => state.error;
export const getPlaylistsEntities = (state: PlaylistsState) => state.data;
export const getPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const getPlaylistsLoaded = (state: PlaylistsState) => state.loaded;
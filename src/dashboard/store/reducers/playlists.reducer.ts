import { PlaylistsState } from '../model/playlists.model';
import { createReducer, on } from '@ngrx/store';
import { PlaylistsApiActions } from '../actions/playlist.action';

export const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
  loaded: false,
  next: '',
  error: null,
  selectedPlaylist: {},
  canLoadMore: true,
  total: 0
};

export const playlistsReducer = createReducer(
  initialState,
  on(PlaylistsApiActions.loadPlaylists, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(PlaylistsApiActions.loadPlaylistsSuccess, (state, { payload }) => {
    const { playlists, next, canLoadMore } = payload
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      next,
      canLoadMore,
      playlists
    }
  }),
  on(PlaylistsApiActions.loadPlaylistsFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  })),
  on(PlaylistsApiActions.updateSelectedPlaylist, (state, { payload }) => ({
    ...state,
    selectedPlaylist: {
      ...payload,
      selected: true
    }
  }))
);

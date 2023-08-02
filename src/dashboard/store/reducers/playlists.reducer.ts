import { PlaylistsState } from '../model/playlists.model';
import { createReducer, on } from '@ngrx/store';
import { PlaylistsApiActions } from '../actions/playlist.action';

export const initialState: PlaylistsState = {
  entities: {},
  loading: false,
  loaded: false,
  nextPlaylist: '',
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
    const { entities, nextPlaylist, canLoadMore } = payload
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      nextPlaylist,
      canLoadMore,
      entities
    }
  }),
  on(PlaylistsApiActions.loadPlaylistsFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  })),
  on(PlaylistsApiActions.loadPlaylistsByURL, state => ({
    ...state,
    loading: true
  })),
  on(PlaylistsApiActions.loadPlaylistsByURLSuccess, (state, { payload }) => {
    const { nextPlaylist, entities, canLoadMore } = payload
    return {
      ...state,
      error: false,
      loading: false,
      loaded: true,
      nextPlaylist,
      canLoadMore,
      entities
    }
  }),
  on(PlaylistsApiActions.loadPlaylistsByURLFail, (state, { payload }) => ({
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

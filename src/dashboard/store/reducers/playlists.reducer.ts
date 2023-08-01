import { PlaylistsState } from '../model/playlists.model';
import { createReducer, on } from '@ngrx/store';
import { PlaylistsApiActions } from '../actions/playlist.action';

export const initialState: PlaylistsState = {
  entities: {},
  loading: false,
  loaded: false,
  nextPlaylist: '',
  error: false,
  selectedPlaylist: '',
  canLoadMore: true
};

export const playlistsReducer = createReducer(
  initialState,
  on(PlaylistsApiActions.loadPlaylists, (state, { }) => {
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
  on(PlaylistsApiActions.loadPlaylistsFail, (state, { }) => {
    return {
      ...state,
      error: true,
      loaded: false,
      loading: false
    }
  }),
  on(PlaylistsApiActions.loadPlaylistsByURL, (state, { }) => {
    return {
      ...state,
      loading: true
    };
  }),
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
  on(PlaylistsApiActions.loadPlaylistsByURLFail, (state, { }) => {
    return {
      ...state,
      error: true,
      loaded: false,
      loading: false
    }
  }),
  on(PlaylistsApiActions.updateSelectedPlaylist, (state, { payload }) => {
    return {
      ...state,
      selectedPlaylist: payload.selectedPlaylist
    }
  })
);

export const getPlaylistsError = (state: PlaylistsState) => state.error;
export const getPlaylistsEntities = (state: PlaylistsState) => state.entities;
export const getPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const getPlaylistsLoaded = (state: PlaylistsState) => state.loaded;
export const getCanLoadMore = (state: PlaylistsState) => state.canLoadMore;
export const getNextPlaylists = (state: PlaylistsState) => state.nextPlaylist;
export const getSelectedPlaylist = (state: PlaylistsState) => state.selectedPlaylist;
export const getNextPlaylistAndEntitiesState = (state: PlaylistsState) => [state.nextPlaylist, state.entities];

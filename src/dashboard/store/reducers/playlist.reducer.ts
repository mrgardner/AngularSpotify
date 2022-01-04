import { Playlist } from '@app/interfaces/playlist/playlist.interface';
import { PLAYLIST_TYPES } from '@dashboard/constants/actions.constant';
import * as fromPlaylists from '../actions/playlist.action';

export interface PlaylistsState {
  entities: { [id: number]: Playlist },
  loading: boolean,
  loaded: boolean,
  nextPlaylist: string,
  error: boolean,
  selectedPlaylist: string;
  canLoadMore: boolean
};

export const initialState: PlaylistsState = {
  entities: {},
  loading: false,
  loaded: false,
  nextPlaylist: '',
  error: false,
  selectedPlaylist: '',
  canLoadMore: true
};

export function playlistsReducer(state = initialState, action: fromPlaylists.PlaylistAction): PlaylistsState {
  switch (action.type) {
    case PLAYLIST_TYPES.LOAD_PLAYLISTS: {
      return {
        ...state,
        loading: true
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLISTS_SUCCESS: {
      const { entities, nextPlaylist, canLoadMore } = action.payload

      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        nextPlaylist,
        canLoadMore,
        entities
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLISTS_FAIL: {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL: {
      return {
        ...state,
        loading: true
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL_SUCCESS: {
      const { nextPlaylist, entities, canLoadMore } = action.payload

      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        nextPlaylist,
        canLoadMore,
        entities
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL_FAIL: {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false,
      }
    }
    case PLAYLIST_TYPES.UPDATE_SELECTED_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export const getPlaylistsError = (state: PlaylistsState) => state.error;
export const getPlaylistsEntities = (state: PlaylistsState) => state.entities;
export const getPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const getPlaylistsLoaded = (state: PlaylistsState) => state.loaded;
export const getCanLoadMore = (state: PlaylistsState) => state.canLoadMore;
export const getNextPlaylists = (state: PlaylistsState) => state.nextPlaylist;
export const getSelectedPlaylist = (state: PlaylistsState) => state.selectedPlaylist;
export const getNextPlaylistAndEntitiesState = (state: PlaylistsState) => [state.nextPlaylist, state.entities];

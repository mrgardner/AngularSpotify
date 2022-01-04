import { Playlist } from '@app/interfaces/playlist/playlist.interface';
import { PLAYLIST_TYPES } from '@playlist/constants/actions.constant';
import * as fromPlaylist from '../actions/playlist.action';

export interface PlaylistsState {
  data: Playlist,
  loading: boolean,
  loaded: boolean,
  error: boolean
};

export const initialState: PlaylistsState = {
  data: null,
  loading: false,
  loaded: false,
  error: false
};

export function playlistInfoReducer(state = initialState, action: fromPlaylist.PlaylistAction): PlaylistsState {
  switch (action.type) {
    case PLAYLIST_TYPES.LOAD_PLAYLIST: {
      return {
        ...state,
        loading: true
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLIST_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        data: action.payload
      }
    }
    case PLAYLIST_TYPES.LOAD_PLAYLIST_FAIL: {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
}

export const getPlaylistsError = (state: PlaylistsState) => state.error;
export const getPlaylistsEntities = (state: PlaylistsState) => state.data;
export const getPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const getPlaylistsLoaded = (state: PlaylistsState) => state.loaded;
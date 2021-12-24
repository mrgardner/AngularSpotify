import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromPlaylists from './playlist.reducer';

export interface PlaylistTablesState {
  playlists: fromPlaylists.PlaylistsState;
};

export const reducers: ActionReducerMap<PlaylistTablesState> = {
  playlists: fromPlaylists.playlistsReducer
};

// user state
export const selectPlaylists = (state: PlaylistTablesState) => state.playlists;

export const getAllPlaylists = createSelector(selectPlaylists, fromPlaylists.getPlaylists);
export const getPlaylistsError = createSelector(selectPlaylists, fromPlaylists.getPlaylistsError);
export const getPlaylistsLoading = createSelector(selectPlaylists, fromPlaylists.getPlaylistsLoading);
export const getPlaylistsLoaded = createSelector(selectPlaylists, fromPlaylists.getPlaylistsLoaded);
export const getCanLoadMore = createSelector(selectPlaylists, fromPlaylists.getCanLoadMore);
export const getNextPlaylists = createSelector(selectPlaylists, fromPlaylists.getNextPlaylists);
export const getSelectedPlaylist = createSelector(selectPlaylists, fromPlaylists.getSelectedPlaylist);
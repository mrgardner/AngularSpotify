import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlaylistsState } from "../model/playlists.model";

// playlist state
export const getPlaylistsState = createFeatureSelector<PlaylistsState>(
  'playlists'
);

export const selectPlaylist = createSelector(getPlaylistsState, (state: PlaylistsState) => state.selectedPlaylist);
export const selectPlaylistsError = createSelector(getPlaylistsState, (state: PlaylistsState) => state.error);
export const selectPlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.playlists);
export const selectLoadingPlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.loading);
export const selectLoadedPlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.loaded);
export const selectCanLoadMorePlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.canLoadMore);
export const selectNextPlaylist = createSelector(getPlaylistsState, (state: PlaylistsState) => state.next);
export const selectPlaylistsType = createSelector(getPlaylistsState, (state: PlaylistsState) => state.type);
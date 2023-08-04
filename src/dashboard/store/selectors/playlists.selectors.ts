import { createSelector } from "@ngrx/store";
import { PlaylistsState } from "../model/playlists.model";
import { DashboardState } from "../model";
import { getDashboardState } from ".";

// playlist state
export const getPlaylistsState = createSelector(getDashboardState, (state: DashboardState) => state.playlists);

export const selectPlaylist = createSelector(getPlaylistsState, (state: PlaylistsState) => state.selectedPlaylist);
export const selectPlaylistsError = createSelector(getPlaylistsState, (state: PlaylistsState) => state.error);
export const selectPlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.playlists);
export const selectPlaylistsLoading = createSelector(getPlaylistsState, (state: PlaylistsState) => state.loading);
export const selectPlaylistsLoaded = createSelector(getPlaylistsState, (state: PlaylistsState) => state.loaded);
export const selectCanLoadMore = createSelector(getPlaylistsState, (state: PlaylistsState) => state.canLoadMore);
export const selectNextPlaylists = createSelector(getPlaylistsState, (state: PlaylistsState) => state.next);
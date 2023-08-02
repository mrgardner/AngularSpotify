import { createSelector } from "@ngrx/store";
import { DashboardState, getDashboardState } from "../reducers";
import { PlaylistsState } from "../model/playlists.model";
import { Playlist } from "@app/interfaces/playlist/playlist.interface";
import { getRouterReducerState } from "@app/store/reducers";

export const selectPlaylists = (state: PlaylistsState) => state.selectedPlaylist;
export const selectPlaylistsError = (state: PlaylistsState) => state.error;
export const selectPlaylistsEntities = (state: PlaylistsState) => state.entities;
export const selectPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const selectPlaylistsLoaded = (state: PlaylistsState) => state.loaded;
export const selectCanLoadMore = (state: PlaylistsState) => state.canLoadMore;
export const selectNextPlaylists = (state: PlaylistsState) => state.nextPlaylist;
export const selectNextPlaylistAndEntitiesState = (state: PlaylistsState) => [state.nextPlaylist, state.entities];

// playlist state
export const getPlaylistsState = createSelector(getDashboardState, (state: DashboardState) => state.playlists);

export const getPlaylistsEntities = createSelector(getPlaylistsState, selectPlaylistsEntities);

export const selectSelectedPlaylist = createSelector(getPlaylistsEntities, getRouterReducerState, (entities: any, router): Playlist => {
  return router.state && entities[router.state.params.playlistId]
});

export const getAllPlaylists = createSelector(getPlaylistsEntities, (entities: any) => {
  return Object.keys(entities).map((id: any) => entities[id]);
});
export const getPlaylistsError = createSelector(getPlaylistsState, selectPlaylistsError);
export const getPlaylistsLoading = createSelector(getPlaylistsState, selectPlaylistsLoading);
export const getPlaylistsLoaded = createSelector(getPlaylistsState, selectPlaylistsLoaded);
export const getCanLoadMore = createSelector(getPlaylistsState, selectCanLoadMore);
export const getNextPlaylists = createSelector(getPlaylistsState, selectNextPlaylists);
export const getNextPlaylistsAndEntities = createSelector(getPlaylistsState, selectNextPlaylistAndEntitiesState)
export const getSelectedPlaylist = createSelector(getPlaylistsState, selectPlaylists);
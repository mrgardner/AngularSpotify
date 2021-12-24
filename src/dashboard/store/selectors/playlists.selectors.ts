import { createSelector } from "@ngrx/store";
import { Playlist } from "@app/interfaces/playlist/playlist.interface";

import * as fromRoot from '@app/store';
import * as fromFeature from '@dashboard/store/reducers';
import * as fromPlaylists from '@dashboard/store/reducers/playlist.reducer';

// playlist state
export const selectPlaylists = (state: fromFeature.PlaylistTablesState) => state.playlists;

export const getPlaylistsEntities = createSelector(selectPlaylists, fromPlaylists.getPlaylistsEntities);

export const getSelectedPlaylist = createSelector(getPlaylistsEntities, fromRoot.getRouterState, (entities, router): Playlist => {
  return router.state && entities[router.state.params.playlistId]
});

export const getAllPlaylists = createSelector(getPlaylistsEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getPlaylistsError = createSelector(selectPlaylists, fromPlaylists.getPlaylistsError);
export const getPlaylistsLoading = createSelector(selectPlaylists, fromPlaylists.getPlaylistsLoading);
export const getPlaylistsLoaded = createSelector(selectPlaylists, fromPlaylists.getPlaylistsLoaded);
export const getCanLoadMore = createSelector(selectPlaylists, fromPlaylists.getCanLoadMore);
export const getNextPlaylists = createSelector(selectPlaylists, fromPlaylists.getNextPlaylists);
// export const getSelectedPlaylist = createSelector(selectPlaylists, fromPlaylists.getSelectedPlaylist);
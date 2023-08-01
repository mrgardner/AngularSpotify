// import { createSelector } from "@ngrx/store";
// import { Playlist } from "@app/interfaces/playlist/playlist.interface";

// import * as fromRoot from '@app/store';
// import * as fromFeature from '@dashboard/store/reducers';
// import * as fromPlaylists from '@dashboard/store/reducers/playlist.reducer';

// // playlist state
// export const getPlaylistsState = createSelector(fromFeature.getDashboardState, (state: fromFeature.DashboardState) => state.playlists);

// export const getPlaylistsEntities = createSelector(getPlaylistsState, fromPlaylists.getPlaylistsEntities);

// export const getSelectedPlaylist = createSelector(getPlaylistsEntities, fromRoot.getRouterReducerState, (entities, router): Playlist => {
//   return router.state && entities[router.state.params.playlistId]
// });

// export const getAllPlaylists = createSelector(getPlaylistsEntities, (entities) => {
//   return Object.keys(entities).map((id: any) => entities[id]);
// });
// export const getPlaylistsError = createSelector(getPlaylistsState, fromPlaylists.getPlaylistsError);
// export const getPlaylistsLoading = createSelector(getPlaylistsState, fromPlaylists.getPlaylistsLoading);
// export const getPlaylistsLoaded = createSelector(getPlaylistsState, fromPlaylists.getPlaylistsLoaded);
// export const getCanLoadMore = createSelector(getPlaylistsState, fromPlaylists.getCanLoadMore);
// export const getNextPlaylists = createSelector(getPlaylistsState, fromPlaylists.getNextPlaylists);
// export const getNextPlaylistsAndEntities = createSelector(getPlaylistsState, fromPlaylists.getNextPlaylistAndEntitiesState)
// export const getSelectedPlaylist = createSelector(selectPlaylists, fromPlaylists.getSelectedPlaylist);
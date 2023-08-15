import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlaylistState } from "../model/playlist.model";

export const getPlaylistState = createFeatureSelector<PlaylistState>(
  'playlist'
);

export const selectError = createSelector(getPlaylistState, (state: PlaylistState) => state.error);
export const selectTracks = createSelector(getPlaylistState, (state: PlaylistState) => state.tracks);
export const selectPageSize = createSelector(getPlaylistState, (state: PlaylistState) => state.pageSize);
export const selectTracksLength = createSelector(getPlaylistState, (state: PlaylistState) => state.tracksLength);
export const selectLoading = createSelector(getPlaylistState, (state: PlaylistState) => state.loading);
export const selectLoaded = createSelector(getPlaylistState, (state: PlaylistState) => state.loaded);
export const selectFollowers = createSelector(getPlaylistState, (state: PlaylistState) => state.followers);
export const selectId = createSelector(getPlaylistState, (state: PlaylistState) => state.id);
export const selectImage = createSelector(getPlaylistState, (state: PlaylistState) => state.image);
export const selectName = createSelector(getPlaylistState, (state: PlaylistState) => state.name);
export const selectOwner = createSelector(getPlaylistState, (state: PlaylistState) => state.owner);
export const selectPublic = createSelector(getPlaylistState, (state: PlaylistState) => state.public);
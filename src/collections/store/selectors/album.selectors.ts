import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlbumState, MoreAlbums } from "../model/album.model";

export const getAlbumState = createFeatureSelector<AlbumState>(
  'albums'
);

export const selectAlbums = createSelector(getAlbumState, (state: AlbumState) => state.albums);
export const selectLoading = createSelector(getAlbumState, (state: AlbumState) => state.loading);
export const selectLoaded = createSelector(getAlbumState, (state: AlbumState) => state.loaded);

export const selectError = createSelector(getAlbumState, (state: AlbumState) => state.error);
export const selectMoreAlbums = createSelector(getAlbumState, (state: AlbumState) => state.moreAlbums);
export const selectNext = createSelector(selectMoreAlbums, (state: MoreAlbums) => state.next);
export const selectTotal = createSelector(selectMoreAlbums, (state: MoreAlbums) => state.total);
export const selectCanLoadMore = createSelector(selectMoreAlbums, (state: MoreAlbums) => state.canLoadMore);
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlbumState } from "../model/albums.model";

export const getAlbumsState = createFeatureSelector<AlbumState>(
  'albums'
);

export const selectAlbums = createSelector(getAlbumsState, (state: AlbumState) => state.albums);
export const selectLoadingAlbums = createSelector(getAlbumsState, (state: AlbumState) => state.loading);
export const selectLoadedAlbums = createSelector(getAlbumsState, (state: AlbumState) => state.loaded);
export const selectAlbumError = createSelector(getAlbumsState, (state: AlbumState) => state.error);
export const selectNextAlbum = createSelector(getAlbumsState, (state: AlbumState) => state.next);
export const selectTotalAlbums = createSelector(getAlbumsState, (state: AlbumState) => state.total);
export const selectCanLoadMoreAlbums = createSelector(getAlbumsState, (state: AlbumState) => state.canLoadMore);
export const selectAlbumsType = createSelector(getAlbumsState, (state: AlbumState) => state.type);
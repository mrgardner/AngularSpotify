import { createSelector } from "@ngrx/store";
import { AlbumState } from "../model/album.model";
import { CollectionsState, getCollectionsState } from "../reducers";

export const getAlbumState = createSelector(getCollectionsState, (state: CollectionsState) => state.albums)

export const selectAlbums = createSelector(getAlbumState, (state: AlbumState) => state.albums);
export const selectLoading = createSelector(getAlbumState, (state: AlbumState) => state.loading);
export const selectLoaded = createSelector(getAlbumState, (state: AlbumState) => state.loaded);
export const selectNext = createSelector(getAlbumState, (state: AlbumState) => state.next);
export const selectTotal = createSelector(getAlbumState, (state: AlbumState) => state.total);
export const selectCanLoadMore = createSelector(getAlbumState, (state: AlbumState) => state.canLoadMore);
export const selectError = createSelector(getAlbumState, (state: AlbumState) => state.error);
export const selectNextAlbumAndPreviousAlbums = createSelector(getAlbumState, (state: AlbumState) => [state.next, state.albums]);
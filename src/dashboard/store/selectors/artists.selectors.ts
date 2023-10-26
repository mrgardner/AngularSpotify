import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArtistsState } from "../model/artists.model";

export const getArtistsState = createFeatureSelector<ArtistsState>(
  'artists'
);

export const selectArtists = createSelector(getArtistsState, (state: ArtistsState) => state.artists);
export const selectLoadingArtists = createSelector(getArtistsState, (state: ArtistsState) => state.loading);
export const selectLoadedArtists = createSelector(getArtistsState, (state: ArtistsState) => state.loaded);
export const selectArtistError = createSelector(getArtistsState, (state: ArtistsState) => state.error);
export const selectNextArtist = createSelector(getArtistsState, (state: ArtistsState) => state.next);
export const selectTotalArtists = createSelector(getArtistsState, (state: ArtistsState) => state.total);
export const selectCanLoadMoreArtists = createSelector(getArtistsState, (state: ArtistsState) => state.canLoadMore);
export const selectArtistsType = createSelector(getArtistsState, (state: ArtistsState) => state.type);
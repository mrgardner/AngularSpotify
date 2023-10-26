import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PodcastsState } from "../model/podcasts.model";

export const getPodcastsState = createFeatureSelector<PodcastsState>(
  'podcasts'
);

export const selectPodcasts = createSelector(getPodcastsState, (state: PodcastsState) => state.podcasts);
export const selectLoadingPodcasts = createSelector(getPodcastsState, (state: PodcastsState) => state.loading);
export const selectLoadedPodcasts = createSelector(getPodcastsState, (state: PodcastsState) => state.loaded);
export const selectPodcastError = createSelector(getPodcastsState, (state: PodcastsState) => state.error);
export const selectNextPodcast = createSelector(getPodcastsState, (state: PodcastsState) => state.next);
export const selectTotalPodcasts = createSelector(getPodcastsState, (state: PodcastsState) => state.total);
export const selectCanLoadMorePodcasts = createSelector(getPodcastsState, (state: PodcastsState) => state.canLoadMore);
export const selectPodcastsType = createSelector(getPodcastsState, (state: PodcastsState) => state.type);
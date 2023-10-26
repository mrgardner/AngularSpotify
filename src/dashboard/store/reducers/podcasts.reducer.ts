import { createReducer, on } from '@ngrx/store';
import { PodcastsApiActions } from '../actions/podcasts.action';
import { PodcastsState } from '../model/podcasts.model';

export const initialState: PodcastsState = {
  podcasts: [],
  loading: false,
  loaded: false,
  next: '',
  error: null,
  canLoadMore: false,
  total: 0,
  type: ''
};

export const podcastsReducer = createReducer(
  initialState,
  on(PodcastsApiActions.loadPodcasts, state => ({
    ...state,
    loading: true
  })),
  on(PodcastsApiActions.loadPodcastsSuccess, (state, { payload }) => ({
    ...state,
    error: null,
    loading: false,
    loaded: true,
    podcasts: payload.podcasts,
    next: payload.next,
    total: payload.total,
    canLoadMore: payload.canLoadMore
  })),
  on(PodcastsApiActions.loadPodcastsFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  }))
);
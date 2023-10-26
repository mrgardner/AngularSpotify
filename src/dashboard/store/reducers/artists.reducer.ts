import { createReducer, on } from '@ngrx/store';
import { ArtistsApiActions } from '../actions/artists.action';
import { ArtistsState } from '../model/artists.model';

export const initialState: ArtistsState = {
  artists: [],
  loading: false,
  loaded: false,
  next: '',
  error: null,
  canLoadMore: false,
  total: 0,
  type: ''
};

export const artistsReducer = createReducer(
  initialState,
  on(ArtistsApiActions.loadArtists, state => ({
    ...state,
    loading: true
  })),
  on(ArtistsApiActions.loadArtistsSuccess, (state, { payload }) => ({
    ...state,
    error: null,
    loading: false,
    loaded: true,
    artists: payload.artists,
    next: payload.next,
    total: payload.total,
    canLoadMore: payload.canLoadMore
  })),
  on(ArtistsApiActions.loadArtistsFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  }))
);
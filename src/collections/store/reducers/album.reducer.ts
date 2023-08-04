import { AlbumState } from '../model/album.model';
import { createReducer, on } from '@ngrx/store';
import { AlbumApiActions } from '../actions/album.action';

export const initialState: AlbumState = {
  albums: [],
  loading: false,
  loaded: false,
  next: '',
  total: 0,
  canLoadMore: false,
  error: null
};

export const albumReducer = createReducer(
  initialState,
  on(AlbumApiActions.album, state => ({
    ...state,
    loading: true
  })),
  on(AlbumApiActions.albumSuccess, (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    next: payload.next,
    albums: payload.albums,
    canLoadMore: payload.canLoadMore,
    total: payload.total
  })),
  on(AlbumApiActions.albumFail, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: payload
  }))
);
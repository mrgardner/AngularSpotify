import { AlbumState } from '../model/album.model';
import { createReducer, on } from '@ngrx/store';
import { AlbumApiActions } from '../actions/album.action';

export const initialState: AlbumState = {
  albums: [],
  loading: false,
  loaded: false,
  error: null,
  moreAlbums: {
    next: '',
    total: 0,
    canLoadMore: false,
  }
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
    albums: payload.albums,
    moreAlbums: payload.moreAlbums
  })),
  on(AlbumApiActions.albumFail, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: payload
  }))
);
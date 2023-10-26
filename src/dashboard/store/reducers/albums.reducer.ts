import { createReducer, on } from '@ngrx/store';
import { AlbumsApiActions } from '../actions/album.action';
import { AlbumState } from '../model/albums.model';

export const initialState: AlbumState = {
  albums: [],
  loading: false,
  loaded: false,
  error: null,
  next: '',
  total: 0,
  canLoadMore: false,
  type: ''
};

export const albumsReducer = createReducer(
  initialState,
  on(AlbumsApiActions.loadAlbums, state => ({
    ...state,
    loading: true
  })),
  on(AlbumsApiActions.loadAlbumsSuccess, (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    albums: payload.albums,
    next: payload.next,
    total: payload.total,
    canLoadMore: payload.canLoadMore
  })),
  on(AlbumsApiActions.loadAlbumsFail, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: payload
  }))
);
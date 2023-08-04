
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import { AlbumState } from '../model/album.model';
import { albumReducer } from './album.reducer';

export interface CollectionsState {
  albums: AlbumState
};

export const reducers: ActionReducerMap<CollectionsState> = {
  albums: albumReducer
};

export const getCollectionsState = createFeatureSelector<CollectionsState>(
  'collections'
);

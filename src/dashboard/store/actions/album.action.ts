import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AlbumsErrorPayload, AlbumsPayload } from '../model/albums.model';
import { ALBUMS_TYPES } from './actions.constant';

export const AlbumsApiActions = createActionGroup({
  source: 'Albums API',
  events: {
    [ALBUMS_TYPES.LOAD_ALBUMS]: emptyProps(),
    [ALBUMS_TYPES.LOAD_ALBUMS_SUCCESS]: props<{ payload: AlbumsPayload }>(),
    [ALBUMS_TYPES.LOAD_ALBUMS_FAIL]: props<{ payload: AlbumsErrorPayload }>()
  }
});
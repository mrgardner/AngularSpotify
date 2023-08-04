import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ALBUM_TYPES } from './actions.constant';
import { AlbumErrorPayload, AlbumPayload } from '../model/album.model';

export const AlbumApiActions = createActionGroup({
  source: 'Albums API',
  events: {
    [ALBUM_TYPES.ALBUM]: emptyProps(),
    [ALBUM_TYPES.ALBUM_SUCCESS]: props<{ payload: AlbumPayload }>(),
    [ALBUM_TYPES.ALBUM_FAIL]: props<{ payload: AlbumErrorPayload }>(),
  }
});
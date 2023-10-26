import { ARTISTS_TYPES } from '@dashboard/store/actions/actions.constant';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArtistsErrorPayload, ArtistsPayload } from '../model/artists.model';

export const ArtistsApiActions = createActionGroup({
  source: 'Artists API',
  events: {
    [ARTISTS_TYPES.LOAD_ARTISTS]: emptyProps(),
    [ARTISTS_TYPES.LOAD_ARTISTS_SUCCESS]: props<{ payload: ArtistsPayload }>(),
    [ARTISTS_TYPES.LOAD_ARTISTS_FAIL]: props<{ payload: ArtistsErrorPayload }>()
  }
});
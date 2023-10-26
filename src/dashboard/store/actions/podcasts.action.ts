import { PODCASTS_TYPES } from '@dashboard/store/actions/actions.constant';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PodcastsErrorPayload, PodcastsPayload } from '../model/podcasts.model';

export const PodcastsApiActions = createActionGroup({
  source: 'Podcasts API',
  events: {
    [PODCASTS_TYPES.LOAD_PODCASTS]: emptyProps(),
    [PODCASTS_TYPES.LOAD_PODCASTS_SUCCESS]: props<{ payload: PodcastsPayload }>(),
    [PODCASTS_TYPES.LOAD_PODCASTS_FAIL]: props<{ payload: PodcastsErrorPayload }>()
  }
});
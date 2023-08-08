import { SortedTrack } from '@app/interfaces/track/track.interface';
import { createActionGroup, props } from '@ngrx/store';
import { PLAYLIST_TYPES } from '@playlist/store/actions/actions.constant';
import { LoadPlaylistTracksPayload, PlaylistErrorPayload } from '../model/playlist.model';

export const PlaylistApiActions = createActionGroup({
  source: 'Playlist API',
  events: {
    [PLAYLIST_TYPES.LOAD_PLAYLIST]: props<{ payload: LoadPlaylistTracksPayload }>(),
    [PLAYLIST_TYPES.LOAD_PLAYLIST_FAIL]: props<{ payload: PlaylistErrorPayload }>(),
    [PLAYLIST_TYPES.LOAD_PLAYLIST_SUCCESS]: props<{ payload: SortedTrack[] }>()
  }
});
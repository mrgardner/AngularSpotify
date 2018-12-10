import {SongContext} from './song-context.interface';
import { SongRestrictions } from './song-restrictions.interface';
import { SongDisallows } from './song-disallows.interface';
import { TrackWindow } from '../track/track-window.interface';

export interface SpotifySongResponse {
  bitrate: number;
  context: SongContext;
  disallows: SongDisallows;
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  restrictions: SongRestrictions;
  shuffle: boolean;
  timestamp: number;
  track_window: TrackWindow;
}

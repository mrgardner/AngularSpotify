import { TrackWindow } from '@app/interfaces/track/track.interface';

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

interface SongContext {
  metadata: any;
  uri: string;
}

interface SongDisallows {
  pausing: boolean;
  skipping_prev: boolean;
}

interface SongRestrictions {
  disallow_pausing_reasons: Array<string>;
  disallow_skipping_prev_reasons: Array<string>;
}
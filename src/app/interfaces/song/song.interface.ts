// Interfaces
import { TrackWindow } from '@interfaces/track/track.interface';

export interface SpotifySongResponse {
  bitrate: number;
  context: {
    metadata: Object;
    uri: string;
  };
  disallows: {
    pausing: boolean;
    skipping_prev: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  restrictions: {
    disallow_pausing_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  };
  shuffle: boolean;
  timestamp: number;
  track_window: TrackWindow;
}

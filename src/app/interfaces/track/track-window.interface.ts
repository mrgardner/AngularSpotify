import { Track } from './track.interface';

export interface TrackWindow {
  current_track: Track;
  next_tracks: Array<Track>;
  previous_tracks: Array<Track>;
}

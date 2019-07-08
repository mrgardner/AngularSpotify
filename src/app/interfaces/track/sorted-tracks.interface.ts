import { SortedTrack } from './sorted-track.interface';

export interface SortedTracks {
  title: string;
  artist: string;
  album_name: string;
  addedAt: string;
  time: number;
  isPlayButtonShowing: boolean;
  isPauseButtonShowing: boolean;
  duration: number;
  uri: string;
  track: SortedTrack;
  total: number;
  size: number;
}

import { SortedTrack } from './sorted-track.interface';

export interface TrackSpotifyReponse {
  href: string;
  items: Array<SortedTrack>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

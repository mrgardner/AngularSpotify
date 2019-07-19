import { Playlist } from './playlist.interface';

export interface SpotifyPlaylistRespose {
  href: string;
  items: Array<Playlist>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  testing: boolean;
}

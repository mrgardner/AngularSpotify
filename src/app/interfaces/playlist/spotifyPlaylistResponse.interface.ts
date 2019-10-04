import { Playlist } from './playlist.interface';

export interface SpotifyPlaylistRespose {
  items: Array<Playlist>;
  next: string;
  total: number;
}

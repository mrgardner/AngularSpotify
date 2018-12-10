import { Album } from './album.interface';

export interface SpotifyAlbumsResponse {
  href: string;
  items: Array<Album>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

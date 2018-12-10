export interface SpotifyPlaylistRespose {
  href: string;
  items: Array<Object>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

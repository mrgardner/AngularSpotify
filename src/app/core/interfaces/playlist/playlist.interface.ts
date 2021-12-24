// Interfaces
import { ExternalUrls, Owner } from '@core/interfaces/misc/misc.interface';
import { Image } from '@core/interfaces/image/image.interface';
import { Tracks } from '@core/interfaces/track/track.interface';

export interface Playlist {
  collaborative: boolean;
  external_urls: ExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
  owner: Owner;
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
  selected: boolean;
  selectedUrl: string;
}

export interface SpotifyPlaylistRespose {
  items: Array<Playlist>;
  next: string;
  total: number;
}

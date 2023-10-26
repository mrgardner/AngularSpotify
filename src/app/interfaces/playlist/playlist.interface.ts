import { Image } from '@app/interfaces/image/image.interface';
import { ExternalUrls, Owner } from '@app/interfaces/misc/misc.interface';
import { Tracks } from '@app/interfaces/track/track.interface';

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

export interface PlaylistInfo {
  id: string;
  name: string;
  image: string;
  ownerId: string;
  ownerName: string;
}

export interface SpotifyPlaylistRespose {
  items: Array<Playlist>;
  next: string;
  total: number;
}
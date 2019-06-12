import { Artist } from '../artist/artist.interface';
import { Album } from '../album/album.interface';
import { ExternalUrls } from '../misc/external-urls.interface';
import { ExternalIds } from '../misc/external-ids.interface';

export interface Track {
  album: Album;
  artists: Array<Artist>;
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  isPlayButtonShowing: boolean;
  isPauseButtonShowing: boolean;
  remove: boolean;
  album_name: string;
  title: string;
  artist: string;
  time: string;
  addedAt: string;
}

import { Artist } from '@app/interfaces/artist/artist.interface';
import { Image } from '@app/interfaces/image/image.interface';
import { ExternalUrls } from '@app/interfaces/misc/misc.interface';

export interface Album {
  album_type: string;
  artists: Array<Artist>;
  available_markets: Array<string>;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_track: number;
  type: string;
  uri: string;
}

export interface AlbumInfo {
  id: string;
  name: string;
  image: string;
}
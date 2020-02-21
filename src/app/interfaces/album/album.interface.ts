// Interfaces
import { Artist } from '@interfaces/artist/artist.interface';
import { ExternalUrls } from '@interfaces/misc/misc.interface';
import { Image } from '@interfaces/image/image.interface';

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_track: number;
  type: string;
  uri: string;
}

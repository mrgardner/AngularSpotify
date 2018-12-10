import { Image } from '../image/image.interface';
import { Artist } from '../artist/artist.interface';
import { ExternalUrls } from '../misc/external-urls.interface';

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

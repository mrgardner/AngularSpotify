import { ExternalUrls } from '../misc/external-urls.interface';
import { Image } from '../image/image.interface';
import { Tracks } from '../track/tracks.interface';
import { Owner } from '../misc/owner.interface';


export interface Playlist {
  collaborative: boolean;
  external_urls: ExternalUrls;
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
}

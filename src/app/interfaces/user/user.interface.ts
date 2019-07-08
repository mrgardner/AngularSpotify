import { UserExternalUrls } from './user-external-urls.interface';
import { UserFollowers } from './user-followers.interface';
import { UserExplicitContent } from './user-explicit-content.interface';
import { Image } from '../image/image.interface';

export interface User {
  birthdate: string;
  country: string;
  display_name: string;
  email: string;
  explicit_content: UserExplicitContent;
  external_urls: UserExternalUrls;
  followers: UserFollowers;
  href: string;
  id: string;
  images: Array<Image>;
  product: string;
  type: string;
  uri: string;
}

import { Image } from "../image/image.interface";

export interface Artist {
  external_urls: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  images: Image[]
}

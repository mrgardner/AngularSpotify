// Interfaces
import { Album } from '@core/interfaces/album/album.interface';
import { Artist } from '@core/interfaces/artist/artist.interface';
import { AddedBy, ExternalIds, ExternalUrls, VideoThumbnail } from '@core/interfaces/misc/misc.interface';

export interface TrackResponse {
  total: number;
  limit: number;
  items: Array<any>;
}

export interface Trrack {
  added_at: string;
  track: {
    album: {
      name: string;
    };
    artists: [Artist];
    name: string;
    duration_ms: number;
    uri: string;
  };
}

export interface SortedTrack {
  title: string;
  artist: string;
  album_name: string;
  added_at: string;
  time: number;
  showPlayButton: boolean;
  showPauseButton: boolean;
  showTrackNumber: boolean;
  duration: number;
  uri: string;
  total: number;
  size: number;
  filterText: string;
}

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
  time: number;
  addedAt: string;
  duration: number;
  filterText: string;
  added_at: string;
  total: number;
  size: number;
  showPlayButton: boolean;
  showPauseButton: boolean;
  showTrackNumber: boolean;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface TrackWindow {
  current_track: Track;
  next_tracks: Array<Track>;
  previous_tracks: Array<Track>;
}

export interface CurrentTrack {
  added_at: string;
  added_by: AddedBy;
  highlight: boolean;
  isPauseButtonShowing: boolean;
  isPlayButtonShowing: boolean;
  is_local: boolean;
  primary_color: string;
  track: SortedTrack;
  video_thumbnail: VideoThumbnail;
}

export interface TrackSpotifyReponse {
  href: string;
  items: Array<Track>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface SortedTracks {
  title: string;
  artist: string;
  album_name: string;
  addedAt: string;
  time: number;
  isPlayButtonShowing: boolean;
  isPauseButtonShowing: boolean;
  duration: number;
  uri: string;
  track: SortedTrack;
  total: number;
  size: number;
  filterText: string;
}

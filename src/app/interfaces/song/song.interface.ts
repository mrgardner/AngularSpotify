import { Track } from '../track/track.interface';
import { AddedBy } from '../misc/added-by.interface';
import { VideoThumbnail } from '../misc/video-thumbnail.interface';

export interface Song {
  added_at: string;
  added_by: AddedBy;
  isPauseButtonShowing: boolean;
  isPlayButtonShowing: boolean;
  is_local: boolean;
  primary_color: boolean;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

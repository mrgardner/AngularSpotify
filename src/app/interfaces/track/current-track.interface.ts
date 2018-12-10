import { Track } from './track.interface';
import { AddedBy } from '../misc/added-by.interface';
import { VideoThumbnail } from '../misc/video-thumbnail.interface';

export interface CurrentTrack {
  added_at: string;
  added_by: AddedBy;
  highlight: boolean;
  isPauseButtonShowing: boolean;
  isPlayButtonShowing: boolean;
  is_local: boolean;
  primary_color: string;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

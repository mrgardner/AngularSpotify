import { Track } from './track.interface';
import { VideoThumbnail } from '../misc/video-thumbnail.interface';

export interface SortedTrack {
  added_at: string;
  added_by: string;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

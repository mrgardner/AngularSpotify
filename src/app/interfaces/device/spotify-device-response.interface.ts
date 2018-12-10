import {Device} from './device.interface';
import { Track } from '../track/track.interface';

export interface SpotifyDeviceResponse {
  context: string;
  currently_playing_type: string;
  device: Device;
  is_playing: boolean;
  item: Track;
  progress_ms: number;
  repeat_state: string;
  shuffle_state: boolean;
  timestamp: number;
}

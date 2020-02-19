import { SortedTrack } from '../track/track.interface';

export interface Device {
  id: string;
  is_active: boolean;
  is_private_sesssion: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyDeviceResponse {
  context: string;
  currently_playing_type: string;
  device: Device;
  is_playing: boolean;
  item: SortedTrack;
  progress_ms: number;
  repeat_state: string;
  shuffle_state: boolean;
  timestamp: number;
}

export interface SpotifyDevicesResponse {
  devices: Array<Device>;
}

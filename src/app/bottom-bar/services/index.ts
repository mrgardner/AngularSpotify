import { SpotifyPlaybackService } from '@core/services/spotify-playback/spotify-playback.service';
import { DeviceModalService } from './device-modal/device-modal.service';

export const bottomBarServices: any[] = [
  DeviceModalService,
  SpotifyPlaybackService
];

export * from '../../core/services/spotify-playback/spotify-playback.service';

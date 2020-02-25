import { SpotifySongResponse } from '../song/song.interface';

export interface SpotifyPlayer {
  connect: () => void;
  on: (t: string, tt) => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  getCurrentState: () => SpotifySongResponse;
}

export interface PlayerData {
  device_id: string;
}

export interface PlayerParameters {
  name: string;
  volume: number;
  getOAuthToken: (cb) => void;
}

export interface PlayerCallback {
  cb: (cb: (t) => {}) => void;
}

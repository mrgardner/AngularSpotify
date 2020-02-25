// Interfaces
import { PlayerParameters } from '../player/player.interface';

interface SpotifyWindow extends Window {
  Spotify: SpotifyWindow;
  onSpotifyWebPlaybackSDKReady: () => void;
  Player: (data: PlayerParameters) => void;
}


export {};
declare global {
  interface Window {
    Spotify: SpotifyWindow;
    onSpotifyWebPlaybackSDKReady: () => void;
    Player: (data: PlayerParameters) => void;
    spotifyCallback: () => void;
  }
}

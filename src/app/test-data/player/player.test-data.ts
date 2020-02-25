// Interfaces
import { SpotifyPlayer } from '@interfaces/player/player.interface';

// Testing Data
import { mockSongState } from '@test-data/song/song.test-data';

const mockPlayer = (): SpotifyPlayer => {
  return {
    connect: () => {},
    on: (t: string, tt) => {},
    pause: () => {},
    resume: () => {},
    nextTrack: () => {},
    previousTrack: () => {},
    setVolume: (volume: number) => {},
    getCurrentState: () => {
      return mockSongState;
    }
  };
};

export { mockPlayer };

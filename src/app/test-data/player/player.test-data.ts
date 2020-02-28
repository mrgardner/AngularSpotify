// Interfaces
import { SpotifyPlayer } from '@interfaces/player/player.interface';

// Testing Data
import { mockSongState } from '@test-data/song/song.test-data';

const mockPlayer = (): SpotifyPlayer => {
  return {
    connect: () => {},
    on: () => {},
    pause: () => {},
    resume: () => {},
    nextTrack: () => {},
    previousTrack: () => {},
    setVolume: () => {},
    getCurrentState: () => {
      return mockSongState;
    }
  };
};

export { mockPlayer };

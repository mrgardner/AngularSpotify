// Interfaces

const mockSpotifyWindow: Window = {
  Spotify: new Window(),
  onSpotifyWebPlaybackSDKReady: () => {},
  Player: (data) => {},
  ...new Window()
};

const mockAuthWindow = (hash: string) => {
  return {
    hash,
    close: () => {},
    ...new Window()
  };
};

export { mockAuthWindow, mockSpotifyWindow };

import { TestBed } from '@angular/core/testing';

import { SpotifyPlaybackService } from './spotify-playback.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpotifyPlaybackService', () => {
  let spotifyPlaybackService: SpotifyPlaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        SpotifyPlaybackService
      ]
    });

    spotifyPlaybackService = TestBed.get(SpotifyPlaybackService);
  });

  afterEach(() => {
    spotifyPlaybackService = null;
  });

  it('should be created', () => {
    expect(spotifyPlaybackService).toBeTruthy();
  });
});

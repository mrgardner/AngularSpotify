import { TestBed } from '@angular/core/testing';

import { SpotifyPlaybackService } from './spotify-playback.service';

describe('SpotifyPlaybackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyPlaybackService = TestBed.get(SpotifyPlaybackService);
    expect(service).toBeTruthy();
  });
});

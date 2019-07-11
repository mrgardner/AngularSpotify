import { TestBed } from '@angular/core/testing';
import { SpotifyInterceptorService } from './spotify-interceptor.service';

describe('SpotifyInterceptorService', () => {
  let spotifyInterceptorService: SpotifyInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpotifyInterceptorService
      ]
    });

    spotifyInterceptorService = TestBed.get(SpotifyInterceptorService);
  });

  it('should be created', () => {
    expect(spotifyInterceptorService).toBeTruthy();
  });
});

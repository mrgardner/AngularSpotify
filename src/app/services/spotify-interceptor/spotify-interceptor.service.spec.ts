import { TestBed } from '@angular/core/testing';

import { SpotifyInterceptorService } from './spotify-interceptor.service';

describe('SpotifyInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyInterceptorService = TestBed.get(SpotifyInterceptorService);
    expect(service).toBeTruthy();
  });
});

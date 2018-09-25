import { TestBed, async, inject } from '@angular/core/testing';

import { SpotifyGuard } from './spotify.guard';

describe('SpotifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyGuard]
    });
  });

  it('should ...', inject([SpotifyGuard], (guard: SpotifyGuard) => {
    expect(guard).toBeTruthy();
  }));
});

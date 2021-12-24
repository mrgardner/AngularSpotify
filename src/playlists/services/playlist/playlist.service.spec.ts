// Services
import { PlaylistService } from '@services/playlist/playlist.service';

// Testing
import { TestBed } from '@angular/core/testing';

describe('PlaylistService', () => {
  let playlistService: PlaylistService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaylistService
      ]
    });

    playlistService = TestBed.inject(PlaylistService);
  });

  afterEach(() => {
    playlistService = null;
  });

  it('should be create playlist service', () => {
    expect(playlistService).toBeTruthy();
  });

  it('should check selectPlaylist method', () => {
    const spy = spyOn(playlistService.selectPlaylist$, 'emit');
    playlistService.selectPlaylist('');
    expect(spy).toHaveBeenCalled();
  });
});

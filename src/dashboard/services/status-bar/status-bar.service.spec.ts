// Interfaces
import { CurrentTrack } from '@app/interfaces/track/track.interface';

// Services
import { StatusBarService } from '@dashboard/services/status-bar/status-bar.service';

// Testing
import { TestBed } from '@angular/core/testing';

describe('StatusBarService', () => {
  let statusBarService: StatusBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusBarService
      ]
    });

    statusBarService = TestBed.inject(StatusBarService);
  });

  afterEach(() => {
    statusBarService = null;
  });

  it('should be created', () => {
    expect(statusBarService).toBeTruthy();
  });

  it('should check setCurrentTrack', () => {
    const currentTrack: CurrentTrack = {
      added_at: 'string',
      added_by: {
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        type: '',
        uri: ''
      },
      highlight: true,
      isPauseButtonShowing: true,
      isPlayButtonShowing: true,
      is_local: true,
      primary_color: '',
      track: {
        title: '',
        artist: '',
        album_name: '',
        added_at: '',
        time: 0,
        showPlayButton: false,
        showPauseButton: false,
        showTrackNumber: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      },
      video_thumbnail: {
        url: ''
      }
    };
    const spy = spyOn(statusBarService.currentTrack$, 'emit');
    statusBarService.setCurrentTrack(currentTrack);
    expect(spy).toHaveBeenCalledWith(currentTrack);
  });
});

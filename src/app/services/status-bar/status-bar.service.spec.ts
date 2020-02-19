import { TestBed } from '@angular/core/testing';
import { StatusBarService } from './status-bar.service';
import { CurrentTrack } from '../../interfaces/track/current-track.interface';

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
        album: {
          album_type: '',
          artists: [],
          available_markets: [],
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: '',
          release_date: '',
          release_date_precision: '',
          total_track: 0,
          type: '',
          uri: ''
        },
        artists: [],
        available_markets: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: '',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: '',
        artist: '',
        time: '',
        addedAt: '',
        duration: 0
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

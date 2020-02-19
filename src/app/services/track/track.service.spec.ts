import { TestBed } from '@angular/core/testing';
import { TrackService } from './track.service';
import { Track } from '../../interfaces/track/track.interface';

describe('TrackService', () => {
  let trackService: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackService
      ]
    });

    trackService = TestBed.inject(TrackService);
  });

  afterEach(() => {
    trackService = null;
  });

  it('should be created', () => {
    expect(trackService).toBeTruthy();
  });

  it('should check the checkDuplicates method', () => {
    const spy = spyOn(trackService.checkDuplicate$, 'emit');
    trackService.checkDuplicate(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should check the filterDuplicateTrack method with args set to false', () => {
    const tracks: Array<Track> = [
      {
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
      }
    ];
    const result = trackService.filterDuplicateTracks(tracks, false);
    expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true', () => {
    const expectTracks = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      },
    ];
    const tracks: Array<Track> = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test1',
        artist: '',
        time: '',
        addedAt: '',
        duration: 10
      }
    ];
    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectTracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in asc', () => {
    const expectTracks = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      }
    ];
    const tracks: Array<Track> = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test1',
        artist: '',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      }
    ];
    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(4);
    expect(result).toEqual(expectTracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in dsc', () => {
    const expectTracks = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: false,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      }
    ];
    const tracks: Array<Track> = [
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test1',
        artist: '',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'zzzzz',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '123',
        time: '',
        addedAt: '',
        duration: 10
      },
      {
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
        duration_ms: 10,
        explicit: true,
        external_ids: {
          isrc: ''
        },
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        name: 'Test',
        popularity: 0,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: '',
        isPlayButtonShowing: true,
        isPauseButtonShowing: true,
        remove: true,
        album_name: '',
        title: 'Test',
        artist: '543',
        time: '',
        addedAt: '',
        duration: 10
      }
    ];
    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(4);
    expect(result).toEqual(expectTracks);
  });
});

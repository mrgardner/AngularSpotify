// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { HttpClientModule } from '@angular/common/http';
import { isObservable, of } from 'rxjs';

// Services
import { ApolloService } from '@services/apollo/apollo.service';
import { PlaylistDataSourceService } from '@services/playlist-data-source/playlist-data-source.service';

// Testing
import { TestBed } from '@angular/core/testing';

describe('PlaylistDataSourceService', () => {
  let playlistDataSourceService: PlaylistDataSourceService;
  let apolloService: ApolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        PlaylistDataSourceService,
        Apollo
      ]
    });

    playlistDataSourceService = TestBed.inject(PlaylistDataSourceService);
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    playlistDataSourceService = null;
    apolloService = null;
  });

  it('should be created', () => {
    expect(playlistDataSourceService).toBeTruthy();
  });

  it('should check connect method', () => {
    const result = playlistDataSourceService.connect();
    expect(isObservable(result)).toBeTruthy();
  });

  it('should check disconnect method', () => {
    const spy = spyOn(playlistDataSourceService.tableSubject, 'complete');
    playlistDataSourceService.disconnect();
    expect(spy).toHaveBeenCalled();
  });

  it('should check loadTracks method with no tracks', () => {
    const spy = spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of({
      href: '',
      items: [],
      limit: 100,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    }));
    const tableSpy = spyOn(playlistDataSourceService.tableSubject, 'next');
    playlistDataSourceService.loadTracks('');
    expect(spy).toHaveBeenCalled();
    expect(tableSpy).toHaveBeenCalled();
  });

  it('should check loadTracks method with one track', () => {
    const spy = spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of({
      href: '',
      items: [
        {
          added_at: '',
          added_by: '',
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
            addedAt: ''
          },
          video_thumbnail: {
            url: ''
          }
        }
      ],
      limit: 100,
      next: '',
      offset: 0,
      previous: '',
      total: 1
    }));
    const tableSpy = spyOn(playlistDataSourceService.tableSubject, 'next');
    playlistDataSourceService.loadTracks('');
    expect(spy).toHaveBeenCalled();
    expect(tableSpy).toHaveBeenCalled();
  });
});

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
import { mockPlaylistTracks } from '@test-data/apollo/apollo.test-data';

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
    const spy = spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '', '')));
    const tableSpy = spyOn(playlistDataSourceService.tableSubject, 'next');
    playlistDataSourceService.loadTracks('');
    expect(spy).toHaveBeenCalled();
    expect(tableSpy).toHaveBeenCalled();
  });

  it('should check loadTracks method with one track', () => {
    const spy = spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '', '')));
    const tableSpy = spyOn(playlistDataSourceService.tableSubject, 'next');
    playlistDataSourceService.loadTracks('');
    expect(spy).toHaveBeenCalled();
    expect(tableSpy).toHaveBeenCalled();
  });
});

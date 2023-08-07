import { TestBed } from '@angular/core/testing';
import { PLAYLIST_INFO, PLAYLIST_NAME, PLAYLIST_TRACKS } from '@app/queries/get-playlists';
import { USER_DISPLAY_NAME } from '@app/queries/get-user';
import { Apollo } from 'apollo-angular';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ApolloService } from './apollo.service';

describe('ApolloService', () => {
  let apolloService: ApolloService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule
      ],
      providers: [
        Apollo
      ]
    });

    apolloService = TestBed.inject(ApolloService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(apolloService).toBeTruthy();
  });

  it('should check the getUserDisplayName method', () => {
    const expectedResult = {
      display_name: 'test'
    };

    apolloService.getUserDisplayName().subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const op = controller.expectOne(USER_DISPLAY_NAME);
    expect(op.operation.variables.url).toEqual('https://api.spotify.com/v1/me');

    op.flush({
      data: {
        user: expectedResult
      }
    });
  });

  it('should check the getPlaylists method with no parameter', () => {
    const expectedResult = {
      total: 0,
      items: [
        {
          name: 'test',
          id: 'test'
        }
      ],
      next: ''
    };

    apolloService.getPlaylists(0).subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const op = controller.expectOne(PLAYLIST_NAME);
    expect(op.operation.variables.url).toEqual('https://api.spotify.com/v1/me/playlists?limit=50');

    op.flush({
      data: {
        playlists: expectedResult
      }
    });
  });

  it('should check the getPlaylists method with parameter', () => {
    const expectedResult = {
      total: 0,
      items: [
        {
          name: 'test',
          id: 'test'
        }
      ],
      next: ''
    };

    apolloService.getPlaylists(50).subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const op = controller.expectOne(PLAYLIST_NAME);
    expect(op.operation.variables.url).toEqual(50);

    op.flush({
      data: {
        playlists: expectedResult
      }
    });
  });

  it('should check the getPlaylist', () => {
    const expectedResult = {
      name: 'test',
      owner: {
        display_name: 'test'
      },
      tracks: {
        total: 0
      },
      images: {
        url: 'test'
      }
    };

    apolloService.getPlaylist('123').subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const op = controller.expectOne(PLAYLIST_INFO);
    expect(op.operation.variables.url).toEqual('https://api.spotify.com/v1/playlists/123');

    op.flush({
      data: {
        playlist: expectedResult
      }
    });
  });

  it('should check the getTracksFromPlaylists', () => {
    const expectedResult = {
      total: 0,
      limit: 0,
      items: {
        added_at: '',
        track: {
          album: {
            name: 'test'
          },
          artists: {
            name: 'test'
          },
          name: 'test',
          duration_ms: 0,
          uri: 'test'
        }
      }
    };

    apolloService.getTracksFromPlaylist('123', 0, 50).subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const op = controller.expectOne(PLAYLIST_TRACKS);
    expect(op.operation.variables.url).toEqual('https://api.spotify.com/v1/playlists/123/tracks?offset=0&limit=50');

    op.flush({
      data: {
        playlistTracks: expectedResult
      }
    });
  });
});
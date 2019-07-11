import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

 // TODO: Add cases for what the http call returns for response and test it.
describe('SpotifyService', () => {
  let spotifyService: SpotifyService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        SpotifyService
      ]
    });

    spotifyService = TestBed.get(SpotifyService);
    http = TestBed.get(HttpClient);
  });

  afterEach(() => {
    spotifyService = null;
    http = null;
  });

  it('should be created', () => {
    expect(SpotifyService).toBeTruthy();
  });

  it('should check getUser method', () => {
    const spy = spyOn(http, 'get');
    spotifyService.getUser();
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me');
  });

  it('should check getAllPlaylists method with no parameter', () => {
    const spy = spyOn(http, 'get');
    spotifyService.getAllPlaylists();
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/playlists?limit=50');
  });

  it('should check getAllPlaylists method with a parameter', () => {
    const playlistUrl = 'https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50';
    const spy = spyOn(http, 'get');
    spotifyService.getAllPlaylists(playlistUrl);
    expect(spy).toHaveBeenCalledWith(playlistUrl);
  });

  it('should check getTrack method', () => {
    const spy = spyOn(http, 'get');
    spotifyService.getTrack('test');
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/tracks/test');
  });

  it('should check getTracksFromPlaylist method', () => {
    const spy = spyOn(http, 'get');
    const offset = 0;
    const limit = 50;
    spotifyService.getTracksFromPlaylist('test', offset, limit);
    expect(spy).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/playlists/test/tracks',
      {
        params: new HttpParams()
        .set('offset', offset.toString())
        .set('limit', limit.toString())
      }
      );
  });
});

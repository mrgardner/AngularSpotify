import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { of } from 'rxjs';
import { SortedTrack } from '../../interfaces/track/track.interface';

describe('SpotifyService', () => {
  let spotifyService: SpotifyService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        SpotifyService
      ]
    });

    spotifyService = TestBed.inject(SpotifyService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    spotifyService = null;
    http = null;
  });

  it('should be created', () => {
    expect(SpotifyService).toBeTruthy();
  });

  it('should check getUser method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getUser().subscribe(user => {
      expect(user).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me');
  });

  it('should check getAllPlaylists method with no parameter', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getAllPlaylists().subscribe(playlist => {
      expect(playlist).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/playlists?limit=50');
  });

  it('should check getAllPlaylists method with a parameter', () => {
    const playlistUrl = 'https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50';
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getAllPlaylists(playlistUrl).subscribe(playlist => {
      expect(playlist).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith(playlistUrl);
  });

  it('should check getTrack method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getTrack('test').subscribe(track => {
      expect(track).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/tracks/test');
  });

  it('should check getTracksFromPlaylist method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    const offset = 0;
    const limit = 50;
    spotifyService.getTracksFromPlaylist('test', offset, limit).subscribe(playlist => {
      expect(playlist).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/playlists/test/tracks',
      {
        params: new HttpParams()
        .set('offset', offset.toString())
        .set('limit', limit.toString())
      }
      );
  });

  it('should check getPlaylist method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getPlaylist('test').subscribe(playlist => {
      expect(playlist).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/playlists/test');
  });

  it('should check shuffleTracks method', () => {
    const tracks: Array<SortedTrack> = [
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      },
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      }
    ];
    const shuffledTracks = spotifyService.shuffleTracks(tracks);
    expect(shuffledTracks.length).toEqual(2);
  });

  it('should check addTracksToPlaylist method', () => {
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    const uris = ['test', 'test'];
    spotifyService.addTracksToPlaylist('test', 'test123', uris).subscribe(track => {
      expect(track).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists/test123/tracks', {
      uris
    });
  });

  it('should check postTracksToPlaylist method', () => {
    const spy = spyOn(http, 'post').and.returnValue(of('test'));
    const uris = ['test', 'test'];
    spotifyService.postTracksToPlaylist('test', 'test123', uris).subscribe(track => {
      expect(track).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists/test123/tracks', {
      uris
    });
  });

  it('should check playSpotifyTrack method', () => {
    const tracks: Array<SortedTrack> = [
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      }
    ];
    const song: SortedTrack = {
      title: '',
      artist: '',
      added_at: '',
      album_name: '',
      time: 0,
      showPauseButton: false,
      showPlayButton: false,
      duration: 0,
      uri: '',
      total: 0,
      size: 0,
      filterText: ''
    };
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    spotifyService.playSpotifyTrack(tracks, song).subscribe(track => {
      expect(track).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/play?null', {
      uris: ['test'], offset: {position: 0}
    });
  });

  it('should check setRepeatMode method', () => {
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    spotifyService.setRepeatMode('context', 'test').subscribe(mode => {
      expect(mode).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/repeat?state=context&device_id=test', {});
  });

  it('should check getCurrentPlayer method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getCurrentPlayer().subscribe(player => {
      expect(player).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player');
  });

  it('should check makeDeviceActive method', () => {
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    spotifyService.makeDeviceActive('test').subscribe(device => {
      expect(device).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player', {
      device_ids: ['test'], play: true
    });
  });

  it('should check getAvailableDevices method', () => {
    const spy = spyOn(http, 'get').and.returnValue(of('test'));
    spotifyService.getAvailableDevices().subscribe(devices => {
      expect(devices).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/devices');
  });

  it('should check createPlaylist method', () => {
    const spy = spyOn(http, 'post').and.returnValue(of('test'));
    spotifyService.createPlaylist({test: 'test'}).subscribe(devices => {
      expect(devices).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/playlists', {test: 'test'});
  });

  it('should check uploadPlaylistCover method', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    spotifyService.uploadPlaylistCover(mockFile, 'test', 'test').subscribe(file => {
      expect(file).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists/test/images', mockFile);
  });

  it('should check createNewPlaylist method', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    spyOn(spotifyService, 'createPlaylist').and.returnValue(of({id: 'test', owner: {id: 'test'}}));
    spotifyService.createNewPlaylist({test: 'test'}, mockFile).subscribe(playlist => {
      expect(playlist).toEqual('test');
    });
  });

  it('should check getUsersSavedAlbums method with no parameter', () => {
    const spy = spyOn(http, 'get');
    spotifyService.getUsersSavedAlbums();
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/me/albums');
  });

  it('should check getUsersSavedAlbums method with a parameter', () => {
    const playlistUrl = 'https://api.spotify.com/v1/me/albums?offset=50&limit=50';
    const spy = spyOn(http, 'get');
    spotifyService.getUsersSavedAlbums(playlistUrl);
    expect(spy).toHaveBeenCalledWith(playlistUrl);
  });

  it('should check replaceTrack method', () => {
    const spy = spyOn(http, 'put').and.returnValue(of('test'));
    spotifyService.replaceTrack('test', 'test', 0, 1).subscribe(album => {
      expect(album).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists/test/tracks', {
      range_start: 0,
      insert_before: 1
    });
  });

  it('should check mapTrackURIs method', () => {
    const tracks: Array<SortedTrack> = [
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      },
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      }
    ];

    const result = spotifyService.mapTrackURIs(tracks);
    const expectedResults = ['test', 'test2'];
    expect(result).toEqual(expectedResults);
  });

  it('should check removeTracks method', () => {
    const tracks: Array<SortedTrack> = [
      {
        title: '',
        artist: '',
        added_at: '',
        album_name: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
        duration: 0,
        uri: '',
        total: 0,
        size: 0,
        filterText: ''
      }
    ];
    const spy = spyOn(http, 'delete').and.returnValue(of('test'));
    spotifyService.removeTracks('test', 'test', tracks).subscribe(album => {
      expect(album).toEqual('test');
    });
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists/test/tracks', {
      headers: null,
      body: tracks
    });
  });
});

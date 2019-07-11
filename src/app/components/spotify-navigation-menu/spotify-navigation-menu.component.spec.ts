import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyNavigationMenuComponent } from './spotify-navigation-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { Routes, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusBarService } from '../../services/status-bar/status-bar.service';
import { of } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { PlaylistService } from '../../services/playlist/playlist.service';

describe('SpotifyNavigationMenuComponent', () => {
  let component: SpotifyNavigationMenuComponent;
  let fixture: ComponentFixture<SpotifyNavigationMenuComponent>;
  let router: Router;
  let statusBarService: StatusBarService;
  let spotifyService: SpotifyService;
  let playlistService: PlaylistService;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpotifyNavigationMenuComponent
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyNavigationMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    statusBarService = TestBed.get(StatusBarService);
    spotifyService = TestBed.get(SpotifyService);
    playlistService = TestBed.get(PlaylistService);
  });

  afterEach(() => {
    router = null;
    statusBarService = null;
    spotifyService = null;
    playlistService = null;
  });

  it('should create spotify navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: 'string',
      items: [],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 0
    }));
    component.ngOnInit();
    expect(component.selectedPlaylist).toEqual('');
    expect(component.imageEnlargeState).toEqual('inactive');
    expect(component.isPictureEnlarged).toEqual(false);
  });

  it('should check ngOnInit method statusBarService enlargePicture when returned false', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: 'string',
      items: [],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.enlargePicture$.emit(false);
    expect(component.imageEnlargeState).toEqual('inactive');
    expect(component.isPictureEnlarged).toEqual(false);
  });

  it('should check ngOnInit method statusBarService enlargePicture when returned true', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: 'string',
      items: [],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.enlargePicture$.emit(true);
    expect(component.imageEnlargeState).toEqual('active');
    expect(component.isPictureEnlarged).toEqual(true);
  });

  it('should check ngOnInit method statusBarService currentTrack', () => {
    const mockCurrentTrack = {
      added_at: '',
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
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: '',
      items: [],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.currentTrack$.emit(mockCurrentTrack);
    expect(component.currentTrack).toEqual(mockCurrentTrack);
  });

  it('should check ngOnInit method playlistService selectPlaylist', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: 'string',
      items: [],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 0
    }));
    component.ngOnInit();
    playlistService.selectPlaylist$.emit('test');
    expect(component.selectedPlaylist).toEqual('test');
  });

  it('should check ngOnInit method spotifyService getAllPlaylists when no playlists returned', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: '',
      items: [],
      limit: 1,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    }));
    component.ngOnInit();
    expect(component.loading).toEqual(false);
    expect(component.playlistsLoaded).toEqual(true);
  });

  it('should check ngOnInit method spotifyService getAllPlaylists when 1 playlist returned', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: '',
      items: [
        {
          collaborative: true,
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: '',
          owner: {
            display_name: '',
            external_urls: {
              spotify: ''
            },
            href: '',
            id: '',
            type: '',
            uri: ''
          },
          primary_color: '',
          public: true,
          snapshot_id: '',
          tracks: {
            href: '',
            total: 1
          },
          type: '',
          uri: '',
        }
      ],
      limit: 1,
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      offset: 0,
      previous: '',
      total: 1
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getAllPlaylists when 1 playlist is equal to selected playlist', () => {
    component.selectedPlaylist = 'test1';
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: '',
      items: [
        {
          collaborative: true,
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: 'test',
          owner: {
            display_name: '',
            external_urls: {
              spotify: ''
            },
            href: '',
            id: '',
            type: '',
            uri: ''
          },
          primary_color: '',
          public: true,
          snapshot_id: '',
          tracks: {
            href: '',
            total: 1
          },
          type: '',
          uri: '',
        }
      ],
      limit: 1,
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      offset: 0,
      previous: '',
      total: 1
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getAllPlaylists when 1 playlist when no more next playlists', () => {
    spyOn(spotifyService, 'getAllPlaylists').and.returnValue(of({
      href: '',
      items: [
        {
          collaborative: true,
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          images: [],
          name: 'test',
          owner: {
            display_name: '',
            external_urls: {
              spotify: ''
            },
            href: '',
            id: '',
            type: '',
            uri: ''
          },
          primary_color: '',
          public: true,
          snapshot_id: '',
          tracks: {
            href: '',
            total: 1
          },
          type: '',
          uri: '',
        }
      ],
      limit: 1,
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      offset: 0,
      previous: '',
      total: 1,
      testing: true
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check goToTracks method', () => {
    component.playlists = [
      {
        collaborative: true,
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        images: [],
        name: '',
        owner: {
          display_name: '',
          external_urls: {
            spotify: ''
          },
          href: '',
          id: '',
          type: '',
          uri: ''
        },
        primary_color: '',
        public: true,
        snapshot_id: '',
        tracks: {
          href: '',
          total: 0
        },
        type: '',
        uri: '',
        selected: true,
      }
    ];
    const spy = spyOn(router, 'navigateByUrl');
    component.goToTracks({name: 'test', id: 'test'});
    expect(spy).toHaveBeenCalled();
  });

  it('should check goToSavedAlbums method', () => {
    const spy = spyOn(router, 'navigate');
    component.goToSavedAlbums();
    expect(spy).toHaveBeenCalled();
  });

  it('should check shrinkPicture method', () => {
    const spy = spyOn(statusBarService, 'enlargePicture');
    component.shrinkPicture();
    expect(spy).toHaveBeenCalled();
  });

  it('should check openNewPlaylistModal method', () => {
    const spy = spyOn(component.dialog, 'open');
    component.openNewPlaylistModal();
    expect(spy).toHaveBeenCalled();
  });
});

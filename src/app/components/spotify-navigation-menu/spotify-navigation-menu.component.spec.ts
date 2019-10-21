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
import { ApolloService } from '../../services/apollo/apollo.service';
import { Apollo } from 'apollo-angular';

describe('SpotifyNavigationMenuComponent', () => {
  let component: SpotifyNavigationMenuComponent;
  let fixture: ComponentFixture<SpotifyNavigationMenuComponent>;
  let router: Router;
  let statusBarService: StatusBarService;
  let spotifyService: SpotifyService;
  let apolloService: ApolloService;
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
      ],
      providers: [
        Apollo
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
    apolloService = TestBed.get(ApolloService);
  });

  afterEach(() => {
    router = null;
    statusBarService = null;
    spotifyService = null;
    playlistService = null;
    apolloService = null;
  });

  it('should create spotify navigation component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: null,
      next: 'string',
      total: 0
    }));
    component.ngOnInit();
    expect(component.selectedPlaylist).toEqual('');
    expect(component.imageEnlargeState).toEqual('inactive');
    expect(component.isPictureEnlarged).toEqual(false);
  });

  it('should check ngOnInit method statusBarService enlargePicture when returned false', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [],
      next: 'string',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.enlargePicture$.emit({value: false, url: ''});
    expect(component.imageEnlargeState).toEqual('inactive');
    expect(component.isPictureEnlarged).toEqual(false);
  });

  it('should check ngOnInit method statusBarService enlargePicture when returned true', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [],
      next: 'string',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.enlargePicture$.emit({value: true, url: ''});
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
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [],
      next: '',
      total: 0
    }));
    component.ngOnInit();
    statusBarService.currentTrack$.emit(mockCurrentTrack);
    expect(component.currentTrack).toEqual(mockCurrentTrack);
  });

  it('should check ngOnInit method playlistService selectPlaylist', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
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

  it('should check ngOnInit method spotifyService getPlaylists when no playlists returned', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [],
      next: '',
      total: 0
    }));
    component.ngOnInit();
    expect(component.loading).toEqual(false);
    expect(component.playlistsLoaded).toEqual(true);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist returned', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [
        {
          id: '',
          name: ''
        }
      ],
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      total: 1
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist is equal to selected playlist', () => {
    component.selectedPlaylist = 'test1';
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [
        {
          id: '',
          name: 'test'
        }
      ],
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      total: 1
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist when no more next playlists', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of({
      items: [
        {
          id: '',
          name: 'test',
        }
      ],
      next: 'https://api.spotify.com/v1/users/the_gardner_snake/playlists?offset=50&limit=50',
      total: 1,
    }));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check goToTracks method', () => {
    component.playlists = [
      {
        id: '',
        name: '',
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
    component.shrinkPicture('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should check openNewPlaylistModal method', () => {
    const spy = spyOn(component.dialog, 'open');
    component.openNewPlaylistModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should check the loadMorePlaylists method and no selected playlist', () => {
    const playlists = {
      items: [
        {
          name: 'test',
          id: 'test'
        }
      ],
      next: '',
      total: 1,
    };
    const spy = spyOn(apolloService, 'getPlaylists').and.returnValue(of(playlists));
    component.nextPlaylist = 'https://api.spotify.com/v1/users/test/playlists?offset=0&limit=50';
    component.loadMorePlaylists(50);
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50');
    expect(component.playlists[0].selected).toBeFalsy();
  });

  it('should check the loadMorePlaylists method and have a selected playlist', () => {
    const playlists = {
      items: [
        {
          name: 'test',
          id: 'test'
        }
      ],
      next: '',
      total: 1,
    };
    component.selectedPlaylist = 'test';
    const spy = spyOn(apolloService, 'getPlaylists').and.returnValue(of(playlists));
    component.nextPlaylist = 'https://api.spotify.com/v1/users/test/playlists?offset=0&limit=50';
    component.loadMorePlaylists(50);
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50');
    expect(component.playlists[0].selected).toBeTruthy();
  });
});

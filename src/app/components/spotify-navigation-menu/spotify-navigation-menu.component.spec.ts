// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { HttpClientModule } from '@angular/common/http';
import { Routes, Router } from '@angular/router';
import { of } from 'rxjs';

// Components
import { SpotifyNavigationMenuComponent } from '@components/spotify-navigation-menu/spotify-navigation-menu.component';
import { LoginComponent } from '@components/login/login.component';

// Interfaces
import { CurrentTrack } from '@interfaces/track/track.interface';

// Services
import { StatusBarService } from '@services/status-bar/status-bar.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { PlaylistService } from '@services/playlist/playlist.service';
import { ApolloService } from '@services/apollo/apollo.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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

  beforeEach(waitForAsync(() => {
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
    router = TestBed.inject(Router);
    statusBarService = TestBed.inject(StatusBarService);
    spotifyService = TestBed.inject(SpotifyService);
    playlistService = TestBed.inject(PlaylistService);
    apolloService = TestBed.inject(ApolloService);
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
  });

  it('should check ngOnInit method statusBarService currentTrack', () => {
    const mockCurrentTrack: CurrentTrack = {
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
      highlight: false,
      isPauseButtonShowing: false,
      isPlayButtonShowing: false,
      is_local: false,
      primary_color: '',
      track: {
        title: '',
        album_name: '',
        added_at: '',
        artist: '',
        time: 0,
        showPauseButton: false,
        showPlayButton: false,
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
        collaborative: false,
        external_urls: {
          spotify: ''
        },
        followers: {
          href: '',
          total: 0
        },
        href: '',
        id: '',
        images: null,
        name: '',
        owner: null,
        primary_color: '',
        public: false,
        snapshot_id: '',
        tracks: null,
        type: '',
        uri: '',
        selected: false,
        selectedUrl: ''
      }
    ];
    const spy = spyOn(router, 'navigateByUrl');
    component.goToTracks({name: 'test', id: 'test'});
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

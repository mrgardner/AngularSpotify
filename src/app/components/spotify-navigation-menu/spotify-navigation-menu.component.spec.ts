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

// Services
import { ApolloService } from '@services/apollo/apollo.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPlaylists, mockPlaylistNavMenu } from '@test-data/apollo/apollo.test-data';

describe('SpotifyNavigationMenuComponent', () => {
  let component: SpotifyNavigationMenuComponent;
  let fixture: ComponentFixture<SpotifyNavigationMenuComponent>;
  let router: Router;
  let apolloService: ApolloService;
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
    router = TestBed.inject(Router);
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    router = null;
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

  it('should check ngOnInit method spotifyService getPlaylists when no playlists returned', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.ngOnInit();
    expect(component.loading).toEqual(false);
    expect(component.playlistsLoaded).toEqual(true);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist returned', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist is equal to selected playlist', () => {
    component.selectedPlaylist = 'test1';
    spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check ngOnInit method spotifyService getPlaylists when 1 playlist when no more next playlists', () => {
    spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.ngOnInit();
    expect(component.playlists.length).toEqual(1);
  });

  it('should check goToTracks method', () => {
    component.playlists = [
      mockPlaylistNavMenu('test', 'test', false, '')
    ];
    const spy = spyOn(router, 'navigateByUrl');
    component.goToTracks({name: 'test', id: 'test', selected: false, selectedUrl: ''});
    expect(spy).toHaveBeenCalled();
  });

  it('should check openNewPlaylistModal method', () => {
    const spy = spyOn(component.dialog, 'open');
    component.openNewPlaylistModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should check the loadMorePlaylists method and no selected playlist', () => {
    const spy = spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.nextPlaylist = 'https://api.spotify.com/v1/users/test/playlists?offset=0&limit=50';
    component.loadMorePlaylists(50);
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50');
    expect(component.playlists[0].selected).toBeFalsy();
  });

  it('should check the loadMorePlaylists method and have a selected playlist', () => {
    component.selectedPlaylist = 'test';
    const spy = spyOn(apolloService, 'getPlaylists').and.returnValue(of(mockPlaylists('')));
    component.nextPlaylist = 'https://api.spotify.com/v1/users/test/playlists?offset=0&limit=50';
    component.loadMorePlaylists(50);
    expect(spy).toHaveBeenCalledWith('https://api.spotify.com/v1/users/test/playlists?offset=50&limit=50');
    expect(component.playlists[0].selected).toBeTruthy();
  });
});

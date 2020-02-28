// Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { ChangeDetectorRef, Type } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Routes } from '@angular/router';
import { of } from 'rxjs';

// Components
import { LoginComponent } from '@components/login/login.component';
import { PlaylistTableComponent } from '@components/playlist-table/playlist-table.component';

// Services
// import { PlaylistDataSourceService } from '@services/playlist-data-source/playlist-data-source.service';
import { TrackService } from '@services/track/track.service';
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { ApolloService } from '@services/apollo/apollo.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockSongState } from '@test-data/song/song.test-data';
import { mockSortedTrack } from '@test-data/tracks/tracks.test-data';
import { mockUrlSegment } from '@test-data/url/url.test-data';
import { mockPlaylistTracks, mockPlaylist } from '@test-data/apollo/apollo.test-data';

describe('PlaylistTableComponent', () => {
  let component: PlaylistTableComponent;
  let fixture: ComponentFixture<PlaylistTableComponent>;
  // let dataSource: PlaylistDataSourceService;
  let trackService: TrackService;
  let spotifyPlaybackService: SpotifyPlaybackService;
  let spotifyService: SpotifyService;
  let apolloService: ApolloService;
  let changeDetectorRef: ChangeDetectorRef;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'playlist/:name/:id', component: PlaylistTableComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlaylistTableComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        MatMenuModule
      ],
      providers: [
        ChangeDetectorRef,
        Apollo
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTableComponent);
    component = fixture.componentInstance;
    // dataSource = TestBed.inject(PlaylistDataSourceService);
    trackService = TestBed.inject(TrackService);
    spotifyPlaybackService = TestBed.inject(SpotifyPlaybackService);
    spotifyService = TestBed.inject(SpotifyService);
    changeDetectorRef = TestBed.inject(ChangeDetectorRef as Type<ChangeDetectorRef>);
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    // dataSource = null;
    trackService = null;
    spotifyPlaybackService = null;
    spotifyService = null;
    changeDetectorRef = null;
    apolloService = null;
  });

  it('should create playlist table component', () => {
    expect(component).toBeTruthy();
  });

  xit('should check ngAfterContentInit when no tracks returned', () => {
    component.paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    // dataSource.tableSubject$
    // spyOn(dataSource, 'loadTracks').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '' , '')));
    component.ngOnInit();
    component.loadTracks();
    component.ngAfterContentInit();
    expect(component.itemCount).toEqual(0);
  });

  it('should check ngAfterContentInit when dataSource is not defined', () => {
    component.ngAfterContentInit();
    expect(component.endOfChain).toBeTruthy();
  });

  it('should check ngOnInit method router events', () => {
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '' , '')));
    spyOn(apolloService, 'getPlaylist').and.returnValue(of(mockPlaylist('')));
    TestBed.inject(ActivatedRoute).url = of([
      mockUrlSegment('playlist'),
      mockUrlSegment('test'),
      mockUrlSegment('test')
    ]);
    component.ngOnInit();
    expect(component.endOfChain).toBeFalsy();
  });

  it('should check ngOnInit method router events else case', () => {
    TestBed.inject(ActivatedRoute).url = of([
      mockUrlSegment('playlist'),
      mockUrlSegment('test')
    ]);
    component.ngOnInit();
    expect(component.endOfChain).toBeTruthy();
  });

  it('should check ngOnInit method trackService checkDuplicate', () => {
    component.ngOnInit();
    trackService.checkDuplicate(true);
    expect(component.checkDuplicate).toBeTruthy();
  });

  it('should check ngOnInit method spotifyPlaybackService currentSongState', () => {
    component.ngOnInit();
    spotifyPlaybackService.sendCurrentState(mockSongState);
    expect(component.state).toEqual(mockSongState);
  });

  it('should check ngOnInit method spotifyPlaybackService currentTrack', () => {
    component.ngOnInit();
    spotifyPlaybackService.currentTrack(mockSortedTrack('', ''));
    expect(component.currentTrack).toEqual(mockSortedTrack('', ''));
  });

  it('should check loadTracks in ngAfterContentInit with more than 1 track', () => {
    component.paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    // spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '' , '')));
    component.ngOnInit();
    component.loadTracks();
    component.ngAfterContentInit();
    expect(component.tracks.length).toEqual(1);
  });

  it('should check loadTracks in ngAfterContentInit with no tracks', () => {
    component.paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    // spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockPlaylistTracks('', '' , '')));
    component.ngOnInit();
    component.loadTracks();
    component.ngAfterContentInit();
    expect(component.tracks.length).toEqual(0);
    expect(component.itemCount).toEqual(0);
  });

  it('should check getDisplayedColumns method with checkDuplicate true', () => {
    component.checkDuplicate = true;
    const columns: string[] = component.getDisplayedColumns();
    expect(columns.length).toEqual(7);
  });

  it('should check getDisplayedColumns method with checkDuplicate false', () => {
    component.checkDuplicate = false;
    const columns: string[] = component.getDisplayedColumns();
    expect(columns.length).toEqual(6);
  });

  it('should check the sortData method title col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'title', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method artist col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'artist', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method album col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'album', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method addedAt col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'addedAt', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method time col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'time', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method test col case', () => {
    component.tracks = [
      mockSortedTrack('', ''),
      mockSortedTrack('', '')
    ];
    component.ngOnInit();
    component.sortData({active: 'test', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method with no active column', () => {
    component.tracks = [];
    component.sortData({active: '', direction: ''});
    expect(component.tracks.length).toEqual(0);
  });

  it('should check the sortData method with active column and no direction', () => {
    component.tracks = [];
    component.sortData({active: 'title', direction: ''});
    expect(component.tracks.length).toEqual(0);
  });

  it('should check playSong method', () => {
    const spy: jasmine.Spy = spyOn(spotifyPlaybackService, 'playSong');
    component.playSong(mockSortedTrack('', ''));
    expect(spy).toHaveBeenCalled();
  });

  it('should check playSong method else case', () => {
    const spy: jasmine.Spy = spyOn(spotifyService, 'playSpotifyTrack').and.returnValue(of(null));
    component.playSong(mockSortedTrack('', ''));
    expect(spy).toHaveBeenCalled();
  });

  it('should check pauseSong method', () => {
    const spy: jasmine.Spy = spyOn(spotifyPlaybackService, 'pauseSong');
    component.pauseSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check showPlayButton method', () => {
    component.tracks = [
      mockSortedTrack('', '')
    ];
    component.showPlayButton(mockSortedTrack('', ''));
    expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check showPlayButton method else case', () => {
    component.tracks = [
      mockSortedTrack('', '')
    ];
    component.showPlayButton(mockSortedTrack('', ''));
    expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check hidePlayButton method', () => {
    component.tracks = [
      mockSortedTrack('', '')
    ];
    component.hidePlayButton(mockSortedTrack('', ''));
    expect(component.tracks[0].showPlayButton).toBeFalsy();
  });

  it('should check hidePlayButton method else case', () => {
    component.tracks = [
      mockSortedTrack('', '')
    ];
    component.hidePlayButton(mockSortedTrack('', ''));
    expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check showPauseButton method', () => {
    component.showPauseButton(mockSortedTrack('', ''));
    expect(mockSortedTrack('', '').showPauseButton).toBeTruthy();
  });

  it('should check hidePauseButton method', () => {
    component.hidePauseButton(mockSortedTrack('', ''));
    expect(mockSortedTrack('', '').showPauseButton).toBeFalsy();
  });
});

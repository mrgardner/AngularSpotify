// Angular Material
import { MatLegacyPaginator as MatPaginator, MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';

// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { ChangeDetectorRef, Type } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { of } from 'rxjs';

// Components
import { LoginComponent } from '@app/components/login/login.component';
import { PlaylistTableComponent } from '@playlists/components/playlist-table/playlist-table.component';

// Services
import { PlaylistDataSourceService } from '@playlists/services/playlist-data-source/playlist-data-source.service';
import { TrackService } from '@tracks/services/track/track.service';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
import { SpotifyService } from '@app/services/spotify/spotify.service';
import { ApolloService } from '@app/services/apollo/apollo.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlaylistTableComponent', () => {
  let component: PlaylistTableComponent;
  let fixture: ComponentFixture<PlaylistTableComponent>;
  let dataSource: PlaylistDataSourceService;
  let trackService: TrackService;
  let spotifyPlaybackService: SpotifyPlaybackService;
  let router: Router;
  let spotifyService: SpotifyService;
  let apolloService: ApolloService;
  let changeDetectorRef: ChangeDetectorRef;
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'playlist/:name/:id', component: PlaylistTableComponent }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlaylistTableComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
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
    dataSource = TestBed.inject(PlaylistDataSourceService);
    trackService = TestBed.inject(TrackService);
    spotifyPlaybackService = TestBed.inject(SpotifyPlaybackService);
    router = TestBed.inject(Router);
    spotifyService = TestBed.inject(SpotifyService);
    changeDetectorRef = TestBed.inject(ChangeDetectorRef as Type<ChangeDetectorRef>);
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    dataSource = null;
    trackService = null;
    spotifyPlaybackService = null;
    router = null;
    spotifyService = null;
    changeDetectorRef = null;
    apolloService = null;
  });

  it('should create playlist table component', () => {
    expect(component).toBeTruthy();
  });

  xit('should check ngAfterContentInit when no tracks returned', () => {
    const mockTracks = {
      href: '',
      items: [],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    };
    component.paginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    // spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
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
    const mockTracks = {
      href: '',
      items: [
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
      ],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 1
    };
    const mockPlaylist = {
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
    };
    // TODO: Fix depration get -> inject
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getPlaylist').and.returnValue(of(mockPlaylist));
    TestBed.get(ActivatedRoute).url = of([
      {
        path: 'playlist'
      },
      {
        path: 'test'
      },
      {
        path: 'test'
      }
    ]);
    component.ngOnInit();
    expect(component.endOfChain).toBeFalsy();
  });

  it('should check ngOnInit method router events else case', () => {
    // TODO: Fix depration get -> inject
    TestBed.get(ActivatedRoute).url = of([
      {
        path: 'playlist'
      },
      {
        path: 'test'
      }
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
    const mockSongState = {
      bitrate: 1,
      context: {
        metadata: {},
        uri: ''
      },
      disallows: {
        pausing: true,
        skipping_prev: true
      },
      duration: 1000,
      paused: true,
      position: 10000,
      repeat_mode: 0,
      restrictions: {
        disallow_pausing_reasons: [],
        disallow_skipping_prev_reasons: []
      },
      shuffle: true,
      timestamp: 0,
      track_window: {
        current_track: {
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
        next_tracks: [],
        previous_tracks: []
      }
    };
    component.ngOnInit();
    // spotifyPlaybackService.sendCurrentState(mockSongState);
    expect(component.state).toEqual(mockSongState);
  });

  it('should check ngOnInit method spotifyPlaybackService currentTrack', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.ngOnInit();
    // spotifyPlaybackService.currentTrack(mockTrack);
    // expect(component.currentTrack).toEqual(mockTrack);
  });

  it('should check loadTracks in ngAfterContentInit with more than 1 track', () => {
    const mockTracks = {
      href: '',
      items: [
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
      ],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 1
    };
    component.paginator = new MatPaginator(new MatPaginatorIntl, changeDetectorRef);
    // spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
    component.ngOnInit();
    component.loadTracks();
    component.ngAfterContentInit();
    expect(component.tracks.length).toEqual(1);
  });

  it('should check loadTracks in ngAfterContentInit with no tracks', () => {
    const mockTracks = {
      href: '',
      items: [],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    };
    component.paginator = new MatPaginator(new MatPaginatorIntl, changeDetectorRef);
    // spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(apolloService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
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
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'title', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method artist col case', () => {
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'artist', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method album col case', () => {
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'album', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method addedAt col case', () => {
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'addedAt', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method time col case', () => {
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'time', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method test col case', () => {
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.ngOnInit();
    // component.sortData({ active: 'test', direction: 'asc' });
    // expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method with no active column', () => {
    component.tracks = [];
    component.sortData({ active: '', direction: '' });
    expect(component.tracks.length).toEqual(0);
  });

  it('should check the sortData method with active column and no direction', () => {
    component.tracks = [];
    component.sortData({ active: 'title', direction: '' });
    expect(component.tracks.length).toEqual(0);
  });

  it('should check playSong method', () => {
    // const song: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    component.state = {
      bitrate: 1,
      context: {
        metadata: {},
        uri: ''
      },
      disallows: {
        pausing: true,
        skipping_prev: true
      },
      duration: 1000,
      paused: true,
      position: 1,
      repeat_mode: 0,
      restrictions: {
        disallow_pausing_reasons: [],
        disallow_skipping_prev_reasons: []
      },
      shuffle: true,
      timestamp: 0,
      track_window: {
        current_track: null,
        next_tracks: [],
        previous_tracks: []
      }
    };
    const spy: jasmine.Spy = spyOn(spotifyPlaybackService, 'playSong');
    // component.playSong(song);
    expect(spy).toHaveBeenCalled();
  });

  it('should check playSong method else case', () => {
    // const song: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    component.state = {
      bitrate: 1,
      context: {
        metadata: {},
        uri: ''
      },
      disallows: {
        pausing: true,
        skipping_prev: true
      },
      duration: 1000,
      paused: true,
      position: 0,
      repeat_mode: 0,
      restrictions: {
        disallow_pausing_reasons: [],
        disallow_skipping_prev_reasons: []
      },
      shuffle: true,
      timestamp: 0,
      track_window: {
        current_track: null,
        next_tracks: [],
        previous_tracks: []
      }
    };
    const spy: jasmine.Spy = spyOn(spotifyService, 'playSpotifyTrack').and.returnValue(of(null));
    // component.playSong(song);
    expect(spy).toHaveBeenCalled();
  });

  it('should check pauseSong method', () => {
    const spy: jasmine.Spy = spyOn(spotifyPlaybackService, 'pauseSong');
    component.pauseSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check showPlayButton method', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.tracks = [
    //   mockTrack
    // ];
    // component.showPlayButton(mockTrack);
    // expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check showPlayButton method else case', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.showPlayButton(mockTrack);
    // expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check hidePlayButton method', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.tracks = [
    //   mockTrack
    // ];
    // component.hidePlayButton(mockTrack);
    // expect(component.tracks[0].showPlayButton).toBeFalsy();
  });

  it('should check hidePlayButton method else case', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.tracks = [
    //   {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // component.hidePlayButton(mockTrack);
    // expect(component.tracks[0].showPlayButton).toBeTruthy();
  });

  it('should check showPauseButton method', () => {
    // const mockTrack: SortedTrack = {
    //   title: '',
    //   artist: '',
    //   added_at: '',
    //   album_name: '',
    //   time: 0,
    //   showPauseButton: false,
    //   showPlayButton: false,
    //   duration: 0,
    //   uri: '',
    //   total: 0,
    //   size: 0,
    //   filterText: ''
    // };
    // component.showPauseButton(mockTrack);
    // expect(mockTrack.showPauseButton).toBeTruthy();
  });

  it('should check hidePauseButton method', () => {
    //   const mockTrack: SortedTrack = {
    //     title: '',
    //     artist: '',
    //     added_at: '',
    //     album_name: '',
    //     time: 0,
    //     showPauseButton: false,
    //     showPlayButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   };
    //   component.hidePauseButton(mockTrack);
    //   expect(mockTrack.showPauseButton).toBeFalsy();
  });
});

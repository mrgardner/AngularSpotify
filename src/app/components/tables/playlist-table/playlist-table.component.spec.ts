import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistTableComponent } from './playlist-table.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../../login/login.component';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { PlaylistDataSourceService } from '../../../services/playlist-data-source/playlist-data-source.service';
import { TrackService } from '../../../services/track/track.service';
import { SpotifyPlaybackService } from '../../../services/spotify-playback/spotify-playback.service';
import { PlaylistTableService } from '../../../services/playlist-table/playlist-table.service';
import { Song } from '../../../interfaces/song/song.interface';
import { SpotifyService } from '../../../services/spotify/spotify.service';
import { of } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { ChangeDetectorRef, Type } from '@angular/core';

describe('PlaylistTableComponent', () => {
  let component: PlaylistTableComponent;
  let fixture: ComponentFixture<PlaylistTableComponent>;
  let dataSource: PlaylistDataSourceService;
  let trackService: TrackService;
  let spotifyPlaybackService: SpotifyPlaybackService;
  let playlistTableService: PlaylistTableService;
  let router: Router;
  let spotifyService: SpotifyService;
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
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        ChangeDetectorRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTableComponent);
    component = fixture.componentInstance;
    dataSource = TestBed.get(PlaylistDataSourceService);
    trackService = TestBed.get(TrackService);
    spotifyPlaybackService = TestBed.get(SpotifyPlaybackService);
    playlistTableService = TestBed.get(PlaylistTableService);
    router = TestBed.get(Router);
    spotifyService = TestBed.get(SpotifyService);
    changeDetectorRef = TestBed.get(ChangeDetectorRef as Type<ChangeDetectorRef>);
  });

  afterEach(() => {
    dataSource = null;
    trackService = null;
    spotifyPlaybackService = null;
    playlistTableService = null;
    router = null;
    spotifyService = null;
    changeDetectorRef = null;
  });

  it('should create playlist table component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngAfterContentInit when no tracks returned', () => {
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
    spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(spotifyService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
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
          added_at: '',
          added_by: '',
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
            addedAt: ''
          },
          video_thumbnail: {
            url: ''
          }
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
    spyOn(spotifyService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
    spyOn(spotifyService, 'getPlaylist').and.returnValue(of(mockPlaylist));
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
          addedAt: ''
        },
        next_tracks: [],
        previous_tracks: []
      }
    };
    component.ngOnInit();
    spotifyPlaybackService.sendCurrentState(mockSongState);
    expect(component.state).toEqual(mockSongState);
  });

  it('should check ngOnInit method spotifyPlaybackService currentTrack', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.ngOnInit();
    spotifyPlaybackService.currentTrack(mockTrack);
    expect(component.currentTrack).toEqual(mockTrack);
  });

  it('should check loadTracks', () => {
    const mockTracks = {
      href: '',
      items: [
        {
          added_at: '',
          added_by: '',
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
            addedAt: ''
          },
          video_thumbnail: {
            url: ''
          }
        }
      ],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 1
    };
    component.paginator = new MatPaginator(new MatPaginatorIntl, changeDetectorRef);
    spyOn(dataSource, 'tableSubject$').and.returnValue(of(mockTracks));
    spyOn(spotifyService, 'getTracksFromPlaylist').and.returnValue(of(mockTracks));
    component.ngOnInit();
    component.loadTracks();
    component.ngAfterContentInit();
    expect(component.tracks.length).toEqual(1);
  });

  it('should check getDisplayedColumns method with checkDuplicate true', () => {
    component.checkDuplicate = true;
    const columns = component.getDisplayedColumns();
    expect(columns.length).toEqual(7);
  });

  it('should check getDisplayedColumns method with checkDuplicate false', () => {
    component.checkDuplicate = false;
    const columns = component.getDisplayedColumns();
    expect(columns.length).toEqual(6);
  });

  it('should check the sortData method title col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
    ];
    component.ngOnInit();
    component.sortData({active: 'title', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method artist col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
    ];
    component.ngOnInit();
    component.sortData({active: 'artist', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method album col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
    ];
    component.ngOnInit();
    component.sortData({active: 'album', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method addedAt col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
    ];
    component.ngOnInit();
    component.sortData({active: 'addedAt', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method time col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
    ];
    component.ngOnInit();
    component.sortData({active: 'time', direction: 'asc'});
    expect(component.tracks.length).toEqual(2);
  });

  it('should check the sortData method test col case', () => {
    component.tracks = [
      {
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
        addedAt: ''
      },
      {
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
        addedAt: ''
      }
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
    const song: Song = {
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
      isPauseButtonShowing: true,
      isPlayButtonShowing: true,
      is_local: true,
      primary_color: true,
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
        addedAt: ''
      },
      video_thumbnail: {
        url: ''
      },
    };
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
        current_track: song.track,
        next_tracks: [],
        previous_tracks: []
      }
    };
    const spy = spyOn(spotifyPlaybackService, 'playSong');
    component.playSong(song);
    expect(spy).toHaveBeenCalled();
  });

  it('should check playSong method else case', () => {
    const song: Song = {
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
      isPauseButtonShowing: true,
      isPlayButtonShowing: true,
      is_local: true,
      primary_color: true,
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
        addedAt: ''
      },
      video_thumbnail: {
        url: ''
      },
    };
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
        current_track: song.track,
        next_tracks: [],
        previous_tracks: []
      }
    };
    const spy = spyOn(spotifyService, 'playSpotifyTrack').and.returnValue(of(null));
    component.playSong(song);
    expect(spy).toHaveBeenCalled();
  });

  it('should check pauseSong method', () => {
    const spy = spyOn(spotifyPlaybackService, 'pauseSong');
    component.pauseSong();
    expect(spy).toHaveBeenCalled();
  });

  it('should check showPlayButton method', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.tracks = [
      mockTrack
    ];
    component.showPlayButton(mockTrack);
    expect(component.tracks[0].isPlayButtonShowing).toBeTruthy();
  });

  it('should check showPlayButton method else case', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.tracks = [
      {
        album: {
          album_type: 'tset',
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
        addedAt: ''
      }
    ];
    component.showPlayButton(mockTrack);
    expect(component.tracks[0].isPlayButtonShowing).toBeTruthy();
  });

  it('should check hidePlayButton method', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.tracks = [
      mockTrack
    ];
    component.hidePlayButton(mockTrack);
    expect(component.tracks[0].isPlayButtonShowing).toBeFalsy();
  });

  it('should check hidePlayButton method else case', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.tracks = [
      {
        album: {
          album_type: 'test',
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
        addedAt: ''
      }
    ];
    component.hidePlayButton(mockTrack);
    expect(component.tracks[0].isPlayButtonShowing).toBeTruthy();
  });

  it('should check showPauseButton method', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.showPauseButton(mockTrack);
    expect(mockTrack.isPauseButtonShowing).toBeTruthy();
  });

  it('should check hidePauseButton method', () => {
    const mockTrack = {
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
      addedAt: ''
    };
    component.hidePauseButton(mockTrack);
    expect(mockTrack.isPauseButtonShowing).toBeFalsy();
  });
});

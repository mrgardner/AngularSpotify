// Common
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Components
import { TrackComponent } from '@components/track/track.component';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;
  let spotifyService: SpotifyService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: { params: {} }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
  });

  afterEach(() => {
    spotifyService = null;
  });

  it('should create track component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method with params', () => {
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
    TestBed.inject(ActivatedRoute).params = of({
      trackID: 'test'
    });
    spyOn(spotifyService, 'getTrack').and.returnValue(of(mockTrack));
    component.ngOnInit();
    expect(component.track).toEqual(mockTrack);
  });

  it('should should check ngOnInit method without params', () => {
    TestBed.inject(ActivatedRoute).params = of(null);
    component.ngOnInit();
    expect(component.endOfChain).toBeTruthy();
  });
});

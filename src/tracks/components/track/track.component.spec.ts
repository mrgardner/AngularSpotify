import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '@app/services/spotify/spotify.service';
import { TrackComponent } from '@tracks/components/track/track.component';
import { of } from 'rxjs';

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

  // TODO TESTING: Fix
  // afterEach(() => {
  //   spotifyService = null;
  // });

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
    // TODO TESTING: Fix
    // TestBed.inject(ActivatedRoute).params = of(null);
    component.ngOnInit();
    expect(component.endOfChain).toBeTruthy();
  });
});
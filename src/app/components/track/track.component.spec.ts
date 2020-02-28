// Common
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Components
import { TrackComponent } from '@components/track/track.component';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockSortedTrack } from '@test-data/tracks/tracks.test-data';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;
  let spotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {params: {}}
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
    TestBed.inject(ActivatedRoute).params = of({
      trackID: 'test'
    });
    spyOn(spotifyService, 'getTrack').and.returnValue(of(mockSortedTrack('', '')));
    component.ngOnInit();
    expect(component.track).toEqual(mockSortedTrack('', ''));
  });

  it('should should check ngOnInit method without params', () => {
    TestBed.inject(ActivatedRoute).params = of(null);
    component.ngOnInit();
    expect(component.endOfChain).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '@tracks/services/track/track.service';
import { of } from 'rxjs';
import { TrackFilterComponent } from './track-filter.component';

describe('TrackFilterComponent', () => {
  let component: TrackFilterComponent;
  let fixture: ComponentFixture<TrackFilterComponent>;
  let trackService: TrackService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackFilterComponent
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
    fixture = TestBed.createComponent(TrackFilterComponent);
    component = fixture.componentInstance;
    trackService = TestBed.inject(TrackService);
  });

  // TODO TESTING: Fix
  // afterEach(() => {
  //   trackService = null;
  // });

  it('should create track filter component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method', () => {
    TestBed.inject(ActivatedRoute).params = of({});
    component.ngOnInit();
    expect(component.isSearchBoxShowing).toBeFalsy();
    expect(component.name).toEqual('');
    expect(component.playlistID).toEqual('');
    expect(component.endOfChain).toBeTruthy();
  });

  it('should check ngOnInit method route params', () => {
    TestBed.inject(ActivatedRoute).params = of({
      playlistID: 'test'
    });
    component.ngOnInit();
    expect(component.playlistID).toEqual('test');
  });

  it('should check checkForDuplicateTrack method', () => {
    // const mockChecked = {
    //   target: {
    //     checked: true
    //   }
    // };
    const spy = spyOn(trackService, 'checkDuplicate');
    // component.checkForDuplicateTrack(mockChecked);
    expect(component.isDuplicateTrack).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should check filterName method', () => {
    const spy = spyOn(trackService, 'filterTrack');
    component.filterTrack('');
    expect(spy).toHaveBeenCalled();
  });
});
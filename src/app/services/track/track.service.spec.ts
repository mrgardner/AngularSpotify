// Interfaces
import { SortedTrack } from '@interfaces/track/track.interface';

// Services
import { TrackService } from '@services/track/track.service';

// Testing Core
import { TestBed } from '@angular/core/testing';

// Testing Data
import { mockSortedTrack } from '@test-data/tracks/tracks.test-data';

describe('TrackService', () => {
  let trackService: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackService
      ]
    });

    trackService = TestBed.inject(TrackService);
  });

  afterEach(() => {
    trackService = null;
  });

  it('should be created', () => {
    expect(trackService).toBeTruthy();
  });

  it('should check the checkDuplicates method', () => {
    const spy = spyOn(trackService.checkDuplicate$, 'emit');
    trackService.checkDuplicate(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should check the filterDuplicateTrack method with args set to false', () => {
    const tracks: SortedTrack[] = [
      mockSortedTrack('', '')
    ];
    const result = trackService.filterDuplicateTracks(tracks, false);
    expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true', () => {
    const tracks: SortedTrack[] = [
      mockSortedTrack('Test', '123'),
      mockSortedTrack('Test', '543'),
      mockSortedTrack('Test1', '543')
    ];

    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(2);
    expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in asc', () => {
    const tracks: SortedTrack[] = [
      mockSortedTrack('Test', '123'),
      mockSortedTrack('Test', '543'),
      mockSortedTrack('Test1', '543'),
      mockSortedTrack('Test1', '543'),
      mockSortedTrack('zzzzz', '123'),
      mockSortedTrack('zzzzz', '123')
    ];
    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(4);
    expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in dsc', () => {
    const tracks: SortedTrack[] = [
      mockSortedTrack('Test', '123'),
      mockSortedTrack('Test', '543'),
      mockSortedTrack('Test1', '543'),
      mockSortedTrack('Test1', '543'),
      mockSortedTrack('zzzzz', '123'),
      mockSortedTrack('zzzzz', '123')
    ];

    const result = trackService.filterDuplicateTracks(tracks, true);

    expect(result.length).toEqual(4);
    expect(result).toEqual(tracks);
  });
});

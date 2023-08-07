import { TestBed } from '@angular/core/testing';
import { TrackService } from '@tracks/services/track/track.service';

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

  // TODO TESTING: Fix
  // afterEach(() => {
  //   trackService = null;
  // });

  it('should be created', () => {
    expect(trackService).toBeTruthy();
  });

  it('should check the checkDuplicates method', () => {
    const spy = spyOn(trackService.checkDuplicate$, 'emit');
    trackService.checkDuplicate(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should check the filterDuplicateTrack method with args set to false', () => {
    // const tracks: Array<SortedTrack> = [
    //   {
    //     title: '',
    //     artist: '',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // const result = trackService.filterDuplicateTracks(tracks, false);
    // expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true', () => {
    // const tracks: Array<SortedTrack> = [
    //   {
    //     title: 'Test',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test1',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];

    // const result = trackService.filterDuplicateTracks(tracks, true);

    // expect(result.length).toEqual(2);
    // expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in asc', () => {
    // const tracks: Array<SortedTrack> = [
    //   {
    //     title: 'Test',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test1',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test1',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'zzzzz',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'zzzzz',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];
    // const result = trackService.filterDuplicateTracks(tracks, true);

    // expect(result.length).toEqual(4);
    // expect(result).toEqual(tracks);
  });

  it('should check the filterDuplicateTrack method with args set to true and sorting in dsc', () => {
    // const tracks: Array<SortedTrack> = [
    //   {
    //     title: 'Test',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test1',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'Test1',
    //     artist: '543',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'zzzzz',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   {
    //     title: 'zzzzz',
    //     artist: '123',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     duration: 10,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   }
    // ];

    // const result = trackService.filterDuplicateTracks(tracks, true);

    // expect(result.length).toEqual(4);
    // expect(result).toEqual(tracks);
  });
});
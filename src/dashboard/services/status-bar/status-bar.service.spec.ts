import { TestBed } from '@angular/core/testing';
import { StatusBarService } from '@dashboard/services/status-bar/status-bar.service';

describe('StatusBarService', () => {
  let statusBarService: StatusBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusBarService
      ]
    });

    statusBarService = TestBed.inject(StatusBarService);
  });

  // TODO TESTING: Fix
  // afterEach(() => {
  //   statusBarService = null;
  // });

  it('should be created', () => {
    expect(statusBarService).toBeTruthy();
  });

  it('should check setCurrentTrack', () => {
    // TODO TESTING: Fix
    // const currentTrack: CurrentTrack = {
    //   added_at: 'string',
    //   added_by: {
    //     external_urls: {
    //       spotify: ''
    //     },
    //     href: '',
    //     id: '',
    //     type: '',
    //     uri: ''
    //   },
    //   highlight: true,
    //   isPauseButtonShowing: true,
    //   isPlayButtonShowing: true,
    //   is_local: true,
    //   primary_color: '',
    //   track: {
    //     title: '',
    //     artist: '',
    //     album_name: '',
    //     added_at: '',
    //     time: 0,
    //     showPlayButton: false,
    //     showPauseButton: false,
    //     showTrackNumber: false,
    //     duration: 0,
    //     uri: '',
    //     total: 0,
    //     size: 0,
    //     filterText: ''
    //   },
    //   video_thumbnail: {
    //     url: ''
    //   }
    // };
    const spy = spyOn(statusBarService.currentTrack$, 'emit');
    // TODO TESTING: Fix
    // statusBarService.setCurrentTrack(currentTrack);
    // expect(spy).toHaveBeenCalledWith(currentTrack);
  });
});

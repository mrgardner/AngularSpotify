// Services
import { StatusBarService } from '@services/status-bar/status-bar.service';

// Testing Core
import { TestBed } from '@angular/core/testing';

// Testing Data
import { mockCurrentTrack } from '@test-data/tracks/tracks.test-data';

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

  afterEach(() => {
    statusBarService = null;
  });

  it('should be created', () => {
    expect(statusBarService).toBeTruthy();
  });

  it('should check setCurrentTrack', () => {
    const spy = spyOn(statusBarService.currentTrack$, 'emit');
    statusBarService.setCurrentTrack(mockCurrentTrack('', ''));
    expect(spy).toHaveBeenCalledWith(mockCurrentTrack('', ''));
  });
});

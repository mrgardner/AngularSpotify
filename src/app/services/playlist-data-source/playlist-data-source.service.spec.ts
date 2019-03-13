import { TestBed } from '@angular/core/testing';

import { PlaylistDataSourceService } from './playlist-data-source.service';

describe('PlaylistDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistDataSourceService = TestBed.get(PlaylistDataSourceService);
    expect(service).toBeTruthy();
  });
});

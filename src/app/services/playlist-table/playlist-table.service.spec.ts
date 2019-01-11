import { TestBed } from '@angular/core/testing';

import { PlaylistTableService } from './playlist-table.service';

describe('PlaylistTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistTableService = TestBed.get(PlaylistTableService);
    expect(service).toBeTruthy();
  });
});

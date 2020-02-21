// Services
import { RouteService } from '@services/route/route.service';

// Testing
import { TestBed } from '@angular/core/testing';

describe('RouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteService = TestBed.inject(RouteService);
    expect(service).toBeTruthy();
  });
});

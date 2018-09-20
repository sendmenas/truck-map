import { TestBed } from '@angular/core/testing';

import { MapDataManagerService } from './map-data-manager.service';

describe('MapDataManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapDataManagerService = TestBed.get(MapDataManagerService);
    expect(service).toBeTruthy();
  });
});

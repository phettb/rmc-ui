import { TestBed } from '@angular/core/testing';

import { RawMaterialServiceService } from './raw-material-service.service';

describe('RawMaterialServiceService', () => {
  let service: RawMaterialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawMaterialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

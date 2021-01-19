import { TestBed } from '@angular/core/testing';

import { RoterService } from './roter.service';

describe('RoterService', () => {
  let service: RoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

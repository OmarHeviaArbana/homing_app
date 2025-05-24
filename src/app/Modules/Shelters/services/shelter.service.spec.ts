import { TestBed } from '@angular/core/testing';

import { ShelterService } from './shelter.service';

describe('UserService', () => {
  let service: ShelterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UsagerGuard } from './usager.guard';

describe('UsagerGuard', () => {
  let guard: UsagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

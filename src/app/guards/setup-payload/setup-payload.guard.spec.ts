import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { setupPayloadGuard } from './setup-payload.guard';

describe('setupPayloadGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => setupPayloadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

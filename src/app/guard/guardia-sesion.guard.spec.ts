import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardiaSesionGuard } from './guardia-sesion.guard';

describe('guardiaSesionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardiaSesionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AppState } from '../../app.reducers';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  let storeMock = { select: jasmine.createSpy('select') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    storeMock.select.and.returnValue(of({ credentials: { access_token: 'valid-token' } }));
    guard = new AuthGuard(routerMock as any, storeMock as any);

    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login when user is not authenticated', () => {
    storeMock.select.and.returnValue(of({ credentials: { access_token: null } }));
    guard = new AuthGuard(routerMock as any, storeMock as any);

    expect(guard.canActivate()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});

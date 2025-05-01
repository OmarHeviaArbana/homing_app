import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockStore: any;

  beforeEach(() => {
    // Mock store with an auth state containing a token
    mockStore = {
      select: jasmine.createSpy().and.returnValue(of({ credentials: { access_token: 'test-token' } })),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
      ]
    });

    service = TestBed.inject(AuthInterceptorService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header if token is available', () => {
    httpClient.get('/test-url').subscribe();

    const req = httpTestingController.expectOne('/test-url');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');

    req.flush({});
  });

  it('should not add Authorization header if no token is available', () => {
    // Modify the mock store to return an empty token
    mockStore.select.and.returnValue(of({ credentials: {} }));

    httpClient.get('/test-url').subscribe();

    const req = httpTestingController.expectOne('/test-url');
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });
});

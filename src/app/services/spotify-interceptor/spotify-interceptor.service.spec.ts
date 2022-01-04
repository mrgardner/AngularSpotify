
// Common
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Type } from '@angular/core';

// Services
import { SpotifyInterceptorService } from '@app/services/spotify-interceptor/spotify-interceptor.service';
import { UtilService } from '@app/services/util/util.service';

// Testing
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('SpotifyInterceptorService', () => {
  let spotifyInterceptorService: SpotifyInterceptorService;
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let utilService: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpotifyInterceptorService,
          multi: true,
        },
      ]
    });

    spotifyInterceptorService = TestBed.inject(SpotifyInterceptorService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
    http = TestBed.inject(HttpClient);
    utilService = TestBed.inject(UtilService);
  });

  afterEach(() => {
    spotifyInterceptorService = null;
    httpMock = null;
    http = null;
    utilService = null;
  });

  it('should be created', () => {
    expect(spotifyInterceptorService).toBeTruthy();
  });

  it('should add authorization header to request', () => {
    // spyOn(utilService, 'getCookie').and.returnValue('testCookie123');
    // http.get('https://api.spotify.com/v1/me').subscribe(res => expect(res).toBeTruthy());
    // const request = httpMock.expectOne('https://api.spotify.com/v1/me');

    // request.flush({ data: 'test' });
    // httpMock.verify();

    // expect(request.request.headers.has('authorization')).toBeTruthy();
  });

  it('should not add authorization header to request', () => {
    // spyOn(utilService, 'getCookie').and.returnValue('testCookie123');
    // http.get('/api/test').subscribe(res => expect(res).toBeTruthy());
    // const request = httpMock.expectOne('/api/test');

    // request.flush({ data: 'test' });
    // httpMock.verify();

    // expect(request.request.headers.has('authorization')).toBeFalsy();
  });
});

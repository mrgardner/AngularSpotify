import { TestBed } from '@angular/core/testing';
import { SpotifyInterceptorService } from './spotify-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { UtilService } from '../util/util.service';


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

    spotifyInterceptorService = TestBed.get(SpotifyInterceptorService);
    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    http = TestBed.get(HttpClient);
    utilService = TestBed.get(UtilService);
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
    spyOn(utilService, 'getCookie').and.returnValue('testCookie123');
    http.get('https://api.spotify.com/v1/me').subscribe(res => expect(res).toBeTruthy());
    const request = httpMock.expectOne('https://api.spotify.com/v1/me');

    request.flush({data: 'test'});
    httpMock.verify();

    expect(request.request.headers.has('authorization')).toBeTruthy();
  });

  it('should not add authorization header to request', () => {
    spyOn(utilService, 'getCookie').and.returnValue('testCookie123');
    http.get('/api/test').subscribe(res => expect(res).toBeTruthy());
    const request = httpMock.expectOne('/api/test');

    request.flush({data: 'test'});
    httpMock.verify();

    expect(request.request.headers.has('authorization')).toBeFalsy();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Routes, Router } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../util/util.service';

describe('AuthService', () => {
  let authService: AuthService;
  let utilService: UtilService;
  let router: Router;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AuthService
      ]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    utilService = TestBed.get(UtilService);
  });

  afterEach(() => {
    authService = null;
    utilService = null;
    router = null;
  });

  it('should create auth service', () => {
    expect(authService).toBeTruthy();
  });

  xit('should check login method', () => {
    const mockWindow = {
      open: (t) => ({location: {hash: ''}, t}),
      spotifyCallback: () => {}
    };
    const spy = spyOn(mockWindow, 'open');
    spyOn(mockWindow, 'spotifyCallback').and.returnValue(null);
    authService.login(mockWindow);
    mockWindow.spotifyCallback();
    console.log(spy);
    expect(authService).toBeTruthy();
  });

  it('should check logout method', () => {
    const routerSpy = spyOn(router, 'navigate');
    const utilServiceSpy = spyOn(utilService, 'clearCookie');
    authService.logout();
    expect(routerSpy).toHaveBeenCalled();
    expect(utilServiceSpy).toHaveBeenCalled();
  });

  it('should check getSpotifyToken method', () => {
    spyOn(utilService, 'getCookie').and.returnValue('testCookie123');
    const cookie = authService.getSpotifyToken();
    expect(cookie).toEqual('testCookie123');
  });
});

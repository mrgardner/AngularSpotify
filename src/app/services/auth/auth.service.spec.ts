// Common
import { HttpClientModule } from '@angular/common/http';
import { Routes, Router } from '@angular/router';

// Components
import { LoginComponent } from '@components/login/login.component';

// Services
import { AuthService } from '@services/auth/auth.service';
import { UtilService } from '@services/util/util.service';

// Testing
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let utilService: UtilService;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: LoginComponent },
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

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    utilService = TestBed.inject(UtilService);
  });

  afterEach(() => {
    authService = null;
    utilService = null;
    router = null;
  });

  it('should create auth service', () => {
    expect(authService).toBeTruthy();
  });

  it('should check login method', () => {
    spyOn(window, 'open').and.returnValue(
      {
        location: {
          hash: '#access_token=123&expire_in=233'
        },
        close: () => { }
      }
    );
    const spy = spyOn(utilService, 'setCookie');
    authService.login();
    window['spotifyCallback']('test');
    expect(spy).toHaveBeenCalled();
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

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@app/components/login/login.component';
import { AuthService } from '@app/services/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let authService: AuthService;
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
  ];
  const mockSnapshot: RouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AuthGuard,
        { provide: RouterStateSnapshot, useValue: mockSnapshot }
      ]
    });

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  // TODO TESTING: Fix
  // afterEach(() => {
  //   router = null;
  //   authService = null;
  // });

  it('should create spotify guard with token', () => {
    spyOn(authService, 'getSpotifyToken').and.returnValue('testCookie');
    authGuard = new AuthGuard(router, authService);
    expect(authGuard.canActivate()).toBeTruthy();
  });

  it('should create spotify guard without token', () => {
    const spy = spyOn(router, 'navigate');
    spyOn(authService, 'getSpotifyToken').and.returnValue('');
    authGuard = new AuthGuard(router, authService);
    expect(authGuard.canActivate()).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });
});
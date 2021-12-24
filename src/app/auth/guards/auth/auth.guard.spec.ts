// Common
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, Routes, Router, RouterStateSnapshot } from '@angular/router';

// Components
import { LoginComponent } from '@auth/components/login/login.component';

// Guards
import { AuthGuard } from './auth.guard';

// Services
import { AuthService } from '@auth/services/auth/auth.service';

// Testing
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let authService: AuthService;
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
  ];
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

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

  afterEach(() => {
    router = null;
    authService = null;
  });

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

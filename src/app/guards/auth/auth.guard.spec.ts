import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Routes, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let authService: AuthService;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
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
        {provide: RouterStateSnapshot, useValue: mockSnapshot}
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
    expect(authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeTruthy();
  });

  it('should create spotify guard without token', () => {
    const spy = spyOn(router, 'navigate');
    spyOn(authService, 'getSpotifyToken').and.returnValue('');
    authGuard = new AuthGuard(router, authService);
    expect(authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });
});

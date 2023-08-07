import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@app/components/login/login.component';
import { AuthService } from '@app/services/auth/auth.service';
import { UtilService } from '@app/services/util/util.service';

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

  // TODO TESTING: Fix
  // afterEach(() => {
  //   authService = null;
  //   utilService = null;
  //   router = null;
  // });

  it('should create auth service', () => {
    expect(authService).toBeTruthy();
  });
});
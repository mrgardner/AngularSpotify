// Common
import { HttpClientModule } from '@angular/common/http';
import { Routes, Router } from '@angular/router';

// Components
import { LoginComponent } from '@app/components/login/login.component';

// Services
import { AuthService } from '@app/services/auth/auth.service';
import { UtilService } from '@app/services/util/util.service';

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

});

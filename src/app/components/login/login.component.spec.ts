// Common
import { HttpClientModule } from '@angular/common/http';

import { Routes } from '@angular/router';

// Components
import { LoginComponent } from '@components/login/login.component';

// Services
import { AuthService } from '@services/auth/auth.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routes: Routes = [
    {path: 'login', component: LoginComponent}
  ];
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    authService = null;
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should check the login method', () => {
    const spy: jasmine.Spy = spyOn(authService, 'login');
    component.login();
    expect(spy).toHaveBeenCalled();
  });
});

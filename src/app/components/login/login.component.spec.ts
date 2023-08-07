import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@app/components/login/login.component';
import { AuthService } from '@app/services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routes: Routes = [
    { path: 'login', component: LoginComponent }
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

  // TODO TESTING: Fix
  // afterEach(() => {
  //   authService = null;
  // });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should check the login method', () => {
    const spy: jasmine.Spy = spyOn(authService, 'login');
    component.login();
    expect(spy).toHaveBeenCalled();
  });
});
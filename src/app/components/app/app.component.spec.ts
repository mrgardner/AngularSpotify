// Common
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

// Components
import { AppComponent } from '@components/app/app.component';
import { LoginComponent } from '@components/login/login.component';

// Services
import { AuthService } from '@services/auth/auth.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  const routes: Routes = [
    {path: 'login', component: LoginComponent},
  ];
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  }));

  afterEach(() => {
    authService = null;
  });

  it('should create the app component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check the isLoggedIn method and return true', () => {
    spyOn(authService, 'getSpotifyToken').and.returnValue('testCookie123');
    const isLoggedIn = component.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  it('should check the isLoggedIn method and return false', () => {
    spyOn(authService, 'getSpotifyToken').and.returnValue('');
    const isLoggedIn = component.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});

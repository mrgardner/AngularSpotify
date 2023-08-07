import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/services/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
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

  // TODO TESTING: Fix
  // afterEach(() => {
  //   authService = null;
  // });

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
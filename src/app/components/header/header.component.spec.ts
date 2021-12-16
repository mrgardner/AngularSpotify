// Common
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { LoginComponent } from '@components/login/login.component';

// Services
import { AuthService } from '@services/auth/auth.service';
import { SpotifyPlaybackService } from '@services/spotify-playback/spotify-playback.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
  ];
  let authService: AuthService;
  let spotifyPlaybackService: SpotifyPlaybackService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    spotifyPlaybackService = TestBed.inject(SpotifyPlaybackService);
  });

  afterEach(() => {
    authService = null;
    spotifyPlaybackService = null;
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method when logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    const spy: jasmine.Spy = spyOn(spotifyPlaybackService, 'setupPlayer');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should check ngOnInit method when not logged in', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(false);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should check isLoggedIn method with spotify token', () => {
    spyOn(authService, 'getSpotifyToken').and.returnValue('testCookie123');
    const isLoggedIn: boolean = component.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  it('should check isLoggedIn method with no spotify token', () => {
    spyOn(authService, 'getSpotifyToken').and.returnValue('');
    const isLoggedIn: boolean = component.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  it('should check logout method', () => {
    const spy: jasmine.Spy = spyOn(authService, 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
    expect(component.loggedIn).toBeFalsy();
  });
});

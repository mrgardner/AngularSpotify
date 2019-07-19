import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayUserComponent } from './display-user.component';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { User } from '../../interfaces/user/user.interface';
import { of } from 'rxjs';

describe('DisplayUserComponent', () => {
  let component: DisplayUserComponent;
  let fixture: ComponentFixture<DisplayUserComponent>;
  let spotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisplayUserComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.get(SpotifyService);
  });

  afterEach(() => {
    spotifyService = null;
  });

  it('should create display user component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit getUser method from spotifyService', () => {
    const user: User = {
      birthdate: 'string',
      country: 'string',
      display_name: 'string',
      email: 'string',
      explicit_content: {
        filter_enabled: true,
        filter_locked: true
      },
      external_urls: {
        spotify: ''
      },
      followers: {
        href: 'string',
        total: 1
      },
      href: 'string',
      id: 'string',
      images: [
        {
          width: 1,
          url: '',
          height: 1
        }
      ],
      product: 'string',
      type: 'string',
      uri: 'string',
    };
    spyOn(spotifyService, 'getUser').and.returnValue(of(user));
    component.ngOnInit();
    expect(component.displayName).toEqual(user.display_name);
  });
});

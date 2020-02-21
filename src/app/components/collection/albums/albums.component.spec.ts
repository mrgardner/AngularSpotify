
// Common
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { AlbumsComponent } from '@components/collection/albums/albums.component';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let spotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlbumsComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
  });

  afterEach(() => {
    spotifyService = null;
  });

  it('should create albums component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns no albums and next hrefs', () => {
    const albums = {
      href: 'string',
      items: [],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 0
    };
    spyOn(spotifyService, 'getUsersSavedAlbums').and.returnValue(of(albums));
    component.ngOnInit();
    expect(component.albumsLoaded).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns 1 album', () => {
    const albums = {
      href: 'string',
      items: [
        {
          album_type: 'string',
          artists: [
            {
              external_urls: 'string',
              id: 'string',
              name: 'string',
              type: 'string',
              uri: 'string'
            }
          ],
          available_markets: [
            ''
          ],
          external_urls: {
            spotify: ''
          },
          href: 'string',
          id: 'string',
          images: [
            {
              height: 1,
              url: 'string',
              width: 1
            }
          ],
          name: 'string',
          release_date: 'string',
          release_date_precision: 'string',
          total_track: 1,
          type: 'string',
          uri: 'string'
        }
      ],
      limit: 1,
      next: 'string',
      offset: 0,
      previous: 'string',
      total: 1
    };
    spyOn(spotifyService, 'getUsersSavedAlbums').and.returnValue(of(albums));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns 1 album and no next hrefs', () => {
    const albums = {
      href: 'string',
      items: [
        {
          album_type: 'string',
          artists: [
            {
              external_urls: 'string',
              id: 'string',
              name: 'string',
              type: 'string',
              uri: 'string'
            }
          ],
          available_markets: [
            ''
          ],
          external_urls: {
            spotify: ''
          },
          href: 'string',
          id: 'string',
          images: [
            {
              height: 1,
              url: 'string',
              width: 1
            }
          ],
          name: 'string',
          release_date: 'string',
          release_date_precision: 'string',
          total_track: 1,
          type: 'string',
          uri: 'string'
        }
      ],
      limit: 1,
      next: '',
      offset: 0,
      previous: 'string',
      total: 1
    };
    spyOn(spotifyService, 'getUsersSavedAlbums').and.returnValue(of(albums));
    component.ngOnInit();
    expect(component.albumsLoaded).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should check showSearchBox method', () => {
    component.showSearchBox();
    expect(component.isSearchBoxShowing).toBeTruthy();
  });

  it('should check hideSearchBox method', () => {
    component.hideSearchBox();
    expect(component.isSearchBoxShowing).toBeFalsy();
    expect(component.name).toEqual('');
  });

  it('should check onLoseFocus method when name length is 10', () => {
    component.name = 'testing123';
    component.onLoseFocus();
    expect(component).toBeTruthy();
  });

  it('should check onLoseFocus method when name length is 0', () => {
    component.name = '';
    const spy = spyOn(component, 'hideSearchBox');
    component.onLoseFocus();
    expect(spy).toHaveBeenCalled();
  });
});

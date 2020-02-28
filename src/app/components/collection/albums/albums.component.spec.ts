// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { AlbumsComponent } from '@components/collection/albums/albums.component';

// Services
import { ApolloService } from '@services/apollo/apollo.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Test Data
import { mockAlbums } from '@test-data/apollo/apollo.test-data';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let apolloService: ApolloService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlbumsComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        Apollo
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    apolloService = null;
  });

  it('should create albums component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns no albums and next hrefs', () => {
    spyOn(apolloService, 'getAlbums').and.returnValue(of(mockAlbums('')));
    component.ngOnInit();
    expect(component.albumsLoaded).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns 1 album', () => {
    spyOn(apolloService, 'getAlbums').and.returnValue(of(mockAlbums('')));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method when spotifyService.getUsersSavedAlbums returns 1 album and no next hrefs', () => {
    spyOn(apolloService, 'getAlbums').and.returnValue(of(mockAlbums('')));
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

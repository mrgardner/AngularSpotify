import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyNavigationMenuComponent } from './spotify-navigation-menu.component';

describe('SpotifyNavigationMenuComponent', () => {
  let component: SpotifyNavigationMenuComponent;
  let fixture: ComponentFixture<SpotifyNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyNavigationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

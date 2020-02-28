// Angular Material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Common
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { NewPlaylistDialogComponent } from '@components/new-playlist-dialog/new-playlist-dialog.component';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockEvent } from '@test-data/event/event.test-data';

describe('NewPlaylistDialogComponent', () => {
  let component: NewPlaylistDialogComponent;
  let fixture: ComponentFixture<NewPlaylistDialogComponent>;
  let spotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewPlaylistDialogComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {close: (): void => {}}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaylistDialogComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
  });

  afterEach(() => {
    spotifyService = null;
  });

  it('should create new playlist dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit method', () => {
    component.ngOnInit();
    expect(component.playlistName).toEqual('New Playlist');
    expect(component.playlistDescription).toEqual('');
    expect(component.playlistNameMaxLength).toEqual(100);
    expect(component.playlistDescriptionMaxLength).toEqual(300);
    expect(component.playlistDescriptionPlaceholder).toEqual('Give your playlist a catchy description.');
    expect(component.showUserButtons).toBeFalsy();
  });

  it('should check closeModal method', () => {
    const spy: jasmine.Spy = spyOn(component.dialogRef, 'close');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should check getFile method with a file', () => {
    component.getFile(mockEvent());
    expect(component).toBeTruthy();
  });

  it('should check getFile method without a file', () => {
    component.getFile(mockEvent());
    expect(component).toBeTruthy();
  });

  it('should check onSubmit method', () => {
    component.imageFile = 'test';
    const spy: jasmine.Spy = spyOn(spotifyService, 'createNewPlaylist').and.returnValue(of('test'));
    const spy2: jasmine.Spy = spyOn(component.dialogRef, 'close');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

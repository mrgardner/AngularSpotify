import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from '@app/services/spotify/spotify.service';
import { NewPlaylistDialogComponent } from '@dashboard/components/new-playlist-dialog/new-playlist-dialog.component';
import { of } from 'rxjs';

describe('NewPlaylistDialogComponent', () => {
  let component: NewPlaylistDialogComponent;
  let fixture: ComponentFixture<NewPlaylistDialogComponent>;
  let spotifyService: SpotifyService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewPlaylistDialogComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        // TODO: Fix empty method close
        // { provide: MatDialogRef, useValue: { close: (): void => { } } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaylistDialogComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
  });

  // TODO TESTING: Fix
  // afterEach(() => {
  //   spotifyService = null;
  // });

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
    // const blob: Blob = new Blob([''], { type: 'text/html' });
    // blob.lastModifiedDate = '';
    // blob.name = 'filename';
    // const fakeF: Blob = blob;
    // const mockEvent = {
    //   target: {
    //     files: [
    //       fakeF
    //     ]
    //   }
    // };
    // component.getFile(mockEvent);
    // expect(component).toBeTruthy();
  });

  it('should check getFile method without a file', () => {
    const mockEvent = {
      target: []
    };
    component.getFile(mockEvent);
    expect(component).toBeTruthy();
  });

  it('should check onSubmit method', () => {
    const mockEvent = {
      target: [
        {
          value: 'test1'
        },
        {
          value: 'test2'
        },
        {
          value: 'test3'
        }
      ]
    };
    component.imageFile = {
      lastModified: 1549314648684,
      lastModifiedDate: 'Mon Feb 04 2019 16:10:48 GMT-0500 (Eastern Standard Time) {}',
      name: 'test.jpg',
      size: 57357,
      type: 'Blob',
      webkitRelativePath: ''
    };
    const spy: jasmine.Spy = spyOn(spotifyService, 'createNewPlaylist').and.returnValue(of('test'));
    const spy2: jasmine.Spy = spyOn(component.dialogRef, 'close');
    component.onSubmit(mockEvent);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
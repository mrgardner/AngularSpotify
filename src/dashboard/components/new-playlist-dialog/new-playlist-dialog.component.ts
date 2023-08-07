import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpotifyService } from '@app/services/spotify/spotify.service';

@Component({
  selector: 'app-new-playlist-dialog',
  templateUrl: './new-playlist-dialog.component.html',
  styleUrls: ['./new-playlist-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPlaylistDialogComponent implements OnInit {
  // TODO: Fix types
  public playlistName: string;
  public playlistDescription: string;
  public playlistNameMaxLength: number;
  public playlistDescriptionMaxLength: number;
  public playlistDescriptionPlaceholder: string;
  public currentImage: any;
  public imageFile: any;
  public showUserButtons: boolean;
  public reader: any;
  public form: any = new UntypedFormGroup({
    playlistName: new UntypedFormControl('', Validators.required),
    playlistDescription: new UntypedFormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<NewPlaylistDialogComponent>,
    // TODO: fix type
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spotifyService: SpotifyService) { }

  get playlistNameLength(): number {
    return this.form.get('playlistName').value.length;
  }

  get playlistDescriptionLength(): number {
    return this.form.get('playlistDescription').value.length;
  }

  ngOnInit(): void {
    this.playlistName = 'New Playlist';
    this.playlistDescription = '';
    this.playlistNameMaxLength = 100;
    this.playlistDescriptionMaxLength = 300;
    this.playlistDescriptionPlaceholder = 'Give your playlist a catchy description.';
    this.showUserButtons = false;
  }

  triggerFile(): void {
    (document as any).getElementById('file').click();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.reader = new FileReader();

      this.reader.onload = (events: ProgressEvent) => {
        this.currentImage = (<FileReader>events.target).result;
        this.imageFile = this.currentImage.split(',')[1];

        (document as any).getElementsByClassName(<string>this.dialogRef._containerInstance._config.panelClass)[0]['style'].height = '380px';
      };
      this.reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetImage(): void {
    this.currentImage = null;
    this.imageFile = null;
    (document as any).getElementsByClassName(<string>this.dialogRef._containerInstance._config.panelClass)[0]['style'].height = '300px';
  }

  replaceImage(): void {
    (document as any).getElementById('file2').click();
  }

  onSubmit(event: any): void {
    const playlistName = event.target[0].value;
    const playlistDescription = event.target[2].value;
    const playlistImage = this.imageFile;
    const body = {
      name: playlistName,
      description: playlistDescription,
      public: true
    };
    this.spotifyService.createNewPlaylist(body, playlistImage).subscribe(() => this.dialogRef.close());
  }
}